// Prototype Chaining and Object.prototype
// Prototype chainint or prototypal inheritsnce
var book = {
    title: "Object Oriented Javascript"
}
var prototype = Object.getPrototypeOf(book)
console.log(Object.getPrototypeOf(book))// Object{}
console.log(prototype === Object.prototype)// true
// Here book has a prototype === to Object.prototype

// === Methods inherited from Object.prototype === //
// hasOwnProperty()// Determines whether an own property with the given name exists
// propertyIsEnumerable()// Determines whether an own property is enumerable
// isPrototypeOf()// Determines whether the object is the prototype of another
// valueOf()// Returns the value representation of the object
// toString()// Returns a string representation of the object

// valueOg()
// The valueOf() method gets called whenever an operator is used on an object.
var now = new Date()
var earlier = new Date(2010, 1, 1)
console.log(now > earlier)// true

// toString()
// The toString() method is called as a fallback whenever valueOf() returns a
// reference value instead of a primitive value.
var message = "Book = " + book
console.log(message)// Book = [object Object]
// so here book(which is a regference value) was converted to string...

// but you can define your own behavior of toString value...
var book1 = {
    title:"Object Oriented Javascript is awesome...!!!",
    toString:function(){
        return "[Book: " + this.title +"]"
    }
}
var message1 = "Book = "+book1
console.log(message1)

//// ==========================================================================
//// uncoment to see the results...
//
//// Modifying Object.prototype
////=== !!! DON'T EVER DO IT !!! ===\\
//// =====================================
//Object.prototype.add = function(value){
//    return this + value
//}
//// ====================================
//var book2 = {
//    title:"some book"
//}
//console.log(book2.add(5))// [object Object]5
//console.log("title".add("end"))// titleend
//console.log(document.add(true))// [object HTMLDocument]true
//console.log(window.add(5))// [object Window]5
//// Adding Object.prototype.add() causes all objects to have an add()
//// method, whether or not it actually makes sense.
//
//// Another aspect of this problem involves adding enumerable properties
//// to Object.prototype.
//var empty = {}
//for(var property in empty){
//    console.log(property)
//} // add
//
//// Here, an empty object will still output "add" as a property 
//// because it exists on the prototype and is enumerable. 
//// So modifying Object.prototype with enumerable properties 
//// has the potential to affect a lot of code. For this reason,
//// it is recommended using hasOwnProperty() in for-in loops all the time:
//for(var property in empty){
//    if(empty.hasOwnProperty(property)){
//        console.log(property)
//    }else{
//        console.log("there is no own properties...")
//    }
//}
//// While this approach is effective against possible unwanted prototype
//// properties, it also limits the use of for-in to only own properties, which
//// may or may not be what you want. Your best bet for the most flexibility is
//// to not modify Object.prototype...!!!!!!!!!!!!!!!!!!!!
//// =============================================================================


// === Object inheritance ===
// to create a new object javascript engine (in this case) 
// uses prototypal chain...
var inheritBook = {
    tittle:"Javascript Object Inheritance"
}
// is the same as
var inheritBookCopy = Object.create(Object.prototype, {
    title:{
        configurable:true,
        enumerable: true,
        value:"Javascript Object Inheritance",
        writable:true
    }
})
// but you will never use the second pattern
// it's just good to know...

var person1 = {
    name: "Edwin",
    sayName:function(){
        console.log("this is your name " + this.name)
        return "this is your name " + this.name
    }
}

var person2 = Object.create(person1, {
    name:{
        configurable:true,
        enumerable:true,
        value:"Tim",
        writable:true
    }
})

var person3 = Object.create(person1)

person1.sayName()// this is your name Edwin
person2.sayName()// this is your name TIm
console.log(person1.hasOwnProperty("sayName"))// true
console.log(person1.isPrototypeOf(person2))// true
console.log(person2.hasOwnProperty("sayName"))// false
console.log(person2)
console.log(person3)
console.log(person3.name + " "+ person3.sayName())

// === Constructor Inheritance ===
function MyConstructor(){
    // initialization
}
// Javascript engine does this...
MyConstructor.prototype = Object.create(Object.prototype, {
    constructor:{
        configurable:true,
        enumerable:true,
        value:MyConstructor,
        writable:true
    }
})
// YourConstructor is a subtype of Object, 
// and Object is a supertype of MyConstructor.

// Because the prototype property is writable, you can change the prototype
// chain by overwriting it.
function Rectangle(length, width){
    this.length = length
    this.width = width
}

Rectangle.prototype.getArea = function(){
    return this.length * this.width
}

Rectangle.prototype.toString = function(){
    return "[Rectangle "+ this.length + "x"+ this.width+ "]"
}

// Inherits from Rectangle construvtor to create new Conctructor
function Square(size){
    this.length = size
    this.width = size
}

Square.prototype = new Rectangle()
Square.prototype.constructor = Square

Square.prototype.toString = function(){
    return "[Square " +this.length+"x"+this.width +"]"
}

var rect = new Rectangle(5,4)
var square = new Square(6)

console.log(rect.getArea())// 20
console.log(square.getArea())// 36
console.log(rect.toString())// [Rectangle 5x4]
console.log(square.toString())// [Square 6x6]
console.log(rect instanceof Rectangle)// true
console.log(rect instanceof Object)// true
console.log(square instanceof Square)// true
console.log(square instanceof Rectangle)// true
console.log(square instanceof Object)// true
console.log(Rectangle.prototype.isPrototypeOf(Square.prototype))// true

function SquareTwo(size){
    this.length = size
    this.width =  size
}

SquareTwo.prototype = Object.create(Rectangle.prototype, {
    constructor:{
        configurable:true,
        enumerable:true,
        value:SquareTwo,
        writable:true
    }
})

SquareTwo.prototype.toString = function(){
    return "[SquareTwo " +this.length+"x"+this.width +"]"
}

var squareTwo = new SquareTwo(8)
console.log(squareTwo.toString())// [Square 6x6]
console.log(squareTwo.getArea())
// In this version of the code, SquareTwo.prototype is overwritten with a
// new object that inherits from Rectangle.prototype, and the Rectangle
// constructor is never called. That means you don’t need to worry about
// causing an error by calling the constructor without arguments anymore.
// Otherwise, this code behaves exactly the same as the previous code. The
// prototype chain remains intact, so all instances of Square inherit from
// Rectangle.prototype and the constructor is restored in the same step.
// NOT E Always make sure that you overwrite the prototype before adding properties to it,
// or you will lose the added methods when the overwrite happens.


// === Constructor Stealing ===
function RectSteal(length, width){
    this.length = length
    this.width = width
}

RectSteal.prototype.getArea = function(){
    return this.length * this.width
}

RectSteal.prototype.toString = function(){
    return "[RectSteal " +this.length+"x"+this.width +"]"
}

// inherits from RectSteal
function SquareSteal(size){
    RectSteal.call(this, size, size)
    // optional: add new properties or oevrride existing ones here
}

SquareSteal.prototype = Object.create(RectSteal.prototype, {
    constructor:{
        configurable:true,
        enumerable:true,
        value:SquareSteal,
        writable:true
    }
})

SquareSteal.prototype.toString = function(){
    return "[Rectangle " + this.length + "x" + this.width + "]";
}

var sqSteal = new SquareSteal(9)
console.log(sqSteal.toString())

// Accessing Supertype Methods
// call the wupertupe method
function R(length, width) {
    this.length = length;
    this.width = width;
}
R.prototype.getArea = function() {
    return this.length * this.width;
};
R.prototype.toString = function() {
    return "[Rectangle " + this.length + "x" + this.width + "]";
};
// inherits from Rectangle
function S(size) {
    R.call(this, size, size);
}
S.prototype = Object.create(R.prototype, {
    constructor: {
        configurable: true,
        enumerable: true,
        value: Square,
        writable: true
    }
});
// call the supertype method
S.prototype.toString = function() {
    var text = R.prototype.toString.call(this);
    return text.replace("Rectangle", "Square");
};
var t = new S(5)
console.log(t.toString())

































