# JavaScript Function Implementation

### Out: 2/3/17 | Due: 2/10/17 (Deadline 2/11/17 11:59 PM for 10% reduction)

## Overview
For this project, you will be demonstrating your mastery of JavaScript!

## Objectives
This project will test basic functions and concepts including string manipulation,
arithmetic operations, and first-class functions.

## Grading
This project will be graded as follows:

There are 9 public tests, each worth 10 points.

## Specifications
Clone the project folder located [here]().

In `index.js`, you will have to implement the following functions.

1. `helloWorld()`

    All you have to do here is return the string "hello world". Simple.

2. `squareToString(num)`

    Given a number (integer or float), square it. Take the result, and convert it
    to a string. Return that string.
    ```
    4 -> '16'
    -2 -> '4'
    1.2 -> '1.44'
    ```

3. `reverseString(str)`

    Given a string, reverse it. Return the reversed result. You can expect that we will
    only give you strings as input.
    ```
    'hello' -> 'olleh'
    'as d' -> 'd sa'
    ```
4. `avgLenOfVals(dict)`

    Given a dictionary, return the average length of the values. If the values are not
    strings, convert them to strings and take the length of those for your computation.
    ```
    {
        'hello': 'world',
        'ishaan': 'parikh',
        'sashi': 'thupu',
        2:'hi',
        3: 51
    }

    -> 4.0
    ```
5. `applyFunToArray(str, fun)`

    Given a string with whitespace and commas, create an array of all the words.

    `'hello, world  hi, yes' -> ['hello', 'world', 'hi', 'yes']`

    Then, use the second function, and return `fun` applied to the new array.
    If we write a function that looks like
    ```
    function upperArr(arr){
        var newArr = []
        for (var i = 0; i < arr.length; i ++){
            newArr[i] = arr[i].toUpperCase();
        }
        return newArr;
    }
    ```
    and called `applyFunToArray('hello, world, hi   yes', upperArr)`, we should get
    `['HELLO', 'WORLD', 'HI', 'YES']`.

## Testing

Run `npm install mocha -g` before any testing. If you do not have node installed, please follow [this](https://gist.github.com/helloworld/11af600d6cce29fbd91f9726234b8b39).
To run public tests, navigate into the `test/` directory and run `mocha publictests.js`. To create your own tests, edit the `studenttests.js` file and run `mocha studenttests.js`.

## Submission

Upload your `index.js` file **only** to the submit server. Everything should be contained here.
