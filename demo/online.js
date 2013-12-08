//------------
// GLOBAL
// -----------
var MainLite_ed;
var CompareOrig_ed;
var CompareJs_ed;

//var sourcePadded=[];
//var sourcePadded_onSrceIndex=0;

var kal = require('kal');
var compileOptions = {bare:true};

//----------------------------------
// utility String protoype functions
//----------------------------------
if (!String.prototype.startsWith)
    String.prototype.startsWith =
	 function(s){ return ( this.substr(0,s.length)===s); }; 
     
if (!String.prototype.endsWith)
    String.prototype.endsWith =
	 function(s){ return ( this.substr(-s.length)===s); }; 
     
if (!String.prototype.has)
    String.prototype.has = 
	 function(s){ return ( this.indexOf(s)!==-1); }; 

//------------
// MAIN
// -----------
function OnLine_Main(){
    CompareOrig_ed = mkEditor("Compare-Lite");
    CompareJs_ed = mkEditor("Compare-js");
    loadSample('literate.litkal');
}

function loadFile(fileName, callback) {

//    syncEditors([CompareOrig_ed, CompareJs_ed],false);

    CompareJs_ed.setValue("");

    CompareOrig_ed.setValue("Loading...");
    CompareOrig_ed.resize(true);

    document.getElementById('status').textContent=fileName;
    httpGet(fileName
        ,function(err,data){
            if (err && !data) data=err.toString();
            data = data.replace('\r',''); // remove CR from windows-edited files

            CompareOrig_ed.setValue(data);

            CompareOrig_ed.clearSelection();
            CompareOrig_ed.scrollToLine(0);

            if (callback) callback(err,data);
        }
    );
}

function loadSample(fname,callback) {

    loadFile('demo/examples/'+fname,
    
            function (err,data){
                
                if (err) return;

                compileOptions.literate = fname.endsWith('.litkal');
                run();
                
            });
}

function mkEditor(divName){

    var editor = ace.edit(divName);
    editor.setTheme("ace/theme/monokai");
    editor.setShowPrintMargin(false);
    editor.setFontSize(16);
    editor.addLines=addLines; //function addLines(lineArray)
    var session = editor.getSession();
    session.setUseWorker(false);
    session.setMode("ace/mode/javascript");
    return editor;
}

// ace.editor.prototype.addLines
function addLines(lineArray){

    if (!lineArray) return;

    if ( typeof lineArray === 'string' ) {
        var a=[];
        a[0]=lineArray;
        lineArray=a;
        }

    //console.log(lineArray);
    this.session.doc.insertLines(this.session.doc.getLength()-1, lineArray);
    this.resize(true);
}


function syncEditors(aceEditors,onOff){
// Sync side-by-side ace editors scrolling
// from http://codepen.io/ByScripts/pen/fzucK

    for(var n=0;n<aceEditors.length;n++){
        var session1 = aceEditors[n].session;
        if (onOff===false){ //disconnect
            session1.removeAllListeners('changeScrollTop');
            session1.removeAllListeners('changeScrollLeft');
        }
        else { //connect

            var session2 = aceEditors[n==aceEditors.length-1?0:n+1].session;

            session1.on('changeScrollTop',
              function(scroll) {
                session2.setScrollTop(parseInt(scroll) || 0)
              }
            );
            /*session1.on('changeScrollLeft',
              function(scroll) {
                session2.setScrollLeft(parseInt(scroll) || 0)
              }
            );
*/
            session2.on('changeScrollTop',
              function(scroll) {
                session1.setScrollTop(parseInt(scroll) || 0)
              }
            );
/*            session2.on('changeScrollLeft',
              function(scroll) {
                session1.setScrollLeft(parseInt(scroll) || 0)
              }
            );
*/
        }
    }
};


function run() {

//    try{

        var kalSource=CompareOrig_ed.session.getValue();

            //clear
            //syncEditors([CompareOrig_ed, CompareJs_ed], false); //un-sync
            //CompareOrig_ed.setValue("");
            CompareOrig_ed.resize(true);
            //CompareJs_ed.setValue("");
            //CompareJs_ed.resize(true);

            var compiled;
            // compile kal -> js
            try{
                compiled = kal.compile(kalSource,compileOptions);
            } catch(e){
                compiled = e || e.message;
            }

            CompareJs_ed.setValue(compiled);

            linesKal=CompareOrig_ed.session.getLength();
            linesJs=CompareJs_ed.session.getLength();

            while (linesKal<linesJs) {
                CompareOrig_ed.addLines(' ');
                linesKal++;
            }
            while (linesJs<linesKal) {
                CompareJs_ed.addLines(' ');
                linesJs++;
            }
            
            //sync eds
            syncEditors([CompareOrig_ed, CompareJs_ed]);

            CompareOrig_ed.clearSelection();
            CompareJs_ed.clearSelection();

            CompareOrig_ed.scrollToLine(0);

//    }catch(ex){
//        console.trace();
//        addRun("ERR: " + ex.message);
//    }
}
