var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var dataUtil = require("./data-util");
var _ = require("underscore");
var logger = require('morgan');
var exphbs = require('express-handlebars');
var app = express();
var PORT = 3000;

var _DATA = dataUtil.loadData().blog_posts;

/// MIDDLEWARE 
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use('/public', express.static('public'));

app.get("/", function(req, res) {
    res.render("UNIMPLEMENTED");
});

app.get("/create", function(req, res) {
    res.send("UNIMPLEMENTED");
});

app.get('/post/:slug', function(req, res) {
    res.send("UNIMPLEMENTED");
});

app.get('/tag/:tag', function(req, res) {
    res.send("UNIMPLEMENTED");
});

// Start listening on port PORT
app.listen(PORT, function() {
    console.log('Server listening on port:', PORT);
});
