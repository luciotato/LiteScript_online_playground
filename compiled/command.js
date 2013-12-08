(function () {
  var fs, path, Kal, existsSync;
  var k$indexof = [].indexOf || function (item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };
  var k$comprl = function (iterable,func) {var o = []; if (iterable instanceof Array || typeof iterable.length == "number") {for (var i=0;i<iterable.length;i++) {o.push(func(iterable[i]));}} else if (typeof iterable.next == "function") {var i; while ((i = iterable.next()) != null) {o.push(func(i));}} else {throw "Object is not iterable";}return o;};
  /* Command Line Utility 
     -------------------- 
      
     This module defines the command line `kal` utility. 
      */
  fs = require('fs');
  path = require('path');
  Kal = require('./kal');

  /*  
     Utilities 
     ========= 
      
     Some messages are written to `stderr` in this module. 
      */
  function warn(line) {
    process.stderr.write(line + '\n');
  }

  /*  
     This utility function checks if a file is "hidden" by the operating system. 
      */
  function hidden(file) {
    /^\.|~$/.test(file);
  }

  /*  
     `parseOptions` parses the command line switches. 
      */
  function parseOptions() {
    var options, arg, ki$1, kobj$1, index, inputs, ki$2, kobj$2;
    options = {};
    kobj$1 = process.argv;
    for (ki$1 = 0; ki$1 < kobj$1.length; ki$1++) {
      arg = kobj$1[ki$1];
      if (arg[0] === '-' && arg[1] !== '-') {
        if ((k$indexof.call(arg, 'h') >= 0)) {
          options.help = true;
        }
        if ((k$indexof.call(arg, 't') >= 0)) {
          options.tokens = true;
        }
        if ((k$indexof.call(arg, 'j') >= 0)) {
          options.javascript = true;
        }
        if ((k$indexof.call(arg, 'b') >= 0)) {
          options.bare = true;
        }
        if ((k$indexof.call(arg, 'v') >= 0)) {
          options.version = true;
        }
        if ((k$indexof.call(arg, 'm') >= 0)) {
          options.minify = true;
        }
      } else if (arg[0] === '-' && arg[1] === '-') {
        if (arg === '--help') {
          options.help = true;
        }
        if (arg === '--tokens') {
          options.tokens = true;
        }
        if (arg === '--javascript') {
          options.javascript = true;
        }
        if (arg === '--bare') {
          options.bare = true;
        }
        if (arg === '--version') {
          options.version = true;
        }
        if (arg === '--minify') {
          options.minify = true;
        }
      }
    }
    /*  
       The `-o` option has an argument (the output directory). 
        */
    if ((k$indexof.call(process.argv, '-o') >= 0)) {
      index = process.argv.indexOf('-o');
    } else if ((k$indexof.call(process.argv, '--output') >= 0)) {
      index = process.argv.indexOf('--output');
    }
    /*  */
    if (index !== -1) {
      options.output = process.argv[index + 1];
    }
    /*  
       The remaining arguments are assumed to be input file names. We loop through the array and ignore switches and the output directory (if any). 
        */
    inputs = [];
    kobj$2 = process.argv.slice(2);
    for (ki$2 = 0; ki$2 < kobj$2.length; ki$2++) {
      arg = kobj$2[ki$2];
      if (arg[0] === '-' || arg === options.output) {
        /*  
           Set the help flag if the user passed input files (or extra arguments) that were followed by other switches like `kal -o output_dir some_file -j`. This is considered invalid. 
            */
        if (inputs.length !== 0) {
          options.help = true;
        }
        inputs = [];
      } else {
        /* Otherwise, add the argument to the list of input files. 
            */
        inputs.push(arg);
      }
    }
    options._ = inputs;
    return options;
  }

  /*  
     `existsSync` is used to retain compatibility between node.js versions. 
      */
  existsSync = fs.existsSync || path.existsSync;

  /*  
     Main 
     ==== 
      */
  function run() {
    var options, compile_options, files, file, filename, ki$3, kobj$3;
    /*  
       Parse the command line options and print the version/usage if necessary. 
        */
    options = parseOptions();
    if (options.version) {
      return version();
    }
    if (options.help) {
      return usage();
    }
    /*  
       Check the output path (if specified) and make sure it is valid. 
        */
    if ((options.output != null) && !(existsSync(options.output))) {
      warn('output path does not exist!');
      return usage();
    }
    /*  
       If no input files are specified, start the interactive shell. 
        */
    if (options._.length === 0) {
      return require('./interactive');
    }
    /*  
       Let scripts know we are running in `kal` not `node`. 
        */
    process.argv[0] = 'kal';
    process.execPath = require.main.filename;
    /*  
       Construct the `compile_options` argument for `Kal.compile` or `Kal.eval`. 
        */
    compile_options = {show_tokens: options.tokens, bare: options.bare, show_js: options.javascript};
    /*  
       If an output argument was specified, we are writing JavaScript files to an output directory. 
        */
    if ((options.output != null)) {
      /*  
         Attempt to load `uglify-js` if the user wants to minify files. This is not listed as a dependency so the user needs it installed globally or manually. 
          */
      try {
        (options.minify) ? require('uglify-js') : void 0;
      } catch (k$e) {
        warn('error: uglify-js must be installed to use the --minify option');
        process.exit(3);
      }
      /*  
         If the user just specified one directory, assume they just want all the files in it. Compile the list of files with the given options. 
          */
      if (options._.length === 1 && fs.statSync(options._[0]).isDirectory()) {
        files = k$comprl(fs.readdirSync(options._[0]),function (k$i) {file = k$i; return path.join(options._[0], file);});
        compile_files(files, options.output, compile_options, options.minify);
      } else {
        compile_files(options._, options.output, compile_options, options.minify);
      }
    } else {
      /*  
         If no output was specified, just run the script using `eval`. 
          */
      kobj$3 = options._;
      for (ki$3 = 0; ki$3 < kobj$3.length; ki$3++) {
        filename = kobj$3[ki$3];
        compile_options.literate = (k$indexof.call(['.litkal', '.md'], path.extname(filename)) >= 0);
        Kal.eval(fs.readFileSync(filename), compile_options);
      }
    }
  }

  /*  
     The `scripts/kal` loader calls this entry point. 
      */
  exports.run = run;

  /*  
      
     Compile Files 
     ============= 
      
     This function recursively compiles a list of files/directories into `output_dir`. 
      */
  function compile_files(filenames, output_dir, options, minify) {
    var filename, stat, new_outdir, subfiles, child, extension, js_output, js_filename, ki$4, kobj$4;
    kobj$4 = filenames;
    for (ki$4 = 0; ki$4 < kobj$4.length; ki$4++) {
      filename = kobj$4[ki$4];
      stat = fs.statSync(filename);
      /*  
         If this file is a directory, get a list of files in the directory and call this function recursively. 
          */
      if (stat.isDirectory()) {
        new_outdir = path.join(output_dir, path.basename(filename));
        fs.mkdirSync(new_outdir, stat.mode);
        subfiles = k$comprl(fs.readdirSync(filename),function (k$i) {child = k$i; return path.join(filename, child);});
        compile_files(subfiles, new_outdir, options, minify);
      } else if ((k$indexof.call(['.kal', '.litkal', '.md'], path.extname(filename)) >= 0)) {
        /*  
           For `.kal`, `.litkal`, and `.md` (literate Kal assumed) files, set up the options structure and call `Kal.compile`. 
            */
        extension = path.extname(filename);
        /*  
           Check if this is Literate code. 
            */
        options.literate = (k$indexof.call(['.litkal', '.md'], extension) >= 0);
        /*  
           Compile the source. 
            */
        js_output = Kal.compile(fs.readFileSync(filename), options);
        /*  
           Minify if requested. We've already checked that `uglify-js` is installed at this point. 
            */
        if (minify) {
          js_output = require('uglify-js').minify(js_output, {fromString: true, mangle: false}).code;
        }
        /*  
           Print out the JavaScript if the debug option was passed in. 
            */
        (options.show_js) ? console.log(js_output) : void 0;
        /*  
           Write the output to the output directory with a `.js` extension. 
            */
        js_filename = path.join(output_dir, path.basename(filename, extension)) + '.js';
        fs.writeFileSync(js_filename, js_output);
      }
    }
  }

  /*  
     Version 
     ======= 
      
     Returns the Kal version when for the `-v` switch. 
      */
  function version() {
    console.log(("Kal version " + (Kal.VERSION)));
    process.exit(0);
  }

  /*  
     Help options or invalid input will cause this message to print to the screen. 
      */
  function usage() {
    console.log("Usage: kal [options] SOURCE [-o OUTPUT_DIR]");
    console.log("");
    console.log("If called without the -o option, `kal` will run SOURCE.");
    console.log("If called without any options, `kal` will start an interactive session.");
    console.log("");
    console.log("");
    console.log("Options:");
    console.log("  --help, -h        show the command line usage options                  [boolean]");
    console.log("  --tokens, -t      print out the tokens that the lexer/sugarer produce  [boolean]");
    console.log("  --javascript, -j  print out the compiled javascript                    [boolean]");
    console.log("  --bare, -b        don't wrap the output in a function                  [boolean]");
    console.log("  --version, -v     display the version number                           [boolean]");
    console.log("  --output, -o      the output directory for the compiled source");
    console.log("  --minify          minify the output (requires uglify-js)               [boolean]");
    process.exit(2);
  }

})()