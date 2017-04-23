# Week 12: Web Sockets

### What is a web socket?

"WebSocket is a computer communications protocol, providing full-duplex communication channels over a single (connection)." - [Wikipedia](https://en.wikipedia.org/wiki/WebSocket)

Full-duplex "refers to the trasmission of data in two directions simultaneously". - [Source](http://www.webopedia.com/TERM/F/full_duplex.html)

In other words, it allows for open communication between a client and server in **real-time**.

### Why would we want to use them?

It allows for open communication between a client and server in **real-time**.

Think about anything that needs to updated live. Chat? Fantasy football? A lot of applications.

A lot of hackathon applications, too :)

We are going to create two projects.

1. Chatroom: This is a simple chatroom that will live update everyone who is connected to it.
2. Movie Viewer: This is a website that will allow users to post movies to it, but will live update the list of all movies for all users.

### Chatroom Shell

Copy down the contents of the [shell]() to your local machine. Run `npm install` and then take a look at the files inside.

#### `index.js`

We have created a base Express application that should look really familiar. We set up express, body-parser, handlebars, and our database. In addition, we render the `chat.handlebars` file at `/`.

#### `/public`

We grabbed a css file from [here](https://socket.io/get-started/chat/) for this tutorial. This file is `/public/css/main.css`.

#### `/views`

In `main.handlebars`, notice the following lines:

```html
<script src="/socket.io/socket.io.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.0/jquery.min.js"></script>
<script>
</script>
```

The first `<script/>` tag gets the JavaScript file from the `node_modules` folder that allows us to interact with sockets on the client. The next tag allows us to use jQuery. The third tag is empty.

In `chat.handlebars`, we have the following code.

```html
<ul id="messages"></ul>
<form id="box" action="">
    <input id="m" autocomplete="off" /><button>Send</button>
</form>
```

Essentially, we are going to populate the messages in an unordered list. We are creating a form (for a user to enter text) with the `id="m"`. 

#### `.env`

Create a `.env` and make the `MONGODB` value your mlab.com credentials.

### Creating a Chat Application

First, let's install [socket.io](https://socket.io/). Run the following command.

```bash
> npm install socket.io --save
```

We must now require two modules `http` and `socket.io`. Add the following lines to your code.

```js
var http = require('http').Server(app);
var io = require('socket.io')(http);
```

and then change

```js
app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});
```

to

```js
http.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});
```

We are creating a server with `http` instead of just using the Express `app`. When we just used `app.listen()`, we get an HTTP server instance, and it is difficult to reuse for anything other than the functions we have defined it to handle. Instead of making Express make our HTTP server, we will make it for ourselves so we can do more than just route. Now, we can also use web sockets.

```js
var http = require('http').Server(app);
```

This creates a server that has a function handler `app`. This is good, as we use `app` to route all of the URLs.

```js
var io = require('socket.io')(http);
```

We use this so socket.io connects itself with the web server. We could not have done this with just `app`.

Now, we need to be able to know when someone is connected to our server. Add the following lines of code to `index.js`.

```js
io.on('connection', function(socket) {
    console.log('NEW connection.');
});
```

This is an [event listener](http://www.computerhope.com/jargon/e/event-listener.htm). Specifically, we are listening for the `connection` event that happens (you guessed it) when someone connects to our server. How do we know this? [DOCS](https://socket.io/docs).

If we want to know when people disconnect as well, then we can add the following event listener inside of the original listener.

```js
io.on('connection', function(socket) {
    console.log('NEW connection.');
    socket.on('disconnect', function(){
        console.log('Oops. A user disconnected.');
  });
});

```

Try opening and closing `localhost:3000` multiple times and check out your console. Nothing happens. This is because even though our client is connecting to the server, the client is not opening its end of the web socket. We can change this by adding the following line to `main.handlebars` JavaScript section.

```js
var socket = io();
```

It knows that `io()` is a function because we use socket.io's provided JavaScript file (`<script src="/socket.io/socket.io.js"></script>
`).

Next, we need to make it so our chat service _does something_ when we hit the button. Let us go to `main.handlebars`. In the third `<script/>` tag, add the following lines.

```js
var socket = io();
$('#box').submit(function(){
    /* Do socket stuff */
    $('#m').val('');
    return false;
});
```

We are making an event listener on the button using jQuery. We are resetting the input bar to be the empty string, and returning false so nothing else happens (aka the page does not reload or change). We do not want to page to reload because we are making a chat service. Not email. 

We need to send the message through the socket. Let us insert this code where `/* Do socket stuff */` is.

```js
socket.emit('chat message', $('#m').val());
```

This is **emitting** an event called `chat message` that has `$('#m').val()` as its value. In other words, we are emitting an event called `chat message` that has the chat message. 

Now, we must catch this in the server! We can insert the following code in the initial connection listener.

```js
socket.on('chat message', function(msg) {
    console.log('msg');
});
```

Go ahead and start your server. See what happens!

Keep in mind this `socket` is tied to a specific client. So now, we have found a way to send a message back to our server, but we still have not sent this message to everyone else in the chatroom.

Change your function to the following.

```js
socket.on('chat message', function(msg) {
    io.emit('chat message', msg);
});
```

Now, our server is emitting a signal called `chat message` with the same message to **ALL CONNECTED SOCKETS**. Cool. 

Let's go pick it up in the client-side. Underneath the event listener, add the following code.

```js
socket.on('chat message', function(msg){
    $('#messages').append($('<li>').text(msg));
});
```

This means that when the socket has a message called `chat message`, we append the content to our `<ul>` from `chat.handlebars`.

Let us go over the entire process again.

1. User hits send and the message is emitted from the client. The text box is made into the empty string.
2. The server gets the message from the specific socket, and the server emits the signal to **all** sockets. 
3. The socket gets the message from the server, and we add it to the html.

Thanks to this [tutorial](https://socket.io/get-started/chat/) for literally all of this.

### Movie Shell

Before we get started here, go ahead and comment out the following line from your `main.handlebars` file.

```html
<!-- <link rel="stylesheet" type="text/css" href="/public/css/main.css"> -->
```

#### `/models`

We only have a modified `Movie.js` file. Movies only have a title and a genre. 

#### `movies.handlebars`

This has a form that has a text box for the title and genre. Underneath this is the `<ul/>` where we are going to live update movies.

### Movie Live Updates

We need to add two endpoints to our file.

```js
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
```

Currently, this should look pretty familiar. The first endpoint renders the `movies.handlebars` while passing in all movies in the database. The second creates the movie, and saves it to the database. 

We need to modify `main.handlebars`. Specifically, we need to make it so when the movies submit button is hit, it submits a post request to our server, clears the input boxes, and does not refresh the page.

```js
$('#movies').submit(function(){
        var genre = $('#genre').val();
        var title = $('#title').val();
        $('#genre').val('');
        $('#title').val('');
        $.ajax({
            type: "POST",
            url: '/movies',
            data: { 
                        title: title,
                        genre: genre 
                    },
            success: function(data, status){
                console.log(data);              
            }
        }); 
        return false;
    });
```

Now, let us examine the `POST /movies` endpoint in the server. After we save the movie, we need to let all of our clients know with `io.emit()`. So, add the following line inside of the `movie.save()` callback.

```js
io.emit('new movie', movie);
```

Now, all clients will get the message `new movie`. Let us go back to `main.handlebars` to add that event listener.

```js
socket.on('new movie', function(mov){
    $('#movList').append($('<li>').text(mov.title + ': ' + mov.genre));
});
```

And that's it.
