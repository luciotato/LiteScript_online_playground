Dependencies
------------

    compiler import Document from '../js/Document'
    compiler import jQuery from '../js/jQuery'
    compiler import ace from '../js/ace'
  
Page Vars
---------

    var 

        CompareOrig_ed: ace.Editor
        CompareJs_ed: ace.Editor

        loadedFname

setup environment
-----

    global declare httpGet

    import log from '../lib/log'
    
    declare valid log.options.storeMessages
    log.options.storeMessages = true;

    declare on Error
        controled, stack
    
emulate node's 'process'

    append to object window
        properties 
            process =
                exit:function(code)
                    throw new Error('exit code '+code)

get Compiler


    import LiteScript from '../lib/Compiler'
    var compileOptions = {extraComments:true};

    declare valid LiteScript.version
    declare valid LiteScript.compile

        
MAIN
----

    function main()

        document.getElementById("version").innerHTML = "v#{LiteScript.version}"

        CompareOrig_ed = mkEditor("Compare-Lite");

    end function


    function makeInterface() 
    
        if document.getElementById("globalName").value into var globalName 

            if no window[globalName] into var globalObj
                CompareOrig_ed.setValue 'no object named #{globalName} found on global namespace'
            else
                mkInterface globalName,globalObj 

    end


    function newMkInterface()

        if document.getElementById("globalName").value into var globalName 

            if no window[globalName] into var globalObj
                CompareOrig_ed.setValue 'no object named #{globalName} found on global namespace'
            else
                var x = new globalObj 
                mkInterface globalName,x 


    function mkInterface(name,obj)

        var out = new Output
        NameDeclaration.foundClasses = [] //clear

        var nameDecl = new NameDeclaration(name, obj)

        nameDecl.processMain out

        CompareOrig_ed.setValue out.toString()

    end function


    class Output

        declare name affinity out

        properties

            text: string array = []
            indentSpace = '    '
            headers: string array = []
            pendingHeaders


        method indent
            .indentSpace += '    '

        method deindent
            .indentSpace = .indentSpace.slice(4)
        
        method setHeader(s:string)
            .headers.push .indentSpace + s
            .pendingHeaders = .headers.length

        method clearHeader
            .headers.pop
            .pendingHeaders = .headers.length

        method push(s:string)

            if s
                for inx=0 while inx<.pendingHeaders
                    .text.push .headers[inx]
                    .headers[inx]=undefined
                end for
                .pendingHeaders=0

            .text.push .indentSpace + s

        method toString
            return .text.join("\n")



    class NameDeclaration

        namespace properties
            foundClasses = []

        properties
            parent: NameDeclaration
            name
            type
            params: string
            members: Object
            pointer


        constructor new NameDeclaration(name, obj,parent)
            .name = name
            .pointer = obj
            .parent = parent

            .type = typeof obj

            if .type is 'function'
                var source= obj.toString()
                .params = source.slice(source.indexOf('('),source.indexOf('{'))

            declare valid obj.prototype
            if .type is 'function' and obj.prototype and Object.getOwnPropertyNames(obj.prototype).length>4
                .type='class'
                for each nameDecl in NameDeclaration.foundClasses
                    if nameDecl.name is this.name, return #do not duplicate
                NameDeclaration.foundClasses.push this

        
        method processMain(out, comment)

                .getMembersFromObjProperties

                if .type isnt 'class'
                    out.indentSpace = '    '
                    out.push ""
                    out.push 'namespace '+.toString()
                    .pushMethodsAndProperties out

                //while found classes
                while NameDeclaration.foundClasses.length
                    var nameDecl = NameDeclaration.foundClasses.shift()
                    nameDecl.processClass out


        method processClass(out, comment)

                .getMembersFromObjProperties

                out.indentSpace = '    '
                out.push 'public '+.type+' '+.name

                // constructor
                if .params 
                    out.indent
                    out.push 'constructor new '+.name+' '+.params
                    out.push ""
                    out.deindent

                // out props from prototype
                declare valid .members._prototype.pushMethodsAndProperties
                .members._prototype.pushMethodsAndProperties out

                //now as namespace 
                .processAppendToNamespace out


        method processAppendToNamespace(out)

                out.indentSpace = '    '
                out.setHeader ""
                out.setHeader 'append to namespace '+.name
                .pushMethodsAndProperties out
                out.clearHeader
                out.clearHeader


        method pushMethodsAndProperties(out, comment)

                //properties 
                out.indent
                out.setHeader 'properties'
                out.indent
                for each own property key,nameDecl in .members
                    where nameDecl.type isnt 'function' 
                        and nameDecl.type isnt 'class'
                        and nameDecl.name isnt 'prototype'
                        
                        nameDecl.pushMembers out
                        //out.push indent+'#{protoypeMember.name}:#{protoypeMember.type}'

                out.clearHeader
                out.deindent

                //out.setHeader ""
                //out.setHeader "//methods"
                out.setHeader ""
                
                for each own property key,methodNameDecl in .members
                    where methodNameDecl.type is 'function'
                        out.push "method #{methodNameDecl.name}#{methodNameDecl.params or ''}"
                
                out.clearHeader
                //out.clearHeader
                //out.clearHeader
                //out.push ""

                out.deindent

        declare name affinity nameDecl

        helper method pushMembers(out) #recursive

recursively writes a object declaration

            if .name not like /^[a-zA-Z$_]+$/, return # exclude strange/private names

            if .type is 'object' and .members

                out.setHeader '#{.name}:'
                for each own property key,nameDecl in .members
                    out.indent
                    nameDecl.pushMembers out
                    out.deindent
                out.clearHeader
            
            else if .type is 'class'
                do nothing
                //out.push '#{.name}:#{"function"}#{.params or ""} #CLASS'

            else                
                out.push '#{.name}:#{.type}#{.params or ""}'
            end if



        helper method getMembersFromObjProperties() returns array #Recursive

Recursively converts a obj properties in NameDeclarations.
it's used when a pure.js module is imported by 'require'
to convert required 'exports' to LiteScript compiler usable NameDeclarations
Also to load the global scope with built-in objects

            if .pointer instanceof Object //or obj is Object.prototype

              for each prop in Object.getOwnPropertyNames(.pointer) #even not enumerables
                where prop isnt '__proto__' # exclude __proto__ 
                    and prop isnt 'super_' # exclude 
                    and prop isnt 'constructor' # exclude 
                    # and exclude 'function' core props
                    and not (typeof .pointer is 'function' and prop in ['caller','arguments','length','name'])

                    var value = .pointer[prop]

                    //create
                    var newMember = new NameDeclaration(prop,value,this)

                    //print newMember.toString()
                    if no .members, .members = {}
                    .members[NameDeclaration.normalize(prop)]=newMember

                    if newMember.type isnt 'class'

                        if value instanceof Object 
                            and not .isInParents(value)
                            and .countDepth()<2

                            newMember.getMembersFromObjProperties #recursive

        end method


        helper method countDepth()
            var result = 0        
            var nameDecl = this.parent
            while nameDecl
              result++
              nameDecl = nameDecl.parent
            return result

        helper method isInParents(value)

return true if a property name is in the parent chain.
Used to avoid recursing circular properties
        
            var nameDecl = this.parent
            while nameDecl
              if nameDecl.pointer is value,return true
              nameDecl = nameDecl.parent

        end helper method

        helper method toString

            var result=.name 
            var a=.parent
            while a
                result=a.name+'.'+result
                a=a.parent

            return "#{result}"


    Append to namespace NameDeclaration
        method normalize(name)
            return "_"+name;




    function mkEditor(divName) 

        var editor = ace.edit(divName);
        editor.setTheme("ace/theme/monokai");
        editor.setShowPrintMargin(false);
        editor.setFontSize(16);
        var session = editor.getSession();
        session.setUseWorker(false);
        session.setMode("ace/mode/javascript");
        return editor;

    function addLines(ed:ace.Editor, lineArray)

        if no lineArray, return;

        if type of lineArray is 'string' 
            var a=[];
            a[0]=lineArray;
            lineArray=a;


        //console.log(lineArray);
        ed.session.doc.insertLines(ed.session.doc.getLength()-1, lineArray);
        ed.resize(true);



utility String protoype functions
----------

    append to class String 
        shim method startsWith(s:string)
           return this.substr(0,s.length) is s
     
        shim method endsWith(s:string)
           return this.substr(-s.length) is s
     
