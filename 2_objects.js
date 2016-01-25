// Two ways to create the object
var person1 = {
    name:"Edwin"
}

var person2 = new Object()
person2.name = "edwin"

person1.age = "Redacted"
person2.age = "Redacted"

person1.name = "Greg"
person2.name = "Michael"

console.log(person1.name)
console.log(person2.name + ' ' + person2.age)

// To check the property inside of object use 'in' operator
console.log("name" in person1)//true
console.log("age" in person2)//true
console.log("title" in person1)//false

person1.sayName = function(){
    console.log(this.name)
}
console.log("sayName" in person1)// true

// to check if the property is own or borrowed
// use hasOwnProperty()
console.log("name" in person1)// true
console.log(person1.hasOwnProperty("name"))// true

console.log("toString" in person1)// true
console.log(person1.hasOwnProperty("toString"))// false

// delete operator used to delit property (key/value pair)
delete person1.name
console.log("name" in person1)// false
console.log(person1.name)// undefined

// Enumeration
var object = {
    name:"Edwin",
    lastname:"Gasparian",
    age:35,
    isworking:true
}

console.log(object)
console.log(Object.keys(object)) //["name", "lastname", "age", "isworking"]
console.log(Object.keys(object)[2]) // age

// for in loop
for(property in object){
    console.log("Name: " + property+", Value: " + object[property])
    console.log()
}

var properties = Object.keys(object)
// if you want to mimic for-in behavior
// for loop
var i, len
for(i=0, len=properties.length; i<len; i++){
    console.log("Name - "+properties[i])
    console.log("Value - " + object[properties[i]])
}
//Typically, you would use Object.keys() in
//situations where you want to operate on an array of property names and
//for-in when you don’t need an array.

// enumerable and not enumerable properties...
console.log(length in properties)// true
console.log(properties.propertyIsEnumerable("length"))// false

// TYPES OF PROPERTIES
// data properties
var obj = {
    name:"Marine",
    lastname:"Gabrielyan",
    age:30,
    isworking:true
} // name:"Marine", lastname:"Gabrielyan", age:30, isworking:true

// accessor properties
var acsProp = {
    _name:"New Name", // accessor property
    get name(){ // getter or reader
        console.log("Reading name");
        return this._name;
    }, // if no setter then property becomes read only
    set name(value) { // setter - setting new value to the name ppoperty
        console.log("Setting name to %s", value);
        this._name = value
    } // if no getter then property becomes write only
}

console.log(acsProp.name);// "Reading name" then "New Name"
acsProp.name = "Gregory";
console.log(acsProp.name);// Gregory

// === Property attributes ===
// == common Attributes: == 
//[[Enumerable]]    determines whether you can iterate over the property. 
//[[Configurable]]  determines whether the property can be changed.

var propAttr = {
    name:"David"
}

console.log(Object.keys(propAttr).length)// 1

Object.defineProperty(propAttr, "name", {
    enumerable:false
})

console.log("name" in propAttr)// true
console.log(propAttr.propertyIsEnumerable("name"))// false
console.log(Object.keys(propAttr).length)// 0

Object.defineProperty(propAttr, "name", {
    configurable: false
})

//try to delete the Property
delete propAttr.name
console.log("name" in propAttr)// true
console.log(propAttr.name)// David

Object.defineProperty(propAttr, "name", {// error!!! - Cannot redefine property: name
//    configurable:true
})

// == Data Property Attributes ==
// Data properties contain a value!!!
// [[Value]] 
// [[Writable]]
// [[Enumerable]]
// [[Configurable]]
var prop = {}

Object.defineProperty(prop, "name", {
    value:"Marine",
    enumerable:true,
    configurable:true,
    writable:true
})

Object.defineProperty(prop, "age", {
    value:"toddler"
})
console.log(prop.propertyIsEnumerable("name")) // true !!!
console.log(prop.propertyIsEnumerable("age")) // false !!!
// When you are defining a new property with Object.defineProperty(),
// It’s important to specify all of the attributes 
// Because Boolean attributes automatically default to false otherwise.
console.log("age" in prop)
delete prop.age
console.log("age" in prop)// true
prop.age = "Adult"
console.log(prop.age)// toddler
// In this code, you can’t do anything with the name property except read the value; 
// every other operation is locked down.

// == Accessor Property Attributes ==
// Accessor properties don’t contain a value
// but instead define a function to call when the property is read (called a getter), 
// and a function to call when the property is written to (called a setter). 
// Accessor properties only require either a getter or a setter, though they can have both.
// [[Get]]
// [[Set]]
// [[Enumerable]]
// [[Configurable]]

var accessor1 = {
    _name:"Accessor1",
    
    get name(){
        console.log("Reading name")
        return this._name
    },
    
    set name(value){
        cosole.log("Setting name to %s", value)
        this._name = value
    }
}
console.log(accessor1)
// OR
var accessor2 = {
    _name:"Accessor2"
}

Object.defineProperty(accessor2, "name", {
    get:function(){
        console.log("Reading name")
        return this._name
    },
    
    set: function(value){
        console.log("Setting name to %s", value)
        this._name = value
    },
    enumerable:true,
    configurable:true
})
console.log(accessor2)

// Defining multiple properties

var multProp = {}

Object.defineProperties(multProp, {
    _name:{
        value:"Edwin Gasparian",
        enumerable:true,
        configurable:true,
        writable:true
    },
    name:{
        get:function(){
            console.log("Reading name")
            return this._name
        },
        set:function(value){
            console.log("Setting name to %s", value)
            this._name = value
        },
        configurable:true,
        enumerable:true
    },
    _age:{
    value:"toddler",
    enumerable:true,
    configurable:true,
    writable:true
},
    age:{
        get:function(){
            console.log("Reading age")
            return this._age
        },
        set:function(value){
            console.log("Setting age to %s", value)
            this._age = value
        },
        configurable:true,
        enumerable:true
    }
})
console.log(multProp)

// === Retrieving Property Attributes === 

var retrProp = {
    name:"Anaida"
}

var descriptor = Object.getOwnPropertyDescriptor(retrProp, "name")
console.log(descriptor.enumerable)// true
console.log(descriptor.configurable)// true
console.log(descriptor.writable)// true
console.log(descriptor.value)// Anaida

// === Preventing Object Modification ===
// [[Extensible]]
// Object.preventExtensions() - makes object nonExtensible
// Object.isExtensible() - is checking extensibility of the object
// You Can't add any new properties to the object!!!
// But you can change the value of existing one and delete the property by itself
var checkExtens = {
    name:"Extensible"
}

console.log(Object.isExtensible(checkExtens))// true
Object.preventExtensions(checkExtens)
console.log(Object.isExtensible(checkExtens))// false
checkExtens.sayName = function(){
    console.log(this.name)
}
console.log("sayName" in checkExtens)// falsefd
checkExtens.name = "Greg"
console.log(checkExtens.name)
checkExtens.name = function(){
    console.log("you have chenged the name")
}
console.log(checkExtens.name())

// === Sealing Object === 
// Object.seal()
// [[Extensible]], [[Configurable]] are both be set to false!!!
 var sealObj = {
     name:"Developer"
 }
 console.log(Object.isExtensible(sealObj))// true
 console.log(Object.isSealed(sealObj))// false
 
 Object.seal(sealObj)
 console.log(Object.isExtensible(sealObj))// false
 console.log(Object.isSealed(sealObj))// true
 sealObj.sayName = function(){
     console.log(this.name)
 }
 console.log("sayName" in sealObj)// false
 
 sealObj.name = "Greg"
 console.log(sealObj.name)// Greg
 delete sealObj.name// will give error in strict mode
 console.log("name" in sealObj)// true
 console.log(sealObj.name)// Greg
 
 var descript = Object.getOwnPropertyDescriptor(sealObj, "name")
 console.log(descript.configurable)// false
 console.log(descript.enumerable)// true
 console.log(descript.writable)// true
 
 
 // === Freezing Objects ===
 // Object.freeze() - to freeze the Object
 // Object.isFrozen() - to check if Frozen
 var freez = {
     name: "Im Frozen"
 }
 
 console.log(Object.isExtensible(freez))// true
 console.log(Object.isSealed(freez))// false
 console.log(Object.isFrozen(freez))// false
 
 Object.freeze(freez)
 console.log(Object.isExtensible(freez))// false
 console.log(Object.isSealed(freez))// true
 console.log(Object.isFrozen(freez))// true
 
 freez.sayName = function(){
     console.log(this.name)
 }
  
 console.log("sayName" in freez)// false
 
 freez.name = "Greg"
 console.log(freez.name)// Im Frozen
 
 delete freez.name// error in strict mode
 console.log("name" in freez)// true
 console.log(freez.name)// Im frozen
 
 var descriptorForFreez = Object.getOwnPropertyDescriptor(freez, "name")
 console.log(descriptorForFreez.configurable)// false
 console.log(descriptorForFreez.writable)// false
// Frozen objects are also considered nonextensible and sealed...!!!

































