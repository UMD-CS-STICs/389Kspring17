
# Week 4: Node.js


### What is Node.js?

"Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient. Node.js package ecosystem, [npm](https://www.npmjs.com/), is the largest ecosystem of open source libraries in the world." - [Node.js Website](https://nodejs.org/en/)

**Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine.**

Essentially, this means that Node.js takes JavaScript out of the browser, and isolates it on someone's computer. This expands JavaScript's applications from just browser programming to being just like any languages. You can do things like read from and write to a file system or start a server. 

**Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient.**

Node.js does not wait for your code. It can set off one code block, not wait for it to finish, and continue executing other code. This makes it really fast and super convenient for web applications.

**Node.js package ecosystem, [npm](https://www.npmjs.com/), is the largest ecosystem of open source libraries in the world.**

Other developers have made libaries that Node.js can take advantage of. This is probably the most important part of Node.js.

### Make sure you have Node.js installed

Please run the following command line in your terminal.

```shell
> node --version
```

You should see something like this printed out:
```
v7.2.0
```

If you have not installed node, please check out the tutorial [here](https://gist.github.com/helloworld/11af600d6cce29fbd91f9726234b8b39).

Create a file called `index.js` and put a simple:
```javascript
console.log('Hello world');
```

Navigate to the location of the file with your terminal, and then run:
```shell
> node index.js
```

You should see the following printed out:
```
Hello world
```

### Reading/Writing Files
Learning how to read from and write to files is an important concept in application development. It allows you to obtain, analyze, and create data. Let's start by **requiring** the file system module that Node.js has built in. Create a file `index.js` and put the following line at the top.

```javascript
var fs = require("fs");
```

The fs module documentation can be found [here](https://nodejs.org/api/fs.html). We are going to be using it to read from the file `input.txt`. Our require statement makes the entire filesystem library available to us.

We are going to put in two code blocks:

```javascript
// Asynchronous read
fs.readFile('input.txt', function (err, data) {
    if (err) {
        return console.error(err);
    }
   console.log("1. Asynchronous read: " + data);
});

// Synchronous read
var data = fs.readFileSync('input.txt');
console.log("2. Synchronous read: " + data);

console.log("3. Program Ended");
```

Go ahead and run:

```bash
> node index.js
```

We get the following output:

```
2. Synchronous read: I love this class it is so much fun!!!
We should have student-taught courses formalized at UMD.
3. Program Ended
1. Asynchronous read: I love this class it is so much fun!!!
We should have student-taught courses formalized at UMD.
```

Notice how the synchronous read finishes before the asynchronous read even though the asynchronous read happens earlier in the code. This shows that for this instance:

1. The code did not wait (non-blocking) for the asynchronous code to finish -> everything happened __asynchronously__. 
2. The synchronous function (in this case) is faster than the asynchronous function. We know this because the synchronous code printed out first.

We can also write to files!

Replace the reading functions with the following:

```javascript
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
```

If we modify `output.txt` to be 

```
THIS IS TEXT!
```

and edit `index.js` to:

```javascript
fs.writeFile('output.txt', 'This is so fun!', function(err) {
    if (err) {
        return console.error(err);
    }
    
    // Then we can read from that same file.
    fs.readFile('output.txt', function(err, data) {
        if (err) {
            return console.error(err);
        }
        console.log("1. Inside read: " + data);
    });
});

fs.readFile('output.txt', function(err, data) {
    if (err) {
        return console.error(err);
    }
    console.log("2. Outside read: " + data);
});
```

Check the output!

```
2. Outside read: This is so fun!
1. Inside read: This is so fun!
```

**What did we expect?**

This depends entirely on speed. If we assume reading and writing take about the same time, then one may think that the outside `readFile` call will print out 

```
2. Outside read: THIS IS TEXT!
```

and then the inner call to `readFile` happens after the file is written to, and so we expect the following to be printed after:

```
1. Inside read: This is so fun!
```

However, this is clearly not what happens! This means that the write happens so fast that it is completed before an asynchronous read call.

__What is the lesson learned?__

Never make assumptions about the order of execution. If you need a certain order of events, use synchronous events or nested function calls to ensure this. Never leave anything up to chance!

### The Request Module

We are going to learn how to make network requests with Node.js. How? Google it!

Looks like there is a great module called [request](https://www.npmjs.com/package/request).

Let us start by **initializing our package.json file**.

Navigate to whatever folder you want, and run:

```shell
> npm init
```

Fill out the information (or just hit enter until completion). This creates a `package.json` file that has the following contents:

```json
{
  "name": "test",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

Think of this as a **record-keeping file** of your project, as it will keep track of the libraries you require. These libraries can be referred to as **dependencies**. 

On the [request](https://www.npmjs.com/package/request) page, we see that in order to install it, we must run the following in our terminal:

```shell
> npm install request
```

Notice how there is now an entire new folder in your directory. `node_modules` contains all of the libraries that you install. We generally do not want to mess with anything inside of this folder.

Let's pose the following question: Would you want to commit this to GitHub? If I needed to work on this project with other people, should I upload everything in my current directory?

Hopefully, you realized that it is unreasonable for us to commit the libraries. What could solve this? Something that keeps track of all the packages you install so someone else can replicate it quickly. Sounds like something a record-keeping file should take care of.

Let's take another look at `package.json`. Notice how there is nothing related to the request library we installed. If only there was!

Run the following command:

```shell
> npm install request --save
```

Now check out the extra lines in `package.json`:

```json
"dependencies": {
    "request": "^2.79.0"
  }
```

If someone downloaded this new `package.json` file and ran:

```shell
> npm install
```

They would then have the same libraries as you. This is why it is extremely important to use the `--save` flag when installing important libraries.

Let us scrap our `index.js` file. Insert the following at the top:

```javascript
var request = require('request');

request('http://www.google.com', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body);
  }
});
```

Let us go ahead and run:

```shell
> node index.js
```

All the HTML of google.com is here. Change the `console.log(body);` to `console.log(response);`. This is all the information returned by Google's server. We can change the link to be anything you want.

This is essentially doing the same thing that the `$.get()` does. This is just how to do it with Node.js. `request()` is asynchronous. How do we know this? [DOCS](https://www.npmjs.com/package/request)!

Try the following as your URL:

```
http://api.umd.io/v0/courses/CMSC132
```

Now what is printed out? Does this make sense?

### Create your first server

We are going to need the http module for this part of the exercise. 

Go ahead and scrap `index.js`, and put the following at the top of the file:

```javascript
var http = require("http");
const PORT = 8888;
```

__What is a port?__

A port is "an endpoint of communication in an operating system" ([Wikipedia](https://en.wikipedia.org/wiki/Port_computer_networking)). For our sake, think of it as specifying the location for our application on the local server. There are a number of well known ports (1024 of them, to be exact) which are  reserved for specific functions. For example, port 80 defaults to the url.

Now, we need to create the server.

```javascript
/* The request holds information about (surprise) the request to the server! 
 * Things like the url, headers, etc. are stored here.
 * The response dictates what is sent back to the user. The user sees "Link 
 * hit: blah" because we write to the response variable.
 */
function handleReq(req, res){
    console.log("New request at " + req.url);
    res.end("Link hit: " + req.url);
}

/* http.createServer() takes a function that takes in the request and response.
 */
var server = http.createServer(handleReq);

/* This "activates" our server.
 */
server.listen(8888, function(){
    console.log("Server listening on: http://localhost:%s", PORT);
});
```

As usual, go ahead and run:

```shell
> node index.js
```

Cool! We are rendering a new webpage for each endpoint! 

Let's backtrack a little. What is happening when we hit the following link with our web-browser?

```
http://api.umd.io/v0/courses/CMSC132
```

We see an object being printed out in our browser. There is a lot of information about CMSC132 being returned by this **API**. We should make our own API. Modify your code to look like the following:

```javascript
function handleReq(req, res){
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

server.listen(PORT, function(){
    console.log("Server listening on: http://localhost:%s", PORT);
});
```

Now, we have constructed our own API! When we hit different urls, we return different data (just like [umd.io](umd.io)). Let us go ahead and try this out. Go ahead and visit `http://localhost:8888/megan`.

```shell
New request at /megan
_http_outgoing.js:560
    throw new TypeError('First argument must be a string or Buffer');
    ^

TypeError: First argument must be a string or Buffer
    at ServerResponse.end (_http_outgoing.js:560:11)
    at Server.handleReq (/Users/iParikh/Desktop/test/index.js:19:13)
    at emitTwo (events.js:106:13)
    at Server.emit (events.js:191:7)
    at HTTPParser.parserOnIncoming [as onIncoming] (_http_server.js:547:12)
    at HTTPParser.parserOnHeadersComplete (_http_common.js:99:23)
```

What happened? The key part of this error is:

```javascript
throw new TypeError('First argument must be a string or Buffer');
```

This means that we cannot return a JSON object in the response. Before we added data, the only thing we were returning was 'Link hit: /blah', so this makes sense. Luckily, there is a built in function to address this. Let us go ahead and change the `res.end()` statements to look like the following:

```javascript
res.end(JSON.stringify(megan));
```

`JSON.stringify()` takes a JSON object, and converts it into a string so it can be returned. There is another function `JSON.parse()` that can take a string, and convert it back into a json.

**Now** let us hit the url!

Voila!

--------------------

Many examples from this lecture were found on [tutorialspoint.com](https://www.tutorialspoint.com).
