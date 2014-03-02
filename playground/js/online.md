Dependencies
-------------

    compiler import jQuery, Document

    compiler import ace

    compiler import httpGet, require
  
Setup Environment
-----------------

emulate node's environment, global & 'process'
for the LiteScript compiler

    var global = window

    append to object window
        properties 
            process:
                exit:function(code)
                    throw new Error('exit code '+code)

set compiler log messages to memory

    import log from '../lib/log'
    log.options.storeMessages = true

    declare on Error
        controled, soft, stack
    
import compiler

    import LiteScript from '../lib/Compiler'


Page Vars
---------

    var 
        CompareOrig_ed : ace.Editor
        CompareJs_ed : ace.Editor

        loadedFname : string

        compileOptions = {extraComments:true}

utility String protoype functions
----------

    append to class String 
        shim method startsWith(s:string)
	       return this.substr(0,s.length) is s
     
        shim method endsWith(s:string)
	       return this.substr(-s.length) is s
     
MAIN
-----------

    function OnLine_Main()

        $("#version").text "v"+LiteScript.version

        CompareOrig_ed = mkEditor("Compare-Lite")
        CompareJs_ed = mkEditor("Compare-js")
        
        loadSample 'Literate.lite.md'

    end function


    function loadSample(fname,callback) 

        loadedFname = fname
        loadFile './examples/'+fname, function(err,data)
            if err, return
            run

    function run

//    try{

        var liteSource = CompareOrig_ed.getValue();

        //clear
        //syncEditors([CompareOrig_ed, CompareJs_ed], false); //un-sync
        //CompareOrig_ed.setValue("");
        CompareOrig_ed.resize(true);
        //CompareJs_ed.setValue("");
        //CompareJs_ed.resize(true);

        log.warning.count=0; //clear
        log.getMessages(); //clear
        // compile LiteScript -> js
        try
            var compiled = LiteScript.compile(loadedFname, liteSource, compileOptions);
         catch e
            console.log(e.stack);
            compiled = log.getMessages().join('\n');
            compiled += '\n'+e.message;
            if not e.controled, compiled += '\n'+e.stack;
            log.messages = [];
        

        if log.warning.count
            //Show warnings
            compiled = log.getMessages().join('\n') + compiled;
        

        CompareJs_ed.setValue(compiled);

        var linesLite = CompareOrig_ed.getSession().getLength();
        var linesJs = CompareJs_ed.getSession().getLength();

        while (linesLite<linesJs) 
            addLines(' ',CompareOrig_ed);
            linesLite++;
        
        while (linesJs<linesLite) 
            addLines(' ',CompareJs_ed);
            linesJs++;
        

        //sync eds
        //syncEditors([CompareOrig_ed, CompareJs_ed]);

        CompareOrig_ed.clearSelection();
        CompareJs_ed.clearSelection();

        CompareOrig_ed.scrollToLine(0);
        CompareJs_ed.scrollToLine(0);


    function loadFile(fileName, callback) 

//    syncEditors([CompareOrig_ed, CompareJs_ed],false);

        CompareJs_ed.setValue("");

        CompareOrig_ed.setValue("Loading...");
        CompareOrig_ed.resize(true);

        document.getElementById('status').textContent=fileName;
        
/*
        $.ajax({

            url: fileName

            success: function (data:string)

                    data = data.replace('\r',''); // remove CR from windows-edited files

                    CompareOrig_ed.setValue(data);

                    CompareOrig_ed.clearSelection();
                    CompareOrig_ed.scrollToLine(0);

                    if callback, callback(null,data);

            error: function (jqxhr, textStatus, errorThrown)
                    global declare alert
                    declare valid jqxhr.responseText
                    alert jqxhr.responseText

                    if callback, callback(jqxhr);
         })
*/

        httpGet fileName, function(err,data:string)

                if err and no data, data=err.toString();
                data = data.replace('\r',''); // remove CR from windows-edited files

                CompareOrig_ed.setValue(data);

                CompareOrig_ed.clearSelection();
                CompareOrig_ed.scrollToLine(0);

                if callback, callback(err,data);


    function mkEditor(divName) returns ace.Editor

        var editor = ace.edit(divName);
        editor.setTheme("ace/theme/monokai");
        editor.setShowPrintMargin(false);
        editor.setFontSize(16);

        var session = editor.getSession();
        session.setUseWorker(false);
        session.setMode("ace/mode/javascript");
        return editor;


    function addLines(lineArray, ed:ace.Editor)

            if no lineArray, return;

            if  type of lineArray is 'string' 
                var a=[];
                a[0]=lineArray;
                lineArray=a;


            //console.log(lineArray);
            ed.session.doc.insertLines(ed.session.doc.getLength()-1, lineArray);
            ed.resize(true);


### function syncEditors(aceEditors: ace.Editor array, onOff)

Sync side-by-side ace editors scrolling
from http://codepen.io/ByScripts/pen/fzucK

        for n=0 while n<aceEditors.length
            var session1 = aceEditors[n].session;
            if onOff is off //disconnect
                session1.removeAllListeners('changeScrollTop');
                session1.removeAllListeners('changeScrollLeft');
            
            else  //connect

                var session2 = aceEditors[n is aceEditors.length-1 ? 0 else n+1].session;

                session1.on 'changeScrollTop',
                  function(scroll) 
                    session2.setScrollTop(parseInt(scroll) or 0)
                  
                
                /*session1.on('changeScrollLeft',
                  function(scroll) {
                    session2.setScrollLeft(parseInt(scroll) || 0)
                  }
                );
    */
                session2.on 'changeScrollTop',
                  function(scroll) 
                    session1.setScrollTop(parseInt(scroll) or 0)
                  
                
    /*            session2.on('changeScrollLeft',
                  function(scroll) {
                    session1.setScrollLeft(parseInt(scroll) || 0)
                  }
                );
    */


