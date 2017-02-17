var http = require('http');
const PORT = 8888;

function handleReq(req, res) {
    console.log("New request at " + req.url);
    if (req.url === '/megan') {
        var megan = {
            age: 20,
            gender: 'f',
            majors: ['civil engineering']
        };
        res.end(megan);
    } else if (req.url === '/ishaan') {
        var ishaan = {
            age: 19,
            gender: 'm',
            majors: ['computer science']
        };
        res.end(ishaan);
    } else {
        res.end("Link hit: " + req.url);
    }
}

var server = http.createServer(handleReq);

server.listen(8888, function() {
    console.log("Server listening on: http://localhost:%s", PORT);
});
