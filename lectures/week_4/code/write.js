var fs = require("fs");

fs.writeFile('output.txt', 'This is so fun!', function(err) {
    if (err) {
        return console.error(err);
    }

    // Then we can read from that same file.
    fs.readFile('output.txt', function(err, data) {
        if (err) {
            return console.error(err);
        }
        console.log("Asynchronous read: " + data);
    });
});
