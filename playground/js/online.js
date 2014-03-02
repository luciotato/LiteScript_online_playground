//Dependencies
//-------------

   //compiler import jQuery, Document

   //compiler import ace

   //compiler import httpGet, require

//Setup Environment
//-----------------

//emulate node's environment, global & 'process'
//for the LiteScript compiler

   var global = window;

   //append to object window
   
        //properties
            //process:
       window.process={
               exit: function (code){
                   //throw new Error('exit code '+code)
                   throw new Error('exit code ' + code);
               }
               };
       

//set compiler log messages to memory

   //import log from '../lib/log'
   var log = require('./../lib/log');
   log.options.storeMessages = true;

    //declare on Error
        //controled, soft, stack

//import compiler

   //import LiteScript from '../lib/Compiler'
   var LiteScript = require('./../lib/Compiler');


//Page Vars
//---------

   var 
   CompareOrig_ed = undefined, 
   CompareJs_ed = undefined, 
   loadedFname = undefined, 
   compileOptions = {extraComments: true}
   ;

//utility String protoype functions
//----------

   //append to class String
   
       //shim method startsWith(s:string)
       if (!String.prototype.startsWith)
       String.prototype.startsWith = function(s){
          return this.substr(0, s.length) === s;
       };

       //shim method endsWith(s:string)
       if (!String.prototype.endsWith)
       String.prototype.endsWith = function(s){
          return this.substr(-s.length) === s;
       };

//MAIN
//-----------

   //function OnLine_Main()
   function OnLine_Main(){

       $("#version").text("v" + LiteScript.version);

       CompareOrig_ed = mkEditor("Compare-Lite");
       CompareJs_ed = mkEditor("Compare-js");

       loadSample('Literate.lite.md');
   };

   //end function


   //function loadSample(fname,callback)
   function loadSample(fname, callback){

       loadedFname = fname;
       loadExample(fname, function (err, data){
           //if err, return
           if (err) {
               return};
           run();
       });
   };

   //function run
   function run(){

       var liteSource = CompareOrig_ed.getValue();

        //clear
        //syncEditors([CompareOrig_ed, CompareJs_ed], false); //un-sync
        //CompareOrig_ed.setValue("");
       CompareOrig_ed.resize(true);
        //CompareJs_ed.setValue("");
        //CompareJs_ed.resize(true);

       log.warning.count = 0; //clear
       log.getMessages(); //clear
        // compile LiteScript -> js
       //try
       try{
           var compiled = LiteScript.compile(loadedFname, liteSource, compileOptions);
       
        }catch(e){
           console.log(e.stack);
           compiled = log.getMessages().join('\n');
           compiled += '\n' + e.message;
           //if not e.controled, compiled += '\n'+e.stack;
           if (!(e.controled)) {
               compiled += '\n' + e.stack};
           log.messages = [];
        };


       //if log.warning.count
       if (log.warning.count) {
            //Show warnings
           compiled = log.getMessages().join('\n') + compiled;
       };


       CompareJs_ed.setValue(compiled);

       var linesLite = CompareOrig_ed.getSession().getLength();
       var linesJs = CompareJs_ed.getSession().getLength();

       //while (linesLite<linesJs)
       while((linesLite < linesJs)){
           addLines(' ', CompareOrig_ed);
           linesLite++;
       };//end loop

       //while (linesJs<linesLite)
       while((linesJs < linesLite)){
           addLines(' ', CompareJs_ed);
           linesJs++;
       };//end loop


        //sync eds
        //syncEditors([CompareOrig_ed, CompareJs_ed]);

       CompareOrig_ed.clearSelection();
       CompareJs_ed.clearSelection();

       CompareOrig_ed.scrollToLine(0);
       CompareJs_ed.scrollToLine(0);
   };


   //function loadExample(fileName, callback)
   function loadExample(fileName, callback){

        //syncEditors([CompareOrig_ed, CompareJs_ed],false);

       CompareJs_ed.setValue("");

       CompareOrig_ed.setValue("Loading...");
       CompareOrig_ed.resize(true);

       document.getElementById('status').textContent = fileName;

       $.ajax({url: 'examples/html/' + fileName.replace(/\.lite\.md$/, ".html"), success: function (data){

                   data = data.replace('\r', ''); // remove CR from windows-edited files

                   CompareOrig_ed.setValue(data);

                   CompareOrig_ed.clearSelection();
                   CompareOrig_ed.scrollToLine(0);

                   //if callback, callback(null,data);
                   if (callback) {
                       callback(null, data)};
           }, error: function (jqxhr, textStatus, errorThrown){
                    //global declare alert
                    //declare valid jqxhr.responseText
                   alert(jqxhr.responseText);

                   //if callback, callback(jqxhr);
                   if (callback) {
                       callback(jqxhr)};
           }});
   };


//        httpGet fileName, function(err,data:string)

//                if err and no data, data=err.toString();
//                data = data.replace('\r',''); // remove CR from windows-edited files

//                CompareOrig_ed.setValue(data);

//                CompareOrig_ed.clearSelection();
//                CompareOrig_ed.scrollToLine(0);

//                if callback, callback(err,data);

   //function mkEditor(divName) returns ace.Editor
   function mkEditor(divName){

       var editor = ace.edit(divName);
       editor.setTheme("ace/theme/monokai");
       editor.setShowPrintMargin(false);
       editor.setFontSize(16);

       var session = editor.getSession();
       session.setUseWorker(false);
       session.setMode("ace/mode/javascript");
       return editor;
   };


   //function addLines(lineArray, ed:ace.Editor)
   function addLines(lineArray, ed){

           //if no lineArray, return;
           if (!lineArray) {
               return};

           //if  type of lineArray is 'string'
           if (typeof lineArray === 'string') {
               var a = [];
               a[0] = lineArray;
               lineArray = a;
           };


            //console.log(lineArray);
           ed.session.doc.insertLines(ed.session.doc.getLength() - 1, lineArray);
           ed.resize(true);
   };


   //function syncEditors(aceEditors: ace.Editor array, onOff)
   function syncEditors(aceEditors, onOff){

//Sync side-by-side ace editors scrolling
//from http://codepen.io/ByScripts/pen/fzucK

       //for n=0 while n<aceEditors.length
       for( var n=0; n < aceEditors.length; n++) {
           var session1 = aceEditors[n].session;
           //if onOff is off //disconnect
           if (onOff === false) { //disconnect
               session1.removeAllListeners('changeScrollTop');
               session1.removeAllListeners('changeScrollLeft');
           }
           
           else {

               var session2 = aceEditors[n === aceEditors.length - 1 ? 0 : n + 1].session;

               session1.on('changeScrollTop', function (scroll){
                   session2.setScrollTop(parseInt(scroll) || 0);
                 });


//session1.on('changeScrollLeft',
//                  function(scroll) {
//                    session2.setScrollLeft(parseInt(scroll) || 0)
//                  }
//                );
//    
               session2.on('changeScrollTop', function (scroll){
                   session1.setScrollTop(parseInt(scroll) || 0);
                 });
           };
       }; // end for n
       
   };


//session2.on('changeScrollLeft',
//                  function(scroll) {
//                    session1.setScrollLeft(parseInt(scroll) || 0)
//                  }
//                );
//    




//Compiled by LiteScript compiler v0.6.0, source: /home/ltato/LiteScript_online_playground/playground/js/online.md
//# sourceMappingURL=online.js.map
