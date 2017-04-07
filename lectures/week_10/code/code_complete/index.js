var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var exphbs = require('express-handlebars');
var expstate = require('express-state');
var app = express();
var PORT = 3000;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use('/public', express.static('public'));
expstate.extend(app);

app.set("state namespace", 'App');

var API_KEYS = {
	"GOOGLE_API_KEY": "102938120938123", 
	"FACEBOOK_API_KEY": "12039812093",
}

app.expose(API_KEYS, "API_KEYS");

app.get("/", function(req, res) {

	var friends = ["Nelson", "Ishaah", "Matthew"];
	res.expose(friends, "friends");
    res.render("home", {
    	friend: friends
    });


});

app.listen(PORT, function() {
    console.log('Server listening on port:', PORT);
});
