var name = "Edwin Gasparian"
console.log(name.toLowerCase())
console.log(name.charAt(0))
console.log(name.substring(0, 8))

var count = 10
console.log(count.toFixed(2))
console.log(count.toString(16))

var flag = true
console.log(flag)
console.log(flag.toString())
//===================================
var object1 = new Object()
console.log(object1)
var object2 = object1
console.log(object2)
object1 = null // dereferencing the object
console.log(object1 + " " + object2)
object1 = object2
console.log(object1 + " " + object2)
object2.mycustomPropertiy = "Awesome"
console.log(object1.mycustomPropertiy)

console.log(new Array())
console.log(new Date())
console.log(new Error("something went wrong"))
console.log(new Function("console.log('Hi')"))
console.log(new Object())
console.log(new RegExp("\\d+"))

// Object literals
var book = {
    name:"Javascript your best friend",
    year:2014 
}
console.log(book)
//or
var book1 = {
    "name":"javascript definitive guide",
    "year":2014
}
console.log(book1)
//or
var book2 = new Object()
book2.name = "The principles of OOP in Javascript"
book2.year = 2014
console.log(book2)

//array literals
var color = ["red", "blue", "yellow", "black"]
console.log(color[0])
//or
var color2 = new Array("red", "blue", "yellow", "black")
console.log(color2[2])
console.log(typeof color2)// object
console.log(color2 instanceof Array) // true

//RegExp literal
var numbers = /\d+/g;
//or
var numbers2 = new RegExp("\\d+", "g")

//property access
var array = []
array.push(1234)
console.log(array)
console.log(array instanceof Array)
//or
var array1 = []
array1["push"](2345)
console.log(array1)
//or
var array2 = []
var method = "push"
array2[method](9876)
console.log(array2)

//identifying arrays
var items = []
console.log(items instanceof Array)
console.log(Array.isArray(items))

//primitive wrapper types (String, Number, and Boolean)
var firstName = "Edwin"
var firstChar = firstName.charAt(0)
console.log(firstChar) // E
// what the JavaScript engine does (autoboxing)
var firstName = "Edwin"
var temp = new String(firstName)
var firstChar = temp.charAt(0)
temp = null
console.log(firstChar)// E
console.log(firstName instanceof Array)// false
var figure = 10
var boolean = true
console.log(figure instanceof Number)// false
console.log(boolean instanceof Boolean)// false

var found = new Boolean(false);
if (found) {
console.log("Found"); // this executes
}

var found2 = false;
if (found2) {
console.log("Found"); // this doesn't execute
}else{
    console.log("False") // this executes because found2 == false
}

// FUNCTIONS
// Declarations vs. Expression

// Declaration
function add(num1, num2){
    return num1+num2
}

// Expression 
var add1 = function(num1,num2){
    return num1+num2
}

// Declaration is hoisted on top of the context
var result = func(4,5)
function func(num1, num2){
    console.log(num1+num2)
}// result is 9

//but it will give error if we use expresstion after it's been used

//var result2 = func2(4, 8)
var func2 = function(num1, num2){
    console.log(num1+num2)
}// Uncaught TypeError: func2 is not a function

// Sort with comparison function
var number = [ 1, 5, 8, 4, 7, 10, 2, 6 ];
number.sort(function(a, b) {
    return a - b;
});
console.log(number)// "[1, 2, 4, 5, 6, 7, 8, 10]"
number.sort(function(a,b){
    return b-a
})
console.log(number)//[10, 8, 7, 6, 5, 4, 2, 1]

// Sort without comparison
// it converts numbers into strings and sorts them as strings!!!
var number2 = [ 1, 5, 8, 4, 7, 10, 2, 6 ];
number2.sort()
console.log(number2)//[1, 10, 2, 4, 5, 6, 7, 8]

// Parameters
var reflectArguments = function(){
    return arguments
}
console.log(reflectArguments("hello Argument", 12, 54,83))
console.log(reflectArguments.length)
//or
function reflect(value){
    return value
}
console.log(reflect("Hi there"))
console.log(reflect.length)
console.log(reflect("Hi", 25,"by", 23,65,98))
//this aproach (passing the agrument to the function) is more useful 

//unless the quantity of argumets to be used are unknown
function sum(){
   var result = 0
   var i = 0
   
   while(i<arguments.length){
       result+=arguments[i]
       i++
   }
    return result
}
console.log(sum(4,5,7,2,6,8,94,34))

// Overloading

function sayMessage(message){
    console.log(message)
}

function sayMessage(){
    console.log("Hi There")
}
sayMessage("Hello")// Hi There

// But we can do this

function sayHi(message){
    if(!message || message == undefined){
        message = "Hello World"
    }
    //or
//    if(parametes.length === 0){
//        message = "Hello World"
//    }
    console.log(message)
}
sayHi("Tis is my message")// This is my message
sayHi()// Hello World

// Object Methods

var person = {
    name: "Edwin Gasparian",
    sayName: function(){
        console.log(person.name)
    }
}
person.sayName()
console.log(person.name + " is your name")

//===this=== Object
function sayNameForAll(){
    console.log(this.name)
}
var person1 = {
    name: "Edwin",
    sayName:sayNameForAll
}
var person2 = {
    name:"Marine",
    sayName:sayNameForAll
}
var name = "David Gasparian"
person1.sayName() // Edwin
person2.sayName() // Marine
sayNameForAll() // David Gasparian

// Changing ===this===
function sayNameForAll2(label){
    console.log(label + ":" + this.name)
}
var pers1 = {
    name:'Greg'
}
var pers2 = {
    name:'Marlen'
}
// The call() method
// If you just have individual variables, use call()
sayNameForAll2.call(this, "global call() method") // global:David Gasparian
sayNameForAll2.call(pers1, "pers1 call() method") // pers1:Greg
sayNameForAll2.call(pers2, "pers2 call() method")// pers2:Marlen

// The apply() method
// If you already have an array of data, use apply()
sayNameForAll2.apply(this, ["Global apply() method"])
sayNameForAll2.apply(pers1, ["pers1 apply() method"])
sayNameForAll2.apply(pers2, ["pers2 apply() method"])
//The method you use typically depends on the type of data you have. 
// If you already have an array of data, use apply() 
// If you just have individual variables, use call()

// The bind() method
// Way 1
// No parameters are bound for sayNameForPers1(), so you still need
// to pass in the label for the output.
var sayNameForPers1 = sayNameForAll2.bind(pers1)
sayNameForPers1("pers1 bind() method way 1")    // pers1 bind() method way 1:Greg

// Way 2
// The function sayNameForPers2() not only binds this to pers2 
// but also binds the first parameter as "pers2"
// That means you can call sayNameForPers2()
// without passing in any additional arguments.
var sayNameForPers2 = sayNameForAll2.bind(pers2, "pers2 bind() method way 2")
sayNameForPers2()                               // pers2 bind() method way 2:Marlen

// attaching a method to an object doesn't change 'this'
pers2.sayName = sayNameForPers1
pers2.sayName("pers2 with added method from pers1")        // pers2 with added method from pers1:Greg
pers2.sayName()                                 // undefined:Greg

pers2.sayName = sayNameForPers2
pers2.sayName()                                 //pers2 bind() method way 2:Marlen
pers2.sayName("pers2 with added method")        //pers2 bind() method way 2:Marlen

























