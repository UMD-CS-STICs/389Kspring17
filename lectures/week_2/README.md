
# Week 2: JavaScript
--------------------

## What is Javascript?

JavaScript (JS) is a lightweight, interpreted, programming language with first-class functions. It is most well-known as the scripting language for Web pages. (Mozilla Developer Network)

Please refer to the `pre_class.md` resources to provide yourself with a introduction to the language.

During class, we will go over **objects** and **function**, which are very important for Javascript and will be used extensively in our full-stack applications. Therefore, a thorough understanding of them is required.

### Working with arrays and objects

We will build an example with students/Nelson and their ages.

Arrays in JavaScript are heterogeneous. This means that they can hold data of different types. For example, `var a = [1, 'hello', function () { return 1; }]` is valid.

First, we can create an array of student names:

```javascript
var names = ["Nelson", "Rachel", "Megan"];
```

If we need to print everyone's names, we can use a for loop. We can use a standard for loop or a for-each loop.

```javascript
// Output:
// 0
// 1
// 2
for(var i in names) {
    console.log(i);
}

// Output:
// "Nelson"
// "Rachel"
// "Megan"
for(var i in names) {
    console.log(arr[i]);
}

// Output:
// "Nelson"
// "Rachel"
// "Megan"
for(var i = 0; i < names.length; i++) {
    console.log(names[i]);
}

// Exercise: Print out contents of list in reverse order.
```

Consider the function `greet(name)`

```javascript
function greet(name) {
    console.log("Hello " + name);
}

greet("Nelson"); // logs "Hello Nelson"
```

Notice how we do not have to specify the type of the parameter.

Similarly, we could have functions that do other operations on names:

```javascript
function reverser(name) {
    var arr = name.split("");
    arr = arr.reverse()
    arr= arr.join("");
    console.log(arr);
}

function printFirstLetter(name) {
    console.log(name.charAt(0));
}

reverser("Nelson"); // logs "nosleN"
printFirstLetter("Nelson"); // logs 'N'
```

We can build a function that will run one of our "name operators" on each value of an array.

First, let's write a function `applyToArray` that simply takes in one argument: `operator`.

```javascript
function reverser(name) {
    console.log(name.split("").reverse().join(""));
}

function applyToArray(operator) {
    console.log(operator);
}

// [Function: reverse]
applyToArray(reverser);

// Exercise: What would applyToArray print out if I passed in "Hello"?
```

What exactly did we do here? We passed a reference to the function `reverser` into `applyToArray`. JavaScript has **first class functions**, which means functions are treated like any other variable, and therefore can be passed around as parameters.

This means we can do almost anything with functions, such as **creating an array of functions**.

```javascript
function hi() {
    console.log("hi");
}

function bye() {
    console.log("bye");
}

function nelson() {
    console.log("nelson");
}

var funcs = [hi, bye, nelson];

// Exercise: Iterate through this array, and execute each function.
```

We don't have to declare the functions before putting them in the array. We can define them **inline anonymously**;

```javascript
var funcs = [
                function() {
                    console.log("hi");
                },
                function() {
                    console.log("bye");
                },
                function() {
                    console.log("nelson")
                }
            ];
```

Now that we know we can use functions in JavaScript, we can go back to our "name operation" example.

We can use the function `reverser` inside `applyToArray` by passing it in as an argument, and then calling it just like we would any other function:
```javascript
function reverser(name) {
    console.log(name.split("").reverse().join(""));
}

function applyToArray(operator) {
    operator("Nelson");
}

applyToArray(reverser); // Logs "nosleN"
```

Notice how `operator` inside `applyToArray` refers to `reverser`, since we passed in `reverser` to `applyToArray` as the parameter corresponding to `operator`.

This is a very powerful construct, and we will use it often throughout this course.

Next, let's add another parameter to `applyToArray` to take in an array:

```javascript
function greet(name) {
    console.log("Hello " + name);
}

function reverser(name) {
    console.log(name.split("").reverse().join(""));
}

function applyToArray(arr, operator) {
    var name = arr[0];
    operator(name);
}

var names = ["Nelson", "Rachel", "Megan"];
applyToArray(names, reverser); // Logs "nosleN"
applyToArray(names, greet); // Logs "Hello Nelson"
```

We can change the functionality of `applyToArray` just by passing in a different operator function, allowing it to be very flexible. Now, `applyToArray` can be used in a variety of situations.

Let's change `applyToArray` to actually run the `operator` over the entire array:
```javascript
function reverser(name) {
    console.log(name.split("").reverse().join(""));
}

function applyToArray(arr, operator) {
    for(var i = 0; i < arr.length; i++) {
        operator(arr[i]);
    }
}

var names = ["Nelson", "Rachel", "Megan"];
applyToArray(names, reverser);
// Output:
// nosleN
// lehcaR
// nageM
```

To see how flexible `applyToArray` is, let's use it in another example.

```javascript
var num = [1, 2, 3, 4, 5];
applyToArray(num, function(i){
    console.log(i * i);
});
// Output:
// 1
// 4
// 9
// 16
// 25
```

There is a function `forEach()` for arrays that applies an inputted function to each value in the array.

We have basically already implemented this. Try writing your own version of forEach.

```javascript
var num = [1, 2, 3, 4, 5];

num.forEach(function(val) {
    console.log(val);
})
// Output:
// 1
// 2
// 3
// 4
// 5

// Exercise:
function myForEach(arr, func){
    for (var i in arr) {
        func(arr[i]);
    }
}
```

Let's make things a little more interesting. What if I want to save information about each person's age? We can make an **object**.

Let us start by constructing an object.

```javascript
// This is our constructor.
var people = {};
```
Now, we need to insert data into the object.
```javascript
people.Nelson = 90;
people.Rachel = 18;
people.Megan = 20;

// The following also works.

people['Nelson'] = 90;
people['Rachel'] = 18;
people['Megan'] = 20;

console.log(people); // logs: { Nelson: 90, Rachel: 18, Megan: 20 }
```

Similarly, we could have created the object like this.
```javascript
// Just like a hash with key/value pairs.
var people = {
    Nelson: 90,
    Rachel: 18,
    Megan: 20
};
```
Objects can also be nested within one another. Let's take a look in this context.
```javascript
var people = {
    Nelson: {
        age: 90,
        gender: 'male'
    },
    Rachel: {
        age: 18,
        gender: 'female'
    },
    Megan: {
        age: 20,
        gender: 'female'
    }
};

// You can access the interior elements with two ways.
console.log(people['Nelson']); // logs: { age: 90, gender: 'male' }
console.log(people.Nelson); // logs: { age: 90, gender: 'male' }
```

If we want to iterate across all the keys, we can do something similar to what we did in arrays.

```javascript
// Output:
// Nelson
// Rachel
// Megan
for (var name in people) {
    console.log(name);
}
```

Now, we will print out all of the ages of everyone we have saved.
```javascript
// Output:
// Nelson's age is 90.
// Rachel's age is 18.
// Megan's age is 20.
for (var name in people) {
    console.log(`${name}'s age is ${people[name].age}.`);
}

// Exercise: Why would doing people.name.age not work?
```

The objects can have values that are functions.
```javascript
people.Nelson.getAgeSquared = function () {
    return people.Nelson.age * people.Nelson.age;
}

console.log(people.Nelson.getAgeSquared());
// logs: 8100

people.Nelson.age = 12;

console.log(people.Nelson.getAgeSquared());
// logs: 144

// Exercise: What would happen if I ran 'people.Nelson.getAgeSquared = 2' followed by 'people.Nelson.getAgeSquared()'?

// Could have also done:
// getAgeSquared: function() { return people.Nelson.age * people.Nelson.age }
// Exercise: this?
```

Below are two final (difficult!) exercises to solidify your understanding.

```javascript
/*
 * 1. Create a function "add" that would be able to execute "add(2)(4) --> 6".
 * Notice how the arguments are separated by parentheses.
 */
 function add(num){
     return function(next){
         return next + num;
     }
 }

/*
 * 2. Create a function add that would successfully be able to execute
 * add(2)(5)(); --> 7
 * add(2)(4)(2)(); --> 8
 * There could be >= 2 numbers in parentheses, and there will always be an empty
 * () at the end.
 */
 function add(num){
     if (num == undefined) return;
     return function(y){
         if (y == undefined) return num;
         return add(y + num);
    }
 }
 ```
