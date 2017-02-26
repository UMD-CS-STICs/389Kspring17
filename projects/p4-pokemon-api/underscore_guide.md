
# Underscore Guide

**What is underscore.js?**

From the official website:

>Underscore is a JavaScript library that provides a whole mess of useful functional programming helpers without extending any built-in objects

>Underscore provides over 100 functions that support both your favorite workaday functional helpers: map, filter, invoke — as well as more specialized goodies: function binding, javascript templating, creating quick indexes, deep equality testing, and so on.

Basically, underscore is a very helpful library that makes working with objects and arrays much easier. It'll be very useful for the project, so this guide is worth a read.

Keep in mind this project is completely doable (and perhaps easier) without using underscore. Learning underscore this time around, however, will make your life easier in the future outside this class, as well as make your code for this project a lot more clear and concise. 

**Installation**

To begin, we require underscore.js from npm using `npm install underscore --save`, and requiring it in our project like so: 

```js
var _ = require("underscore");
```

*Huh? We're calling our variable name literally an underscore?*

This might look a little weird at first, but this is just like jQuery. 

Recall how we did things like:

```js
$(".class");
```

In this case, the function name was literally `$`, and we were passing it the string parameter ".class". Since it's not a word, it looks special, but it's exactly the same as if the function name was `jQuery` and looked like this: 

```js
jQuery(".class");
```

Underscore works the same way, except in this case underscore is an object and it's named `_`.

**Overview**

Underscore has several useful methods for working with objects and arrays. The documentation is a very clear and useful resource for learning the library, and can be found here: http://underscorejs.org/

The  methods that'll be useful in this project is: `findWhere`

Say you have an array like this: 

```js
var people = [{
    name: "Sashank", age: 17, 
}, {
    name: "Ishaan", age: 20,
}, {
    name: "Nelson", age: 17,
}]
```

If we want to just have the object in the array that have `age = 20`, then we can call `where` on the array like so: 

```js
var minors = _.where(list, {age: 17});
```

And `minors` would only have the objects with names "Sashank" and "Nelson" like this: 

```js
minors:
[{
    name: "Sashank", age: 17, 
}, {
    name: "Nelson", age: 17,
}]
```

`findWhere` is the exact same thing, but it only returns **ONE** object (instead of an array) that matches what you give it. In this case, only "Sashank" object would be returned.

Some other functions that will be useful are:

`each`, `filter`, and `map`.
