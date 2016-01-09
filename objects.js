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

for(property in object){
    console.log("Name: " + property+", Value: " + object[property])
    console.log()
}
console.log(object)
console.log(Object.keys(object))

var properties = Object.keys(object)

// if you want to mimic for-in behavior
var i, len

for(i=0, len=properties.length; i<len; i++){
    console.log("Name "+properties[i])
    console.log("Value " + object[properties[i]])
}
//Typically, you would use Object.keys() in
//situations where you want to operate on an array of property names and
//for-in when you don’t need an array.








