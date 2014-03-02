You can add class methods and properties
after the class is defined (in another file, for example)
by using the `Append to class` construction.

The `Append to class` construction is a shortcut 
for altering the Class `prototype` object.

    class MyClass

      properties
        value

      constructor(c)
        .value = c 

      method myMethod(c)
        print .value

    end class

    var x = new MyClass(0)
    var y = new MyClass(20)

    x.myMethod # prints 0

    y.myMethod # prints 20


Now we append more methods to the class

    Append to class MyClass
        method otherMethod() # adds another method
            print this.value + 100

    x.otherMethod # prints 100
    y.otherMethod # prints 120


Append to Namespace
-------------------

You can also use the `Append to namespace` construction
*to add methods and properties to a specific object*

Used with classes, is like adding Java & C# 'static' members.

    Append to namespace MyClass

Here, we're adding properties and functions 
directly to javascript's function-class-constructor 'MyClass'.

        properties
            SeverityNames = [
                "normal"
                "warning"
                "It's a cookbook!"
                ]
    
        method show
            print "class MyClass"

    end append

    print MyClass.SeverityNames[1]

> warning

namespace properties, are used normally, as any object property

    Append to class MyClass
        method severity()
            print MyClass.SeverityNames[.value]
    end append

    x.severity

> normal


