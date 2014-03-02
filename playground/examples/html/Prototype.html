## Classes and Prototypal Inheritance ##

LiteScript Embraces prototypal inheritance.

[Prototypal Inheritance in JavaScript, by Douglas Crockford]
(http://javascript.crockford.com/prototypal.html)

[Understanding “Prototypes” in JavaScript, by Yehuda Katz]
(http://yehudakatz.com/2011/08/12/understanding-prototypes-in-javascript)

Example:

    class Person

      properties
        name: string

      constructor new Person(name)
        .name = name

      method printName
        print .name

      method nameLength
        return .name.length

    end class

    var jen = new Person('Jen')
    jen.printName

> Jen
    
    print jen instance of Person 

> true


Classes can have other classes as prototypes, and override 
or add to their prototype method definitions.

    class FrumpyPerson extends Person

      method printName
        print 'Frumpy #{.name}'

      method nameLength
        return 'a frumpy ' + super.nameLength.call(this)

    end class

    var sue = new FrumpyPerson('Sue')
    
    sue.printName 
    
    print sue.nameLength()
    
> Frumpy Sue
> a frumpy 3

 
Checking if a object is instance of a Class
-------------------------------------------

`instance of Class` is used to check if an object is an instance of a class 
(or one of its parent Classes)

Synonyms:
  `is instance of Class`
  `instanceof Class`

Negation:
  `isnt instance of Class`

Full grammar:
`object-IDENTIFIER [(is|isnt|is not) (instance of|instanceof) Class-IDENTIFIER`

As expected, an object `is instance of` its Class and also 
`is instance of` all classes up the prototype chain.

    print sue instance of Person # prints true
    print sue is instance of FrumpyPerson # prints true
    print jen isnt instance of FrumpyPerson # prints true

> true
> true
> true
 
