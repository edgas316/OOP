// === Constructors === 
function Construct(){}
construct1 = new Construct()
construct2 = new Construct()
//OR without parentheses if there is no parameters
construct1 = new Construct
construct2 = new Construct

// "insstanceof" is more preferable way to check constructor...
console.log(construct1 instanceof Construct)// true
console.log(construct2 instanceof Construct)// true
console.log(construct1.constructor === Construct)// true
console.log(construct2.constructor === Construct)// true

function Person(name){
    this.name = name
    this.sayName = function(){
        console.log("My name is " + this.name)
    }
}

var person1 = new Person("Edwin")
var person2 = new Person("Greg")
console.log(person1.name)// Edwin
console.log(person2.name)// Greg

person1.sayName()// My name is Edwin
person2.sayName()// My name is Greg

// Constructors allow you to initialize an instance of a type in a consistent way, 
// performing all of the property setup that is necessary before the object can be used. 
// For example, you could also use Object.defineProperty() 
// inside of a constructor to help initialize the instance:
function PersonConstruct(name){
    Object.defineProperty(this, "name", {
        get:function(){
            return name
        },
        set:function(newName){
            name = newName
        },
        enumerable:false,
        configurable:true
    })
    this.sayName = function(){
        console.log(this.name)
    }
}
// All new instances of PersonConstruct 
// Will inherit all property attributes defined in constructor...!!!
var instance = new PersonConstruct("Edwin")
console.log(Object.propertyIsEnumerable(instance.name))// false

// and alwais use new when you call constructor
var noNew = PersonConstruct("Gregory")// "this" inside of constructor becomes global!!!
console.log(noNew instanceof PersonConstruct)// false - inherited from PersonConstruct(enumerable:false)
console.log(typeof noNew)// undefined
console.log(name)// Gregory - because "==var name = "Gregory"==" is now a global variable!!!
// An error occurs if you call the Person constructor in strict mode without using new.
// This is because strict mode doesn’t assign this to the global object. Instead, this
// remains undefined, and an error occurs whenever you attempt to create a property on undefined.
// BUT EVRY TIME YOU CREATE AN INSTANCE OF CONSTRUCTOR YOU CREATE NEW COPY OF THE OBJECT
// IT MEANS THAT IF THERE IS 100 INSTANCES OF AN OBJECT, 
// THEN THERE ARE 100 COPIES OF A FUNCTION THAT DO THE SAME THING, JUST WITH DIFFERENT DATA...!!!
// HERE WHERE PROTOTYPES COME IN...!!!

// === PROTOTYPES === //
// You can think of a prototype as a recipe for an object.

var book = {
    title:"Object Oriented Javascript"
}

console.log("title" in book)// true
console.log(book.hasOwnProperty("title"))// true
console.log("hasOwnProperty" in book)// true
console.log(book.hasOwnProperty("hasOwnProperty"))// false
console.log(Object.prototype.hasOwnProperty("hasOwnProperty"))// true

// ======================================================================== //
// IDENTIFYING A PROTOTYPE PROPERTY
//You can determine whether a property is on the prototype 
// by using a function such as:
// ----------------------------------------------------------------------- //
function hasPrototypeProperty(object, name){
    return name in object && !object.hasOwnProperty(name)
}
// ----------------------------------------------------------------------- //
console.log(hasPrototypeProperty(book, "title"))// false
console.log(hasPrototypeProperty(book, "hasOwnProperty"))// true
// ======================================================================== //

// The [[Prototype]] Property
var object = {}
var prototype = Object.getPrototypeOf(object)
console.log(prototype === Object.prototype)// true
console.log(Object.prototype.isPrototypeOf(object))// true
console.log(object.toString())
object.toString = function(){
    return "[object Custom]"
}
console.log(object.toString())
delete object.toString
console.log(object.toString())
delete object.toString
console.log(object.toString()) 
// so you can delete only own properties
// You CAN NOT delete prototype property from an instance
// Because it is just a reference to a prototype... 

// Prototype with constructor
function PersonConstProto (name){
    this.name = name
}

PersonConstProto.prototype.sayName = function(){
    console.log("Your name is " + this.name)
}

var instOfconst1 = new PersonConstProto("Edwin")
var instOfconst2 = new PersonConstProto("Marine")

console.log(instOfconst1.name)// Ewin
console.log(instOfconst2.name)// Marine
instOfconst1.sayName()// Your name is Edwin
instOfconst2.sayName()// Your name is Marine

// OR better way to create prototype is using object notation pattern
// IMPORTANT TO REMEMBER...!!!
// ALWAIS DEFINE THE CONSTRUCTOR...!!!
PersonConstProto.prototype = {
    constructor:PersonConstProto,
    
    sayFullName:function(){
        console.log("this is your full name: " + this.name)
    },
    toString: function(){
        return "[Person " + this.name + "]"
    }
}

var ins1 = new PersonConstProto("Roberto")
var ins2 = new PersonConstProto("Hulio")

console.log(ins1.name)// Roberto
console.log(ins2.name)// Hulio
ins1.sayFullName()// this is your full name: Roberto
ins2.sayFullName()// this is your full name: Hulio

// Changing the prototype
// add a new method
PersonConstProto.prototype.sayHi = function(){
    console.log("Hi There!!! This is " + this.name)
}

ins1.sayHi()
ins2.sayHi()

Object.freeze(ins1)
PersonConstProto.prototype.checkIfFreezed = function(){
    if(this.checkIfFreezed != undefined){
        console.log("You are not frozen " + this.name)
    }else{
        console.log("You are frozen " + this.name)
    }
}

ins1.checkIfFreezed()
// !!! Even though the "ins1" is frozen
// the value (which is prototype object) is not
// and so it steel will add the method to the frozen object...!!!
// ===============================================================

// Built-in object Ptototypes
// Changing built-in objects 
Array.prototype.sum = function(){
    return this.reduce(function(a, b){
        return a+b
    })
}
var numbers = [1,2,3,4,5,6,7]
var result = numbers.sum()
console.log(result)
// While it is good to know how you can manipulate built-in objects
// It is NOT really good idea to change them in production environment...!!!
// Developers expect built-in objects to behave a certain way and have certain methods.
// Deliberately altering built-in objects violates those expectations 
// And makes other developers unsure how the objects should work.























