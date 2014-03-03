
    public function httpGet(url, callback)
        
        if typeof callback isnt 'function'
            fail with '2nd parameter should be callback fn(err,data)'

        //ajax get file
        var xmlhttp = create_HttpRequest();
        declare valid xmlhttp.data_callback
        xmlhttp.data_callback = callback; //store callback here
        xmlhttp.onload = Local_OnLoad; //default, next fn
        xmlhttp.onerror = Local_OnError;
        //xmlhttp.setRequestHeader('content-type', 'applicattion/json');
        console.log 'GET', url
        xmlhttp.open 'GET', url, true
        xmlhttp.send
    

    function Local_OnLoad() 
        //var stat=document.getElementById('status');
        //if (stat) stat.textContent='ready:'+this.readyState;
        declare this:XMLHttpRequest
        declare valid this.data_callback
        if this.readyState is 4
            //if (stat) stat.textContent='status:'+this.status;
            if this.status isnt 200
                var errMsg = 'Err '+ this.status+': '+this.statusText;
                var stat=document.getElementById('status');
                if stat, stat.textContent=errMsg;
                this.data_callback(new Error(errMsg), this.responseText);
            
            else 
                this.data_callback(null, this.responseText);

    function Local_OnError(e) 
        declare valid this.data_callback
        this.data_callback(new Error('Server not responding'));
    

    function create_HttpRequest() returns XMLHttpRequest  
        
        var ref = null;
        
        declare valid window.XMLHttpRequest 
        declare valid window.ActiveXObject

        if window.XMLHttpRequest 
            ref = new window.XMLHttpRequest()
        else if (window.ActiveXObject)  // Older IE.
            ref = new window.ActiveXObject("MSXML2.XMLHTTP.3.0");
        
        if no ref, fail with 'Failure to create XMLHttpRequest';
        return ref;

