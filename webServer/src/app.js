//Compiled by LiteScript compiler v0.6.0, source: /home/ltato/LiteScript_online_playground/webServer/src/app.lite.md
//LiteScript Lang demo, server App

//This is the main app file.

//Module dependencies
//------------

   //global import path, fs, http, url
   var path = require('path');
   var fs = require('fs');
   var http = require('http');
   var url = require('url');

   //import BareWebServer
   var BareWebServer = require('./BareWebServer');

//Start Server
//------------
//We start a barebones minimal web server.
//When a request arrives, it will call appHandler(urlParts, request, response)

   BareWebServer.start('../playground', appHandler, 8000);

//Main Request Handler
//--------------------

   //function appHandler(urlParts, request, response)
   function appHandler(urlParts, request, response){

//urlParts: the result of nodejs [url.parse] (http://nodejs.org/docs/latest/api/url.html)
//urlParts.query: the result of nodejs [querystring.parse] (http://nodejs.org/api/querystring.html)

       //if urlParts.pathname is '/'
       if (urlParts.pathname === '/') {

//GET / (root) web server returns:

           response.writeFileContents('index.html');
           response.end();
           return true; //handled
       };
   };

//Other request will be served by BareWebServer as static files

//# sourceMappingURL=app.js.map