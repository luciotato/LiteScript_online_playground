//LiteScript demo
//Barebones minimal node web server

//Dependencies
//------------

   //global import path, fs, url, http
   var path = require('path');
   var fs = require('fs');
   var url = require('url');
   var http = require('http');

//Module variables
//----------------


   var contentTypesByExtension = {
       '.html': "text/html; charset=utf-8", 
       '.css': "text/css; charset=utf-8", 
       '.js': "application/javascript; charset=utf-8", 
       '.jpg': "binary/image", 
       '.png': "binary/image", 
       '.gif': "binary/image", 
       '.ico': "binary/image"
       };
   //export
   module.exports.contentTypesByExtension = contentTypesByExtension;


//Module Vars
//-----------

   var 
   wwwRoot = undefined, 
   appHandler = undefined, 
   server = undefined
   ;

   //public function start( staticDir:string, aAppHandler:function, port)
   function start(staticDir, aAppHandler, port){

//Start a web server

       wwwRoot = path.resolve(process.cwd(), staticDir);

       //default port = 80
       if(port===undefined) port=80;

       appHandler = aAppHandler; //main routes function

       server = http.createServer(MinimalHandler);

       server.listen(port);

       console.log('nodejs version: ' + process.version + '\nwwwRoot: ' + wwwRoot + '\n\nBare Web Server listening on localhost:' + port);

       return server;
   };
   //export
   module.exports.start=start;


   //helper function MinimalHandler (request, response)
   function MinimalHandler(request, response){ try{

//This is a minimal handler for http.createServer

       console.log("" + request.method + " " + request.url);

//parse request url. [url.parse] (http://nodejs.org/docs/latest/api/url.html)

       var urlParts = url.parse(request.url, true);

//We first give the app a chance to process the request (dynamic).

       //if appHandler and appHandler(urlParts, request, response) // if true-> handled
       if (appHandler && appHandler(urlParts, request, response)) { // if true-> handled

           return;// #done, handled by app
       }

//else, If the request was not handled by the app, we check for static files
       
       else {

           //if findPath(urlParts.pathname) into var found
           var found=undefined;
           if ((found=findPath(urlParts.pathname))) {

               response.respondWithFile(found);
           }
           
           else {
               response.error(404, "" + urlParts.pathname + " NOT FOUND.");
           };
       };

       //exception e
       
       }catch(e){
           response.error(503, e.message);
       };
   };


//## Helper Classes declaring node's 'http' module strutures

   //public helper class Request extends http.IncomingMessage
   //constructor
   function Request(){
       // default constructor: call super.constructor
       http.IncomingMessage.prototype.constructor.apply(this,arguments)
        //properties
            //method: string
            //url: string
            //statusCode
   };
   // Request (extends|super is) http.IncomingMessage
   Request.prototype.__proto__ = http.IncomingMessage.prototype;
   
   //export
   module.exports.Request = Request;
   //end class Request

   //public helper class Response extends http.ServerResponse
   //constructor
   function Response(){
       // default constructor: call super.constructor
       http.ServerResponse.prototype.constructor.apply(this,arguments)
   };
   // Response (extends|super is) http.ServerResponse
   Response.prototype.__proto__ = http.ServerResponse.prototype;
//All variables named 'response' or 'resp' will get type 'Response'

        //declare name affinity resp
   
   //export
   module.exports.Response = Response;
   //end class Response


   //public helper class UrlParts
   //constructor
   function UrlParts(){
        //properties

            //href #The full URL that was originally parsed. Both the protocol and host are lowercased.
            //#Example: 'http://user:pass@host.com:8080/p/a/t/h?query=string#hash'

            //protocol #: The request protocol, lowercased.
            //#Example: 'http:'

            //host #: The full lowercased host portion of the URL, including port information.
            //#Example: 'host.com:8080'

            //auth #: The authentication information portion of a URL.
            //#Example: 'user:pass'

            //hostname #: Just the lowercased hostname portion of the host.
            //#Example: 'host.com'

            //port #: The port number portion of the host.
            //#Example: '8080'

            //pathname #: The path section of the URL, that comes after the host and before the query, including the initial slash if present.
            //#Example: '/p/a/t/h'

            //search #: The 'query string' portion of the URL, including the leading question mark.
            //#Example: '?query=string'

            //path #: Concatenation of pathname and search.
            //#Example: '/p/a/t/h?query=string'

            //query #: Either the 'params' portion of the query string, or a querystring-parsed object.
            //#Example: 'query=string' or {'query':'string'}

            //hash #: The 'fragment' portion of the URL including the pound-sign.
   };
   
   //export
   module.exports.UrlParts = UrlParts;
   //end class UrlParts
            //#Example: '#hash'


//## Bare Server Static resources Helper Functions

   //helper function findPath(pathname) // return {exists:boolean, disk_uri:string}
   function findPath(pathname){ // return {exists:boolean, disk_uri:string}

       var result = undefined;

        //console.log("findPath %s",pathname);

       //if pathname is path.sep
       if (pathname === path.sep) {
           result = wwwRoot;
       }
       
       else {
           result = path.join(wwwRoot, pathname);
       };

        // check if file exists
        // if it is dir, -> add '/index.html'
       var fileExists = fs.existsSync(result);
       //if fileExists and fs.statSync(result).isDirectory()
       if (fileExists && fs.statSync(result).isDirectory()) {
           result = path.join(result, 'index.html');
           fileExists = fs.existsSync(result);
       };

       return fileExists ? result : undefined;
   };


//## Helper methods appended to http.ServerResponse

   //append to class http.ServerResponse
   

     //     properties
            //headersWritten: boolean

    //method writeHeadersFor(fileExt)
    http.ServerResponse.prototype.writeHeadersFor = function(fileExt){

       //if no .headersWritten
       if (!this.headersWritten) {
           var headers = {};
           var contentType = contentTypesByExtension[fileExt];
           //if contentType, headers["Content-Type"] = contentType
           if (contentType) {
               headers["Content-Type"] = contentType};
           this.writeHead(200, headers);
           this.headersWritten = true;
       };
    };

    //method writeFileContents(filename)
    http.ServerResponse.prototype.writeFileContents = function(filename){

       var result = undefined;

       //if filename and filename[0] is path.sep
       if (filename && filename[0] === path.sep) {
           result = filename; //absolute path
       }
       
       else {
           //if not findPath(filename) into result
           if (!((result=findPath(filename)))) {
               //fail with 'file not found: #{filename}'
               throw new Error('file not found: ' + filename);
           };
       };

       this.writeHeadersFor(path.extname(result)); // add headers

       var file = fs.readFileSync(result);

       this.write(file); //send read file
    };



    //method respondWithFile(file)
    http.ServerResponse.prototype.respondWithFile = function(file){

       this.writeFileContents(file, true);
       this.end();
    };


    //method error(statusCode,message)
    http.ServerResponse.prototype.error = function(statusCode, message){

       this.writeHead(statusCode, {'Content-Type': 'text/plain'});
       this.write('ERROR: ' + message);
       this.end();
    };





//Compiled by LiteScript compiler v0.6.0, source: /home/ltato/LiteScript_online_playground/webServer/src/BareWebServer.lite.md
//# sourceMappingURL=BareWebServer.js.map
