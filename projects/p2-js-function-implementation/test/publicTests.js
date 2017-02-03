var assert = require('assert');

/* FUNCTIONS */
var functions = require('../index.js');

var helloWorld = functions.helloWorld;
var squareToString = functions.squareToString;
var reverseString = functions.reverseString;
var avgLenOfVals = functions.avgLenOfVals;
var applyFunToArray = functions.applyFunToArray


/*TESTS*/
describe('helloWorld', function() {
    it('should just return hello world', function() {
      assert.equal("hello world", helloWorld());
    });
});

describe('squareToString', function() {
    it('testing basic case 1', function() {
      assert.equal("25", squareToString(5));
    });
    it('testing basic case 2', function() {
      assert.equal("4", squareToString(-2));
    });
});

describe('reverseString', function() {
    it('testing basic case 1', function() {
      assert.equal(" ", reverseString(" "));
    });
    it('testing basic case 2', function() {
      assert.equal("ab ", reverseString(" ba"));
    });
});

describe('avgLenOfVals', function() {
    it('testing basic case 1', function() {
        var dict = {
            'hello': 'world',
            'ishaan': 'parikh',
            'sashi': 'thupu',
            2:'hi',
            3: 51
        };
        assert.equal(4.0, avgLenOfVals(dict));
    });
    it('testing basic case 2', function() {
        var dict = {};
        assert.equal(0.0, avgLenOfVals(dict));
    });
});

function upperArr(arr){
    var newArr = []
    for (var i = 0; i < arr.length; i ++){
        newArr[i] = arr[i].toUpperCase();
    }
    return newArr;
}

function lowerArr(arr){
    var newArr = []
    for (var i = 0; i < arr.length; i ++){
        newArr[i] = arr[i].toLowerCase();
    }
    return newArr;
}

describe('applyFunToArray', function() {
    var str = 'hEllo,    woRld';
    it('testing upper case func', function() {
        assert.deepEqual(['HELLO','WORLD'], applyFunToArray(str, upperArr));
    });
    it('testing lower case func', function() {
        assert.deepEqual(['hello','world'], applyFunToArray(str, lowerArr));
    });
});
