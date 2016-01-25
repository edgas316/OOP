// Scope-Safe Constructors
function Person(name){
    this.name = name
}

Person.prototype.sayName = function(){
    console.log(this.name)
}

var person1 = Person("Edwin")// without "new"
console.log(person1 instanceof Person)// false
console.log(typeof person1)// undefined
console.log(name)// Edwin // is gloval variable...

// ==========================================================
// A Scope-Safe version of Person looks like this:
function PersonSafe(name){
    if(this instanceof PersonSafe){
        this.name = name
    }else{
        return new PersonSafe(name)
    }
}

PersonSafe.prototype.sayName = function(){
    console.log(this.name)
}

var person2 = new PersonSafe("Edwin")
var person3 = PersonSafe("David")
console.log(person2 instanceof PersonSafe)// true
console.log(person3 instanceof PersonSafe)// true
// ==========================================================