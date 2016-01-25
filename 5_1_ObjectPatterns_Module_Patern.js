// PRIVATE AND PRIVILEGED MEMBERS

// Module Pattern
// The module pattern is an object-creation pattern designed to create singleton
// objects with private data. The basic approach is to use an 
// Immediately Invoked Function Expression (IIFE) that returns an object.
// Methods that access private data in this way are called privileged methods.

var yourObject = (function(){
    // private data variables
    return {
        // public methods and properies
    }
}());
// In this pattern, an anonymous function is created and executed immediately. 
// That means the function exists for just a moment, is executed, and then is destroyed.

// The module pattern allows you to use regular variables as de facto object properties 
// that aren’t exposed publicly. You accomplish this by creating closure functions as object methods.
var person = (function(){
    var age = 25
    return {
        name:"Edwin",
        getAge:function(){      // privileged Object
            return age
        },
        growOlder:function(){   // privileged Object 
            age++
        }
    }
}())
console.log(person.age)// undefined // which means that age vairable is not accessagle from outside
console.log(person.name)// Edwin
console.log(person.getAge())// 25
person.age = 100
console.log(person.getAge())// 25
person.growOlder()
console.log(person.getAge())// 26

// Revealing Module Pattern
person1 = (function(){
    var age = 25
    function getAge(){
        return age
    }
    function growOlder(){
        age++
    }
    return {
        name:"Marine",
        getAge:getAge,
        growOlder:growOlder
    }
}())

// Private Members for Constructors
function Person(name){
    //define a variable only accessable inside of the Person constructor
    var age = 25
    this.name = name
    this.getAge = function(){
        return age
    }
    this.growOlder = function(){
        age++
    }
}
var pers = new Person("David")
console.log(pers.age)// undefined
console.log(pers.name)// David
console.log(pers.getAge())// 25
pers.age = 100
console.log(pers.getAge())// 25
pers.growOlder()
console.log(pers.getAge())// 26
var asdf = new Person("asdf")
console.log(asdf.name + " " + asdf.getAge())// 25
pers.growOlder()
console.log(asdf.name + " " + asdf.getAge())// 25
// As we've seen earlier, placing methods on an object instance is less efficient 
// than doing so on the prototype, but this is the only approach possible 
// when you want private, instance-specific data.
//
// If you want private data to be shared across all instances (as if it were on the prototype), 
// you can use a hybrid approach that looks like the module pattern but uses a constructor:
var Person1 = (function(){
    // everyone shares the same age
    var age = 25
    
    function InnerPerson(name){
        this.name = name
    }
    InnerPerson.prototype.getAge = function(){
        return age
    }
    InnerPerson.prototype.growOlder = function(){
        age++
    }
    return InnerPerson
}())

var protoPers1 = new Person1("Edwin Gasparian")
var protoPers2 = new Person1("Marine Gabrielyan")
console.log(protoPers1.name)// Edwin Gasparian
console.log(protoPers1.getAge())// 25
console.log(protoPers2.name)// Marine Gabrielyan
console.log(protoPers2.getAge())// 25
protoPers1.growOlder()
console.log(protoPers1.getAge())// 26
console.log(protoPers2.getAge())// 26
//All instances of Person end up sharing the age variable, 
//so changing the value with one instance automatically affects the other instance.
// ===============================================================================






































