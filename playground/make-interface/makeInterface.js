//Dependencies
//------------

   //compiler import Document from '../js/Document'
   //compiler import jQuery from '../js/jQuery'
   //compiler import ace from '../js/ace'

//Page Vars
//---------

   var 
   CompareOrig_ed = undefined, 
   CompareJs_ed = undefined, 
   loadedFname = undefined
   ;

//setup environment
//-----

    //global declare httpGet

    //import log from '../lib/log'

    //declare valid log.options.storeMessages
    //log.options.storeMessages = true;

    //declare on Error
        //controled, stack

//emulate node's 'process'

   //append to object window
   
        //properties
            //process =
       window.process={
               exit: function (code){
                   //throw new Error('exit code '+code)
                   throw new Error('exit code ' + code);
               }
               };
       

//get Compiler


    //import LiteScript from '../lib/Compiler'
    //var compileOptions = {extraComments:true};

    //declare valid LiteScript.version
    //declare valid LiteScript.compile


//MAIN
//----

   //function main()
   function main(){

        //document.getElementById("version").innerHTML = "v#{LiteScript.version}"

       CompareOrig_ed = mkEditor("Compare-Lite");
   };

   //end function


   //function makeInterface()
   function makeInterface(){

       //if document.getElementById("globalName").value into var globalName
       var globalName=undefined;
       if ((globalName=document.getElementById("globalName").value)) {

           //if no window[globalName] into var globalObj
           var globalObj=undefined;
           if (!((globalObj=window[globalName]))) {
               CompareOrig_ed.setValue('no object named ' + globalName + ' found on global namespace');
           }
           
           else {
               mkInterface(globalName, globalObj);
           };
       };
   };

   //end


   //function newMkInterface()
   function newMkInterface(){

       //if document.getElementById("globalName").value into var globalName
       var globalName=undefined;
       if ((globalName=document.getElementById("globalName").value)) {

           //if no window[globalName] into var globalObj
           var globalObj=undefined;
           if (!((globalObj=window[globalName]))) {
               CompareOrig_ed.setValue('no object named ' + globalName + ' found on global namespace');
           }
           
           else {
               var x = new globalObj();
               mkInterface(globalName, x);
           };
       };
   };


   //function mkInterface(name,obj)
   function mkInterface(name, obj){

       var out = new Output();
       NameDeclaration.foundClasses = []; //clear

       var nameDecl = new NameDeclaration(name, obj);

       nameDecl.processMain(out);

       CompareOrig_ed.setValue(out.toString());
   };

   //end function


   //class Output
   //constructor
   function Output(){
        //properties

            //text: string array = []
            //indentSpace = '    '
            //headers: string array = []
            //pendingHeaders
       this.text=[];
       this.indentSpace='    ';
       this.headers=[];
   };
        //declare name affinity out


       //method indent
       Output.prototype.indent = function(){
           this.indentSpace += '    ';
       };

       //method deindent
       Output.prototype.deindent = function(){
           this.indentSpace = this.indentSpace.slice(4);
       };

       //method setHeader(s:string)
       Output.prototype.setHeader = function(s){
           this.headers.push(this.indentSpace + s);
           this.pendingHeaders = this.headers.length;
       };

       //method clearHeader
       Output.prototype.clearHeader = function(){
           this.headers.pop();
           this.pendingHeaders = this.headers.length;
       };

       //method push(s:string)
       Output.prototype.push = function(s){

           //if s
           if (s) {
               //for inx=0 while inx<.pendingHeaders
               for( var inx=0; inx < this.pendingHeaders; inx++) {
                   this.text.push(this.headers[inx]);
                   this.headers[inx] = undefined;
               }; // end for inx
               //end for
               this.pendingHeaders = 0;
           };

           this.text.push(this.indentSpace + s);
       };

       //method toString
       Output.prototype.toString = function(){
           return this.text.join("\n");
       };
   //end class Output



   //class NameDeclaration
   //constructor
       function NameDeclaration(name, obj, parent){
        //properties
            //parent: NameDeclaration
            //name
            //type
            //params: string
            //members: Object
            //pointer

           this.name = name;
           this.pointer = obj;
           this.parent = parent;

           this.type = typeof obj;

           //if .type is 'function'
           if (this.type === 'function') {
               var source = obj.toString();
               this.params = source.slice(source.indexOf('('), source.indexOf('{'));
           };

            //declare valid obj.prototype
           //if .type is 'function' and obj.prototype and Object.getOwnPropertyNames(obj.prototype).length>4
           if (this.type === 'function' && obj.prototype && Object.getOwnPropertyNames(obj.prototype).length > 4) {
               this.type = 'class';
               //for each nameDecl in NameDeclaration.foundClasses
               for( var nameDecl__inx=0,nameDecl ; nameDecl__inx<NameDeclaration.foundClasses.length ; nameDecl__inx++){nameDecl=NameDeclaration.foundClasses[nameDecl__inx];
               
                   //if nameDecl.name is this.name, return #do not duplicate
                   if (nameDecl.name === this.name) {
                       return};
               }; // end for each in NameDeclaration.foundClasses
               NameDeclaration.foundClasses.push(this);
           };
       };
        //namespace properties
            //foundClasses = []
       NameDeclaration.foundClasses=[];


       //method processMain(out, comment)
       NameDeclaration.prototype.processMain = function(out, comment){

               this.getMembersFromObjProperties();

               //if .type isnt 'class'
               if (this.type !== 'class') {
                   out.indentSpace = '    ';
                   out.push("");
                   out.push('namespace ' + this.toString());
                   this.pushMethodsAndProperties(out);
               };

                //while found classes
               //while NameDeclaration.foundClasses.length
               while(NameDeclaration.foundClasses.length){
                   var nameDecl = NameDeclaration.foundClasses.shift();
                   nameDecl.processClass(out);
               };//end loop
               
       };


       //method processClass(out, comment)
       NameDeclaration.prototype.processClass = function(out, comment){

               this.getMembersFromObjProperties();

               out.indentSpace = '    ';
               out.push('public ' + this.type + ' ' + this.name);

                // constructor
               //if .params
               if (this.params) {
                   out.indent();
                   out.push('constructor new ' + this.name + ' ' + this.params);
                   out.push("");
                   out.deindent();
               };

                // out props from prototype
                //declare valid .members._prototype.pushMethodsAndProperties
               this.members._prototype.pushMethodsAndProperties(out);

                //now as namespace
               this.processAppendToNamespace(out);
       };


       //method processAppendToNamespace(out)
       NameDeclaration.prototype.processAppendToNamespace = function(out){

               out.indentSpace = '    ';
               out.setHeader("");
               out.setHeader('append to namespace ' + this.name);
               this.pushMethodsAndProperties(out);
               out.clearHeader();
               out.clearHeader();
       };


       //method pushMethodsAndProperties(out, comment)
       NameDeclaration.prototype.pushMethodsAndProperties = function(out, comment){

                //properties
               out.indent();
               out.setHeader('properties');
               out.indent();
               //for each own property key,nameDecl in .members
               var nameDecl=undefined;
               for ( var key in this.members)if (this.members.hasOwnProperty(key)){nameDecl=this.members[key];
               if(nameDecl.type !== 'function' && nameDecl.type !== 'class' && nameDecl.name !== 'prototype'){

                       nameDecl.pushMembers(out);
                       }
                       
                       }//end for each property
                        //out.push indent+'#{protoypeMember.name}:#{protoypeMember.type}'

               out.clearHeader();
               out.deindent();

                //out.setHeader ""
                //out.setHeader "//methods"
               out.setHeader("");

               //for each own property key,methodNameDecl in .members
               var methodNameDecl=undefined;
               for ( var key in this.members)if (this.members.hasOwnProperty(key)){methodNameDecl=this.members[key];
               if(methodNameDecl.type === 'function'){
                       out.push("method " + methodNameDecl.name + (methodNameDecl.params || ''));
                       }
                       
                       }//end for each property

               out.clearHeader();
                //out.clearHeader
                //out.clearHeader
                //out.push ""

               out.deindent();
       };

        //declare name affinity nameDecl

       //helper method pushMembers(out) #recursive
       NameDeclaration.prototype.pushMembers = function(out){// #recursive

//recursively writes a object declaration

           //if .name not like /^[a-zA-Z$_]+$/, return # exclude strange/private names
           if (!(/^[a-zA-Z$_]+$/.test(this.name))) {
               return};

           //if .type is 'object' and .members
           if (this.type === 'object' && this.members) {

               out.setHeader('' + this.name + ':');
               //for each own property key,nameDecl in .members
               var nameDecl=undefined;
               for ( var key in this.members)if (this.members.hasOwnProperty(key)){nameDecl=this.members[key];
                   {
                   out.indent();
                   nameDecl.pushMembers(out);
                   out.deindent();
                   }
                   
                   }//end for each property
               out.clearHeader();
           }
           
           else if (this.type === 'class') {
               //do nothing
               null;
           }
                //out.push '#{.name}:#{"function"}#{.params or ""} #CLASS'
           
           else {
               out.push('' + this.name + ':' + this.type + (this.params || ""));
           };
           //end if
           
       };



       //helper method getMembersFromObjProperties() returns array #Recursive
       NameDeclaration.prototype.getMembersFromObjProperties = function(){// #Recursive

//Recursively converts a obj properties in NameDeclarations.
//it's used when a pure.js module is imported by 'require'
//to convert required 'exports' to LiteScript compiler usable NameDeclarations
//Also to load the global scope with built-in objects

           //if .pointer instanceof Object //or obj is Object.prototype
           if (this.pointer instanceof Object) { //or obj is Object.prototype

             //for each prop in Object.getOwnPropertyNames(.pointer) #even not enumerables
             var _list1=Object.getOwnPropertyNames(this.pointer);
             for( var prop__inx=0,prop ; prop__inx<_list1.length ; prop__inx++){prop=_list1[prop__inx];
             if(prop !== '__proto__' && prop !== 'super_' && prop !== 'constructor' && !((typeof this.pointer === 'function' && ['caller', 'arguments', 'length', 'name'].indexOf(prop)>=0))){

                   var value = this.pointer[prop];

                    //create
                   var newMember = new NameDeclaration(prop, value, this);

                    //print newMember.toString()
                   //if no .members, .members = {}
                   if (!this.members) {
                       this.members = {}};
                   this.members[NameDeclaration.normalize(prop)] = newMember;

                   //if newMember.type isnt 'class'
                   if (newMember.type !== 'class') {

                       //if value instanceof Object
                       if (value instanceof Object && !(this.isInParents(value)) && this.countDepth() < 2) {

                           newMember.getMembersFromObjProperties();// #recursive
                       };
                   };
             }}; // end for each in Object.getOwnPropertyNames(this.pointer)
             
           };
       };

       //end method


       //helper method countDepth()
       NameDeclaration.prototype.countDepth = function(){
           var result = 0;
           var nameDecl = this.parent;
           //while nameDecl
           while(nameDecl){
             result++;
             nameDecl = nameDecl.parent;
           };//end loop
           return result;
       };

       //helper method isInParents(value)
       NameDeclaration.prototype.isInParents = function(value){

//return true if a property name is in the parent chain.
//Used to avoid recursing circular properties

           var nameDecl = this.parent;
           //while nameDecl
           while(nameDecl){
             //if nameDecl.pointer is value,return true
             if (nameDecl.pointer === value) {
                 return true};
             nameDecl = nameDecl.parent;
           };//end loop
           
       };

       //end helper method

       //helper method toString
       NameDeclaration.prototype.toString = function(){

           var result = this.name;
           var a = this.parent;
           //while a
           while(a){
               result = a.name + '.' + result;
               a = a.parent;
           };//end loop

           return "" + result;
       };
   //end class NameDeclaration


   //Append to namespace NameDeclaration
   
       //method normalize(name)
       NameDeclaration.normalize = function(name){
           return "_" + name;
       };




   //function mkEditor(divName)
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

   //function addLines(ed:ace.Editor, lineArray)
   function addLines(ed, lineArray){

       //if no lineArray, return;
       if (!lineArray) {
           return};

       //if type of lineArray is 'string'
       if (typeof lineArray === 'string') {
           var a = [];
           a[0] = lineArray;
           lineArray = a;
       };


        //console.log(lineArray);
       ed.session.doc.insertLines(ed.session.doc.getLength() - 1, lineArray);
       ed.resize(true);
   };



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




//Compiled by LiteScript compiler v0.6.0, source: /home/ltato/LiteScript_online_playground/playground/make-interface/makeInterface.lite.md
//# sourceMappingURL=makeInterface.js.map
