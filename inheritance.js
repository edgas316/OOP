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
MyConstructor1.prototype = Object.create(Object.prototype, {
    constructor:{
        configurable:true,
        enumerable:true,
        value:MyConstructor1,
        writable:true
    }
})
// YourConstructor is a subtype of Object, 
// and Object is a supertype of MyConstructor.

