# `this` keyword + other things

What does `this` represent?
**where** the function was **invoked** (not where it was defined)

invoked = calling or excecuting a function

## How to determine what `this` is representing

### 1. Implicit binding (the most common)

Whatever is to the left of the dot when the function is invoked

Example:
You have an object `me` that looks like like this:

```JS
    var me = {
        name: 'cristina',
        age: 28,
        sayName: function() {console.log(`Hello, my name is ${this.name}`)}
    }
```

then you invoke the `sayName` function with: `me.SayName`
in this instance, `this` in the `console.log` would be the `me` object. so it will return: `me.name` or `cristina`
The console log would print: "Hello, my name is cristina"

### 2. Explicit Binding - call, apply, bind

The argument being invoked with the call, apply or bind methods

functions have a `.call()` method that allows you to call a function in the context of something else

Example:
You've declared a function called `sayName` that prints somethings `name` property in the console. Then you have a `user` object with a name and age that you call the sayName function with:

```JS
var sayName = function() {
    console.log(`Hello, my name is ${this.name}`)
}

var user = {
    name: 'kevin',
    age: 32
}

sayName.call(user);
// `this` = user.name or 'kevin'
// Hello, my name is kevin
```

In this instance, `this` is the `user` object.

**Note:** .call() can also take arguments from the sayName function one by one
Example:

```JS
var sayName = function(l1, l2) {
    console.log(`Hello, my name is ${this.name} and i know ${l1}, and ${l2}`)
}

var langs = ['JS', 'Ruby']

sayName.call(user, langs[0], langs[1]);
// 'Hello, my name is kevin and i know JS, and Ruby'
```

It can be annoying to list out these arguments one by one, so instead, you could use the `.apply()` method. It's the same as `.call()` but you don't have to list the arguments out one by one. Just pass it an array.

In the context of `apply`, let's say we have the same `sayName` function and the same `user` object. Now we also have an array:

```JS
sayName.apply(user, langs);
// first argument represents `this`, second argument is the array to loop through
//  'Hello. my name is kevin and i know JS, and Ruby'
```

Let's say you need to return a function to invoke at a later time. You can use the `.bind()` method. It's the same as `.call()` but instead of immediately invoking the function, it returns a new function that you can use later!

Same function and array as above and using the .bind method instead:

```JS
var langGreetFn = sayName.bind(user, lang[0], lang[1])
// returns a `langGreetFn` that can me used later

langGreetFn() // prints 'Hello, my name is kevin and i know JS, and Ruby'
```

For all of these methods, `this` will be the first argument

### 3. new Binding

whenever you invoke a function with the `new` keyword, JS creates a brand new object for you and call it `this`. with the `new` binding, the `this` keywrod is the new object you've made

Example:

```JS
var Animal = function (color, name, type) { // when a var is capitalized, it denots that it will be a "constructor" function aka, its gonna create a new thing
    // this = will be bound to the new object that's being constructed
    this.color = color;
    this.name = name;
    this.type = type;
}

var zebra = new Animal('black and white', 'zebra', 'mammal')
```

### 4. window binding - the "catch all" case

If there's nothing to the left of the dot, no new keyword, or no call/bind/apply method being used, then its likely using `window`

It's definite not the ideal method, but you might see it.

Example:

```JS
function sayAge () {
    console.log(`My age is ${this.age}`)
}
const user = {
    name: 'cristina',
    age: 28
}

user.sayAge() // My age is 28

sayAge() // My age is undefined
// JS is defaulting to the `window` object
```

if you were to assign an `age` property to the `window` object like so: `window.age = 27`

then you would get 'My age is 27'.

Since it's not ideal, you can enable strict mode with 'use strict' and it will keep it as undefined which is better than setting it to the window

**Note:** there's also lexical bind within arrow functions, but we didn't review this
