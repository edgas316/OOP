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
        console.log(this.name)
    }
}

var person1 = new Person("Edwin")
var person2 = new Person("Greg")
console.log(person1.name)// Edwin
console.log(person2.name)// Greg

person1.sayName()// Edwin
person2.sayName()// Greg

