// Mixins
// Mixins occur when one object acquires the properties of another without modifying
// the prototype chain. The first object (a receiver) actually receives the 
// properties of the second object (the supplier) by copying those properties directly.
//function mixin(receiver, supplier){
//    for(var property in supplier){
//        if(supplier.hasOwnProperty(property)){
//            receiver[property] = supplier[property]
//        }
//    }
//    return receiver
//}

function EventTarget(){}

EventTarget.prototype = {
    constructor:EventTarget,
    addListener:function(type, listener){ 
        if(!this.hasOwnProperty("_listeners")){ 
            this._listeners = []
        }
        if(typeof this._listeners[type] == "undefined"){ 
            this._listeners[type] = []
        }
        this._listeners[type].push(listener)
    },
    fire:function(event){
        if(!event.target){
            event.target = this
            console.log(event.target)
        }
        if(!event.type){// falsy
            throw new Error("Event object missing 'type' property")
        }
        if(this._listeners && this._listeners[event.type] instanceof Array){
            var listeners = this._listeners[event.type]
            for (var i=0, len=listeners.length; i<len; i++){
                listeners[i].call(this, event)
            }
        }
    },
    removeListener:function(type, listener){
        if(this._listeners && this._listeners[type] instanceof Array){
            var listeners = this._listeners[type]
            for(var i=0, len=listeners.length; i<len; i++){
                if(listeners[i] === lestener){
                    listeners.splice(i, 1)
                    break
                }
            }
        }
    }
}

//var target = new EventTarget()
//target.addListener("message", function(event){
//    console.log("Message is " + event.data)
//})
//
//target.fire({
//    type:"message",
//    data:"Hello World"
//})
//// ==================================
//var personTarget = new EventTarget()
//personTarget.name = "Edwin"
//personTarget.sayName = function(){
//    console.log(this.name)
//    this.fire({
//        type:"namesaid", 
//        name:name})
//}
//personTarget.sayName()// Edwin
////===================================
//// But there is more organized way to do this...
//
//// Psoudoclassical inheritance
//function Person(name){
//    this.name
//}

//Person.prototype = Object.create(EventTarget.prototype)
//Person.prototype.constructor = Person
//
//Person.prototype.sayName = function(){
//    console.log(this.name)
//    this.fire({type:"namesaid", name:name})
//}
//var personOrg = new Person("David")
//console.log(personOrg instanceof Person)// true
//console.log(personOrg instanceof EventTarget)// true
// it si better to use mixin instead
//mixin(Person.prototype, new EventTarget())
//mixin(Person.prototype, {
//    constructor:Person,
//    sayName:function(){
//        console.log(this.name)
//        this.fire({type:"namesaid", name:name})
//    }
//})
//var personMix = new Person("David")
//console.log(personMix instanceof Person)// true
//console.log(personMix instanceof EventTarget)// false
//console.log(personMix.sayName())

// ========================================================== \\
// ========================================================== \\
function mixin(receiver, supplier){
    if(Object.getOwnPropertyDescriptor){
        Object.keys(supplier).forEach(function(property){
            var descriptor = Object.getOwnPropertyDescriptor(supplier, property)
            Object.defineProperty(receiver, property, descriptor)
        })
    }else{
        for(var property in supplier){
            if(supplier.hasOwnProperty(property)){
                receiver[property] = supplier[property]
            }
        }
    }
    return receiver
}
//Here, mixin() checks whether Object.getOwnPropertyDescriptor() u exists
//to determine whether the JavaScript engine supports ECMAScript
//If so, it goes on to use the ECMAScript 5 version. Otherwise, the ECMAScript
//version is used. This function is safe to use in both modern and legacy
//JavaScript engines, as they will apply the most appropriate mixin strategy.
// ========================================================== \\
// ========================================================== \\
var person = mixin(new EventTarget(), {
    get name(){
        return "Edwin"
    },
    sayName:function(){
        console.log(this.name)
        this.fire({type:"namesaid", name:name})
    }
})
console.log(person.name)// Edwin
person.name = "Greg"
console.log(person.name)// Edwin
console.log(person.sayName())














































