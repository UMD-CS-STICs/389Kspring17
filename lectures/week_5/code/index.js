var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var operations = require("./operations");

var contacts = {}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res) {
    res.send('Hello World!');
})

app.get('/factorial', function(req, res) {
    var number = req.query.number;
    if (!number) { res.send("Please send a number"); }

    number = parseInt(number);
    res.send(operations.factorial(number) + "");
})

app.get('/square', function(req, res) {
    if (!number) { res.send("Please send a number"); }

    number = parseInt(number);
    res.send(operations.square(number) + "");
})

app.get('/sqroot', function(req, res) {
    var number = req.query.number;
    if (!number) { res.send("Please send a number"); }

    number = parseInt(number);
    res.send(operations.sqroot(number) + "");
})

app.get("/operation/:op", function(req, res) {
    var op = req.params.op;
    var number = req.query.number;

    if (!operations[op]) {
        return res.send("Not a valid operation");
    }
    if (!number) {
        return res.send("Please send a number");
    }

    number = parseInt(number);
    res.send(operations[op](number) + "");
})

app.get("/contacts", function(req, res) {
	res.json(contacts);
});

app.post("/newcontact", function(req, res) {
	if(!req.body) { return res.send("No data recieved"); }
	for(var contact in req.body) {
		contacts[contact] = req.body[contact];
	}
	res.send("success");
});


app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
})
