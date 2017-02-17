var fs = require("fs");

// Asynchronous read
fs.readFile('input.txt', function(err, data) {
    if (err) {
        return console.error(err);
    }
    console.log("1. Asynchronous read: " + data);
});

// Synchronous read
var data = fs.readFileSync('input.txt');
console.log("2. Synchronous read: " + data);

console.log("3. Program Ended");
