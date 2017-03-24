var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var exphbs = require('express-handlebars');
var dataUtil = require("./data-util");
var _ = require('underscore');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use('/public', express.static('public'));

/* Similar to the pokemon project, we are loading in the data to the 
 * _DATA object. Luckily, we will never actually have to save new data 
 * to a file. */
var _DATA = dataUtil.loadData().objects;

app.get('/', function(req, res) {
    /* For this endpoint, all you have to do is return the states, and
     * whatever information is necessary to link them to their own 
     * /state/:statename endpoint. */
    res.render('allstates', { error: 'unimplemented' });
})

app.get('/party/:party', function(req, res) {
    /* We suggest using underscore to get all of the representatives of a particular
     * party. You can find these under the 'party' field of each representative. */

    res.render('representatives', {
        /* Remember that you not only have to pass in each of the representatives, but
         * also an identifier so the header of the handlebars template can change */
        error: 'unimplemented'
    });
})

app.get('/state/:name', function(req, res) {
    /* Check the README to see all of the information that must come up on each page. 
     * Also, keep in mind that you cannot have something like "/state/Rhode Island" b/c
     * of the space. Make sure you find a way around this. Hint: Check out the comment in 
     * data-util.js. */

    res.render('state', {
        error: 'unimplemented'
    })
})

app.get('/rep', function(req, res) {
    /* Here, remember that you must use the representatives.handlebars template again,
     * so the amount of filtering you have to do is _quite_ small. */

    res.render('representatives', {
        error: 'unimplemented'
    })
});

app.get('/rep/:repid', function(req, res) {
    /* Check the REAMDE to see how to pick a repid. */
    res.render('person', { error: 'unimplemented' });
});

app.listen(3000, function() {
    console.log('House of Representatives listening on port 3000!');
});
