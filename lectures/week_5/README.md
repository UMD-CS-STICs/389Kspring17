
# Week 5: Express.js

### Why do we need Express.js? 

Node.js is a **runtime enviroment** that allows us to create applications in JavaScript. 

Last week, we explored how to use Node to :

1. Read and write files
2. Make requests
3. Write a http server. 

The server we wrote looked like this: 

```javascript
var http = require('http');

function handleReq(req, res) {
    if (req.url === '/route1') {
        return res.end(...);
    } else if (req.url === '/route2') {
        return res.end(...);
    } 
    return res.end("404");
}

var server = http.createServer(handleReq);

server.listen(8888, function() {
    console.log("Server listening on: http://localhost:%s", 8888);
});
```

With this application, we can run a http server (on port `8888`) that is capable of sending plain text responses. In addition, it can send different responses based on which route (such as `/route1`) is visited. 

However, some of the more advanced features of a web server are not given to us by Node directly. For example, supporting different HTTP verbs (`POST`, `DELETE`, etc), serving static files, and dynamically creating templates. 

Instead of writing code to do all of this from scratch (which would be very hard and tedious), we can use a **web framework** that has all the work done for us. 

By far, the most popular Node web framework is [Express.js](https://expressjs.com/). Some other Node frameworks include [Hapi.js](https://hapijs.com/), [Sails.js](http://sailsjs.com/), and [Koa.js](http://koajs.com/). 

__Why are we using Express.js and not the others?__

It is the most popular, is backed by major companies, and has the most support and active development. It is also very flexible and allows us to mix and match components as we wish. 

### What can Express.js do?

Express.js is a **web framework** for Node. It has support for many of the advanced server features that we want to use that are not available to us directly in pure Node. 

Today we will look at two main features of Express: 

1. **Writing request handlers for different HTTP verbs.**

    Say we have a route `/contacts`. If we want to display a list of contacts, we might define a GET handler for `/contacts` that will return a HTML page with a list of contacts. 

    We might also want to be able to create new contacts. If we have a form on the page, we can make it submit data to `/contacts`, and define a `POST` handler for '/contacts'. 

    Now, we can make the route `/contacts` behave differently based on which type of HTTP request it recieves. 

2. **Advanced routing**

    Sometimes, we just don't want to manually define each route explicitly, and be able to capture variables in our route. 

    For example, let's say we have a blog site. In our blog, we have several sub-blogs. And in each sub-blog, we have several blog posts, each with a tag. 

    If we want to view blog posts in the `web-dev` blog with the tag `php`, we might define our URL to look like this: 

    ```
    http://blogsite.com/blog/web-dev/posts?tag=php
    ```

    If we were to hardcode routes for every single blog and tag like above, it would be very tedious. Express.js gives us very easy and powerful ways to do advanced routing like this. 

### Setup

Let's set up our project. 

1. Create a directory called `my-first-express-app`
2. Run `touch index.js` and `npm-init --yes` to create a main js file and our `package.json` file. 
3. Run `npm install express  --save` to install express.

Now, in our `index.js` file, paste the following code: 

```javascript
1.   var express = require('express')
2.   var app = express()
3.   
4.   app.get('/', function (req, res) {
5.     res.send('Hello World!')
6.   })
7.   
8.   app.listen(3000, function () {
9.     console.log('Server running on port 3000!')
10.  })
```

Let's go through this step by step: 


```javascript
1. var express = require('express')
2. var app = express()
```

First, we require the Express module. The export of the module is a function, which returns the object `app`. 

When we call `Express()`, it returns `app`, and we store it in our variable named `app`. 

`app` is our entry point into all things Express. It is a huge object with all the functions and variables we will need to build our Express app. 

```js
4.   app.get('/', function (req, res) {
5.     res.send('Hello World!')
6.   })
```

`app.get` is a **route definition**, and defines a new route for a `GET` request. The first parameter is the route, which in this case is just `/`, and the second parameter is a callback. 

The callback takes two arguments: `req` and `res` which stand for **request** and **response**. 

`req` is what is coming into the server at this endpoint, and `res` is what we're going to send back. We will pick off information from `req` to format the `res` to send the correct response back to the user. 

In this case, we are simply call `send()` on `res` to send back the text "Hello World". 

```js
8.   app.listen(3000, function () {
9.     console.log('Server running on port 3000!')
10.  })
```

Finally, we have our listener, which is going to spin up our server on port 3000, and when it's ready, logs "Server running on port 3000!"

Run `node index.js` and go to `localhost:3000` to see our application working. 


### Modules 

Now we'll take a quick break from Express.js to go over how to create **modules**. 

Modules are a way of isolating our code into nice, bite-sized packages. They should be able to run independently and easily be used in other projects. 

Express itself is a module, and we will be using _several_ modules created by other developers throughout the rest of the course. Therefore, it is important to understand how they work and how we can write our own modules. 

Let's create a new file named `factorial.js`. 

`factorial.js`:
```javascript
function factorial(n) {
    if(n == 1) return 1;
    return n * factorial(n-1);
}

module.exports = factorial;
```

In this file, we are defining a function `factorial`, and then **exporting** it so we can use it in other files. 

Now, at the top of our `index.js` file, include the following line to import our module: 

```js
var factorial = import("./factorial");
```

and at the bottom include: 

```javascript
console.log(factorial(5))
```

If we run our `index.js` file, we will see that we were able to run `factorial(5)` in this file even though we defined the function in another file. 

**Questions**
- Could I have named the function something else in my `index.js file`? For example, could I have done `var test = require("./factorial");`
- What if I changed my export to `module.exports = factorial(5);`

### Routing

URLs have different sections that can hold data. 

One way we can old data is the path: 
```
http://cmsc389k.io/this/is/the/path
```

In this case, the path would be `/this/is/the/path`. We can use the path to make route definitions. 

We also have **query parameters**, that look like this:

```
http://cmsc389k.io/path?name=Nelson&age=99
```

We can access the query parameters in our `req` function param with `req.query`. 

Let's define a new route called `/factorial`, that will return the factorial of the number given by the query parameter `age`:

```javascript
app.get('/factorial', function(req, res) {
    var number = req.query.number;
    if(!number) { return res.send("Please send a number"); }

    number = parseInt(number);
    res.send(factorial(number) + "");
})
```

Now, let's make a new route to square numbers. 

Let's rename `factorial.js` to `operations.js`, and have the following code:

`operations.js`:
```javascript
function factorial(n) {
    if(n == 1) return 1;
    return n * factorial(n-1);
}

function square(n) {
    return n * n;
}

function root(n) {
    return Math.sqrt(n);
}

module.exports = {
    factorial: factorial,
    square: square, 
    root: root
};
```

Now, we have three functions, and we are exporting an **object** instead of a single function. 

Now, let's edit `index.js` to match this: 

`index.js`
```javascript
var express = require('express');
var app = express();
var operations = require("./operations");

app.get('/', function(req, res) {
    res.send('Hello World!');
})

app.get('/factorial', function(req, res) {
    var number = req.query.number;
    if(!number) { return res.send("Please send a number"); }

    number = parseInt(number);
    res.send(operations.factorial(number) + "");
})

app.get('/square', function(req, res) {
    var number = req.query.number;
    if(!number) { return res.send("Please send a number"); }

    number = parseInt(number);
    res.send(operations.square(number) + "");
})

app.get('/sqroot', function(req, res) {
    var number = req.query.number;
    if(!number) { return res.send("Please send a number"); }

    number = parseInt(number);
    res.send(operations.sqroot(number) + "");
})


app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
})
```

Now, we've defined three routes to handle three different types of functions, which were all defined in our `operations.js` file. 

But obviously, this is very repetitive. What if we could combine all of this into one route?

### Route Parameters

We can do so by using **route parameters**. 

Let's go back to our blog example: 

```
http://blogsite.com/blog/web-dev/posts?tag=php
```

Notice how `web-dev` is a variable, and can change. In order to capture that as a variable, we can take advantage of route parameters. 

We define a route parameter in a route by `:variablename`. 

Let's create a new route:
```js
app.get("/operation/:op", function(req, res) {
    res.send(req.params.op);
})  
```

In this case, we have a route parameter named `op`, and we can access it through `req.params`. 

Now, we can use that to create a dynamic route!

```javascript
app.get("/operation/:op", function(req, res) {
    var op = req.params.op;
    var number = req.query.number;

    if(!operations[op]) { return res.send("Not a valid operation"); }
    if(!number) { return res.send("Please send a number"); }

    number = parseInt(number);
    res.send(operations[op](number) + "");
});
```

### HTTP Verbs

There are two different types of HTTP requests that we will use in our projects: `GET` and `POST`. 

There are other ones such as `HEAD`, `PUT`, `DELETE`, `CONNECT`, and more, but the only two we will need are `GET` and `POST`. 

**`GET` request**:

A `GET` request is used to retrieve information from a given server using a given URI. 

Get requests should **only** retrieve data, and should otherwise not modify the data or cause any side-effects. 

**`POST` request**:

A `POST` request is used to send data to the server. It often causes a change in data/state or side-effects on the server. 

The main differences are:
- `POST` has a request body, `GET` does not. 
- `POST` causes side-effects/change, `GET` does not. 

### Post Request Route

We can define a route definition for a `POST` request just like we defined a `GET` request, but use the `post()` method instead of `get()` of `app`. 

```javascript
app.post("/route", function(req, res) { ... });
```

Let's create two new endpoints: 
- `GET` endpoint at `/contacts` that will let us view contacts. This will simply return our contacts as a JSON object. 
- `POST` endpoint at `/newcontact` that will let us create a new contact

Let's also create a **global variable** `contacts` at the top of our file

in `index.js`:
```javascript
var contacts = {};

app.get("/contacts", function(req, res) {
    res.json(contacts); // allows us to return JSON instead of text. 
});

app.post("/newcontact", function(req, res) {
    // For now, log the request body
    req.log(req.body);
    res.send("success");
});
```

We also need to use `bodyParser`. This is a middleware component, and we will be going over what middleware is next week. 

Run `npm install body-parser --save` and include the following lines at the top of `index.js`:

`index.js`:
```javascript
var bodyParser = require('body-parser');

...

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
```

### Postman

We can use an application named **Postman** to help us test our application. 

You can download Postman as a Chrome extension here: [Download](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=en)

In Postman, edit the following settings: 

![Postman](http://i.imgur.com/4r9rOyn.png)

1. Change `GET` to `POST` in the dropdown
2. Change the URL to `http://localhost:3000/newcontact`
3. In the `Body` tab, click the radio button for `x-www-form-urlencoded`
4. Enter 2 names in `key` and 2 phone numbers in `value`

When you click send, you should see this in your terminal: 

```js
{ nelson: '7038919132', sashank: '5714199811' }
```

and `success` in the Postman response window. 

### Updating data with the `POST` request

Now that we can take in post requests, let's update the `contacts` variable in our endpoint. 

```javascript
app.post("/newcontact", function(req, res) {
    if(!req.body) { return res.send("No data recieved"); }
    for(var contact in req.body) {
        contacts[contact] = req.body[contact];
    }
    res.send("success");
});
```

We've made our first, very own API! 
