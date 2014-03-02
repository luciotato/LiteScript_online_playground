///- simplified REQUIRE 
// equivalent -for the borwser- to node's 'require'
//  http://github.com/luciotato

    public function require(url)

        declare valid this.uri 

        if no this.uri #called from online.js in main web page
            # remove ../ from ../lib, since HTTP GET is relative from host root
            # not from online.js location (/js/online.js)
            url = url.slice(3)

        else
        
            if url.slice(0,2) is './'
                var caller:string = this.uri
                var cwd = caller.slice(0,caller.lastIndexOf('/')+1)
                url = cwd + url.slice(2);

            else if (url.slice(0,2) is '/') 
                do nothing

            else  // no ./ or /, is node.js 'global' search on node_modules
                url = require.globalPath + url;
              
add js suffix it it is not there

        if url.toLowerCase().substr(-3) !== '.js', url+='.js'; 

    	if no require.cache, require.cache={}; //init cache

        var cacheName = 'module:'+url;
        var requiredModule = require.cache[cacheName]; //get from cache
        if requiredModule
            do nothing //console.log('CACHED',url);
        
        else  //not cached
                //console.log('REQUIRE',url);
                try 
                    var moduleExports = {};
                    var X=new XMLHttpRequest();
                    X.open "GET", url, 0 // sync
                    X.send
                    if X.status and X.status isnt 200, fail with X.statusText
    				var source = X.responseText
    				
fix (if saved form for Chrome Dev Tools)

    				if source.substr(0,10) is "(function(" 
    					var moduleStart = source.indexOf('{');
    					var moduleEnd = source.lastIndexOf('})');
    					var CDTcomment = source.indexOf('//@ ');
    					if CDTcomment>-1 and CDTcomment<moduleStart+6, moduleStart = source.indexOf('\n',CDTcomment);
    					source = source.slice(moduleStart+1,moduleEnd-1); 
    				
fix, add comment to show source on Chrome Dev Tools

    				source="//@ sourceURL=#{url}\n#{source}"

    				//------
                    requiredModule = { id: url, uri: url, exports:moduleExports }; //according to the modules 1.1 standard

                    //early cache to avoid circular requires
                    require.cache[cacheName] = requiredModule
                    var requireBinded = require.bind(requiredModule);
                    var anonFn = new Function("require", "exports", "module", source); //create a Fn with module code, and 3 params: require, exports & module
                    anonFn(requireBinded, moduleExports, requiredModule); // call the Fn, Execute the module
                    // at module.exports -> require.cache[url].exports: obj exported by module

                catch err
                    fail with "Error loading module #{url}: #{err}"

        declare valid requiredModule.exports
        return requiredModule.exports; //require returns object exported by module


When required module in node.js does not starts with ./ or .., node.js starts looking
for the module in ./node_modules, then ../../node_modules... then NODES_PATH, etc.
If you make a require() from the browser and required file does not starts with ./ or ..
this require() will prepend *require.globalPath* to try to get the resource.
Default is 'lib/'

    append to namespace require
        properties 
            cache 
            globalPath = 'lib/' //default for node.js node_modules global search


///- END REQUIRE FN

 