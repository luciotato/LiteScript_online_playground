### Creating Shims ###

if you don't want to replace a method if it already exists in the Class
(for example: when creating shims), you can use:

`shim` before the method declaration.

Example:

    Append to class String

        shim method startsWith(text:string)
            return .slice(0, text.length) is text

        shim method endsWith(text:string)
            return .slice(-text.length) is text


You can also specify property attributes, [not enumerable] for example,
in order to add shims to delicate js core classes as Array

    Append to class Array

        method removeElem(element)  [not enumerable, not writable, configurable]

            if this.indexOf(element) into var inx >= 0
                 return this.splice(inx,1)

        end method

When property attributes are present, method addition 
is done by Object.DefineProperty
