var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var logger = require('morgan');
var operations = require("./operations");

var exphbs = require('express-handlebars');

var contacts = {}

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');


app.get('/', function(req, res) {
    res.render('first');
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

var past = [];

app.get("/operation/:op", function(req, res) {
    var op = req.params.op;
    var number = req.query.number;
    var error = false;

    if (!operations[op] || !number) {
        error = true;
    }

    number = parseInt(number);

    if (error) {
        past.push("BAD INPUT");
    } else {
        past.push(op + " on " + number + ": " + operations[op](number));
    }

    res.render('operation', {
        oper: op,
        inp: number,
        result: error ? null : operations[op](number),
        error: error,
        past: past
    })
})

app.get("/contacts", function(req, res) {
    res.json(contacts);
});

app.post("/newcontact", function(req, res) {
    if (!req.body) {
        return res.send("No data recieved");
    }
    for (var contact in req.body) {
        contacts[contact] = req.body[contact];
    }
    res.send("success");
});


app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
})
