(function () {
  var literate, lexer, sugar, parser, generator, extension;
  var k$indexof = [].indexOf || function (item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };
  /* The Kal Compiler 
     ---------------- 
      
     Kal is a highly readable, easy-to-use language that compiles to JavaScript. It's designed to be asynchronous and can run both on [node.js](http://nodejs.org) and in the browser. Kal makes asynchronous programming easy and clean by allowing functions to pause and wait for I/O, replacing an awkward callback syntax with a clean, simple syntax. 
      
     The Kal compiler is written in Literate Kal. As a result, a "binary" (JavaScript) version is required to compile this source. You can obtain the latest precompiled package from npm using `npm install -g kal` (may require `sudo` depending on your setup). Once you have Kal installed globally, you can use the following scripts: 
      
     * `npm run-script make` - This will compile the `sources` directory (this source) into the `compiled` directory. 
     * `npm test` - Run the test suite against the `compiled` directory. You must run `npm install` for this repository to install the developer dependencies first. 
     * `npm run-script bootstrap` - Build `sources` using the globally installed Kal compiler, then rebuild `sources` using the compiled version of itself. This also runs tests. This script is used to verify the compiler before deployment to npm. 
      
     Structure 
     ========= 
      
     The compiler uses several stages to compile Kal code. 
      
     For Literate Kal files (like this one), the `literate` module strips out the leading spaces from code blocks and turns Markdown syntax (like this line) into comments. 
      */
  literate = require('./literate');
  /*  
     The first stage is the lexer, which turns the raw string output into an array of tokens of various types (such as `IDENTIFIER`, `STRING`, and `NUMBER`). 
      */
  lexer = require('./lexer');
  /*  
     The "sugar" stage handles syntactic sugar. This includes features that would be difficult to handle in the full parsing stage, such as function calls without parentheses, multiline lists, and CoffeeScript style function definitions. The result is a modified array of tokens that can be read by the parser. 
      */
  sugar = require('./sugar');
  /*  
     The parser stage is uses a recursive descent parser to step through the token array and create a tree of objects representing the structure of the code (an Abstract Syntax Tree). 
      */
  parser = require('./parser');
  /*  
     The generator stage turns the syntax tree into JavaScript by traversing the tree depth-first, asking each node to produce the JavaScript code that corresponds to its function. This adds methods to the classes in the parser for JavaScript generation. 
      */
  generator = require('./generator');
  /*  
     This file gets the version reported by `kal -v` by reading the `package.json` file. If we are running in a web context (like for the online demo), this might fail, so we just return `UNKNOWN`. 
      */
  try {
    exports.VERSION = require('../package.json').version;
  } catch (k$e) {
    exports.VERSION = 'UNKNOWN';
  }

  /*  
     Compilation 
     =========== 
      
     The compile function takes a `code` parameter that can be a string or buffer. This is the raw Kal (or Literate Kal) code. It also takes an `options` object which _may_ contain the following properties (all optional): 
      
     * `bare` - if true, the resulting JavaScript will not be wrapped in a function wrapper. Top-level variables will leak to the global scope. The default is false (code is wrapped in a function). 
     * `literate` - compile as a Literate Kal file. The default is false (regular Kal). 
     * `show_tokens` - if true, the resulting token array is printed to `stdout`. This is useful for debugging the compiler. The default is false. 
      
     Other members of `options` are ignored. 
      
     This function returns a string containing the compiled JavaScript including proper spacing and indentation. 
      
      */
  function compile(code, options) {
    var token_rv, raw_tokens, comments, tokens, root_node;
    /*  
       If code is passed as a buffer, there can be issues with Unicode characters (gh-108). As a result we convert it explicitly to a string and remove any trailing whitespace or newlines. 
        */
    code = code.toString().replace(/\s+$/, "");
    /*  
       Files are wrapped in a function to prevent leakage to the global scope by default. 
        */
    if ((options == null)) {
      options = {bare: false};
    }
    /*  
       Run through the Literate module (if necessary), then tokenize with the lexer. The lexer returns tokens and comments seperately. The token array is then run through the `sugar` module to handle hard-to-parse features. 
        
        
       We call the `js` method to recursively generate JavaScript from the tree, then return the value. 
        
        
       We want to throw a string here, otherwise the user won't see a useful error message at the terminal (just an error class name). 
        */
    try {
      if (options.literate) {
        code = literate.translate(code);
      }
      token_rv = lexer.tokenize(code);
      raw_tokens = token_rv[0];
      comments = token_rv[1];
      tokens = sugar.translate_sugar(raw_tokens, options, lexer.tokenize);
      root_node = parser.parse(tokens, comments, options);
      return root_node.js(options);
    } catch (compile_error) {
      throw compile_error.message || compile_error;
    }
  }

  /*  */
  exports.compile = compile;

  /*  
     Running Scripts (Eval) 
     ====================== 
      
     The `eval` function (called `kal_eval` locally to avoid conflicting with JavaScript's built-in `eval`) compiles a string of Kal code and runs it in the specified environment. All options in the `options` argument are passed through to `compile`. The `options` argument can contain the following other (optional) settings: 
      
     * `show_js` - print the output JavaScript of `compile` to the console. Useful for debugging the compiler. The default is false. 
     * `sandbox` - if true, the code will be run in a separate (sandbox) environment with its own set of globals. If false or missing, the code will be run in the `global` context. Alternatively, you can specify an object that represents the global context in which the script should run. 
     * `modulename` - Passed to `makeSandbox`. If specified, the name of the module used when running the script. Default is `eval`. 
     * `filename` - Passed to `makeSandbox`. If specified, the name of the file used when running the script. Default is `eval`. 
      
     Code passed to this function is run immediately. 
      */
  function kal_eval(code, options) {
    var js, vm, sandbox;
    /*  
       Compile the code object. 
        */
    if ((options == null)) {
      options = {};
    }
    js = compile(code, options);
    /*  
       Show the output JavaScript if the user asked us to. This is really just for compiler debugging. 
        */
    (options.show_js) ? console.log(js) : void 0;
    /*  
       Node's `vm` module is used to run the script in a specified global context. This is the same technique CoffeeScript (and node) use to run scripts. 
        */
    vm = require('vm');
    /*  
       If the a sandbox option was specified, either use the specified object as the sandbox or create a new one based on the current globals if the parameter is just `true`. Otherwise, just use the current global context. 
        */
    if (options.sandbox) {
      sandbox = (options.sandbox === true) ? exports.makeSandbox(options) : options.sandbox;
    } else {
      sandbox = global;
    }
    /*  
       If the sandbox context is the `global` object, run the script in this context. Otherwise, run it with the sandbox. 
        */
    if (sandbox === global) {
      if ((sandbox.module == null) && (sandbox.require == null)) {
        sandbox = exports.makeSandbox(sandbox, options);
      }
      return vm.runInThisContext(js);
    } else {
      return vm.runInContext(js, sandbox);
    }
  }

  /*  
     Export as just `eval`. 
      */
  exports.eval = kal_eval;

  /*  
     Sandboxes 
     ========= 
      
     This function creates a sandbox with the specified options based on the current `global` object. It initializes the sandbox with the necessary require hooks and path variables. The `sandbox` argument can be a script context object (from the `vm` module), or just an object with global variables for a new context. If an object is passed through, this function will create the script context object automatically. This function uses the following (optional) values from the `options` argument: 
      
     * `modulename` - If specified, the name of the module used when running the script. Default is `eval`. 
     * `filename` - If specified, the name of the file used when running the script. Default is `eval`. 
      
     This function returns a `vm` script context object suitable for use with `vm.runInContext`. 
      */
  function makeSandbox(sandbox, options) {
    var vm, path, new_sandbox, k, ki$1, kobj$1, Module, _module, _require, r, ki$2, kobj$2;
    vm = require('vm');
    path = require('path');
    /*  
       Create a sandbox (`vm` script context object) based on the global environment if one is not specified. Otherwise, check if the specified sandbox is already a script context object. If not, we create a script context object based for it. 
        */
    if ((sandbox == null)) {
      sandbox = vm.createContext(global);
    } else if (!((sandbox instanceof vm.Script.createContext().constructor)) && sandbox !== global) {
      new_sandbox = vm.createContext(global);
      kobj$1 = sandbox;
      for (k in kobj$1) {
        if (!kobj$1.hasOwnProperty(k)) {continue;}
        new_sandbox[k] = sandbox[k];
      }
      sandbox = new_sandbox;
    }
    /*  
       Set the `__filename` and `__dirname` that the script will see at run-time. We also set up the `module` and `require` objects to mimic what the script would see if it was run with `node` from the command line. 
        */
    sandbox.__filename = ((options != null) ? options.filename : void 0) || 'eval';
    sandbox.__dirname = path.dirname(sandbox.__filename);
    Module = require('module');
    _module = new Module(((options != null) ? options.modulename : void 0) || 'eval');
    sandbox.module = _module;
    _require = function (path) {
      return Module._load(path, _module, true);
    };

    sandbox.require = _require;
    _module.filename = sandbox.__filename;
    kobj$2 = Object.getOwnPropertyNames(require);
    for (ki$2 = 0; ki$2 < kobj$2.length; ki$2++) {
      r = kobj$2[ki$2];
      if (r !== 'paths') {
        _require[r] = require[r];
      }
    }
    /*  
       This is the same hack node and coffee currently uses for their own REPL. 
        */
    _module.paths = Module._nodeModulePaths(process.cwd());
    _require.paths = _module.paths;
    _require.resolve = function (request) {
      return Module._resolveFilename(request, _module);
    };

    return sandbox;
  }

  /*  */
  exports.makeSandbox = makeSandbox;
  /*  
     Require Extentions 
     ================== 
      
     This segment adds extensions to node's `require` function for Kal and Literate Kal files so that you can just `require` a Kal file without having to compile it first (assuming your script has already run `require 'kal'`). 
      */
  if (require.extensions) {
    extension = function (module, filename) {
      var is_literate, content;
      /*  
         Check if this is a Literate Kal file. 
          */
      is_literate = (k$indexof.call(['.litkal', '.md'], require('path').extname(filename)) >= 0);
      /*  
         Read the file, then compile using the `compile` function above. Then use node's built-in compile function to compile the JavaScript. 
          */
      content = compile(require('fs').readFileSync(filename, 'utf8'), {filename: filename, literate: is_literate});
      module._compile(content, filename);
    };

    /*  
       Add the extension for all appropriate file types. Don't overwrite `.md` in case CoffeeScript or something else is already using it. 
        */
    require.extensions['.kal'] = extension;
    require.extensions['.litkal'] = extension;
    if (!((require.extensions['.md'] != null))) {
      require.extensions['.md'] = extension;
    }
  }
})()