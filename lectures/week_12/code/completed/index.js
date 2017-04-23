var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var mongoose = require('mongoose');
var dotenv = require('dotenv');
dotenv.load();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/public', express.static('public'));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

mongoose.connect(process.env.MONGODB);
mongoose.connection.on('error', function() {
    console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
    process.exit(1);
});

var Movie = require('./models/Movie');

var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
    res.render('chat');
});

app.get('/movies', function(req, res) {
    Movie.find({}, function(err, movies) {
        return res.render('movies', { movies: movies });
    });
});

app.post('/movies', function(req, res) {
    var genre = req.body.genre;
    var title = req.body.title;
    var movie = new Movie({
        title: title,
        genre: genre
    });
    movie.save(function(err) {
        if (err) throw err;
        io.emit('new movie', movie);
        return res.send('Done!');
    });
});

io.on('connection', function(socket) {
    socket.on('chat message', function(msg) {
        io.emit('chat message', msg);
    });
});

http.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});
