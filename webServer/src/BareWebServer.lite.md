LiteScript demo
===============
Barebones minimal node web server 
===============

Dependencies
------------
    
    global import path, fs, url, http

Module variables
----------------


    public var contentTypesByExtension = 
        '.html': "text/html; charset=utf-8"
        '.css':  "text/css; charset=utf-8"
        '.js':   "application/javascript; charset=utf-8"
        '.jpg':   "binary/image"
        '.png':   "binary/image"
        '.gif':   "binary/image"
        '.ico':   "binary/image"
        

    var 
        wwwRoot:string
        appHandler:function
        server:http.Server

### public function start ( staticDir: string, aAppHandler: function, port) 

Start a web server 

        wwwRoot = path.resolve(process.cwd(), staticDir);

        default port = 80

        appHandler = aAppHandler; //main routes function

        server = http.createServer(MinimalHandler)
        
        server.listen port
        
        print """
            nodejs version: #{process.version}
            wwwRoot: #{wwwRoot}

            Bare Web Server listening on localhost:#{port}
        """

        return server


### helper function MinimalHandler (request, response) 
This is a minimal handler for http.createServer

        print "#{request.method} #{request.url}"

parse request url. [url.parse] (http://nodejs.org/docs/latest/api/url.html)

        var urlParts = url.parse(request.url,true)

We first give the app a chance to process the request (dynamic).

        if appHandler and appHandler(urlParts, request, response) // if true-> handled

            return #done, handled by app
        
else, If the request was not handled by the app, we check for static files

        else 
                
            if findPath(urlParts.pathname) into var found
            
                response.respondWithFile found

            else            
                response.error 404,"#{urlParts.pathname} NOT FOUND."

        exception e
            response.error 503, e.message


## Helper Classes declaring node's 'http' module structures

### public helper class Request extends http.IncomingMessage
This are the added properties to [http.IncomingMessage] (http://nodejs.org/api/http.html#http_message_url)
for request obtained from http.Server.

        properties
            method: string
            url: string
            statusCode

### public helper class Response extends http.ServerResponse
All variables named 'response' or 'resp' will get type 'Response'

        declare name affinity resp


### public helper class UrlParts
This is what node's url.parse() returns. see: http://nodejs.org/docs/latest/api/url.html returns 

        properties

            href #The full URL that was originally parsed. Both the protocol and host are lowercased.
            #Example: 'http://user:pass@host.com:8080/p/a/t/h?query=string#hash'
        
            protocol #: The request protocol, lowercased.
            #Example: 'http:'

            host #: The full lowercased host portion of the URL, including port information.
            #Example: 'host.com:8080'

            auth #: The authentication information portion of a URL.
            #Example: 'user:pass'

            hostname #: Just the lowercased hostname portion of the host.
            #Example: 'host.com'

            port #: The port number portion of the host.
            #Example: '8080'

            pathname #: The path section of the URL, that comes after the host and before the query, including the initial slash if present.
            #Example: '/p/a/t/h'

            search #: The 'query string' portion of the URL, including the leading question mark.
            #Example: '?query=string'

            path #: Concatenation of pathname and search.
            #Example: '/p/a/t/h?query=string'

            query #: Either the 'params' portion of the query string, or a querystring-parsed object.
            #Example: 'query=string' or {'query':'string'}

            hash #: The 'fragment' portion of the URL including the pound-sign.
            #Example: '#hash'            


## Bare Server Static resources Helper Functions

### helper function findPath(pathname) // return {exists:boolean, disk_uri:string}
        
        var result
        
        //console.log("findPath %s",pathname);

        if pathname is path.sep
            result = wwwRoot
        else 
            result = path.join(wwwRoot, pathname)

        // check if file exists
        // if it is dir, -> add '/index.html'
        var fileExists = fs.existsSync(result)
        if fileExists and fs.statSync(result).isDirectory()
            result = path.join(result,'index.html')
            fileExists = fs.existsSync(result)
            
        return fileExists? result else undefined
        

## Helper methods appended to http.ServerResponse
    
### Append to class http.ServerResponse

#### properties
            headersWritten: boolean

#### method writeHeadersFor(fileExt) 

        if no .headersWritten
            var headers = {}
            var contentType = contentTypesByExtension[fileExt]
            if contentType, headers["Content-Type"] = contentType
            this.writeHead 200, headers
            this.headersWritten = true

#### method writeFileContents(filename) 

        var result
        
        if filename and filename[0] is path.sep
            result = filename //absolute path
        else
            if not findPath(filename) into result
                fail with 'file not found: #{filename}'
            
        .writeHeadersFor path.extname(result) // add headers
            
        var file=fs.readFileSync(result)

        .write file //send read file
        
        
        
#### method respondWithFile(file) 

        .writeFileContents file,true
        .end
    

#### method error(statusCode,message) 
        
        .writeHead statusCode,{'Content-Type': 'text/plain'}
        .write 'ERROR: #{message}'
        .end
    

