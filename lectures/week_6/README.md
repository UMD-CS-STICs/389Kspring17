# Week 6: Middleware + Templating

Please grab a fresh copy of last week's lecture code [here](https://github.com/CMSC389K/spring17/tree/master/lectures/week_5/code). Make sure to run `npm install`. 

### What is middleware?

"Middleware is any number of functions that are invoked by the Express.js routing layer before your final request handler is, and thus sits in the middle between a raw request and the final intended route." - [Safari Books Online](https://www.safaribooksonline.com/blog/2014/03/10/express-js-middleware-demystified/)

In a nutshell, this means that when you send have an endpoint with a declaration that looks like:

```javascript
app.post('/path/of/url', function(req, res) {});
```

The `req` variable that is passed into our callback may be analyzed and/or modified by **middleware** before we can handle it. 

### body-parser

In our last project, we used the middleware `body-parser`. Comment out the following lines:

```javascript
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
```

Open up Postman, and try to use the `/newcontact` endpoint we defined last class. Keep in mind that you must set this to be a `POST` request. Notice how instead of returning `success`, we get `No data recieved` as the response. 
According to our code, this must mean that `req.body` is undefined.

__Why does this happen?__

"The `request` object that's passed in to a handler implements the `ReadableStream` interface. This stream can be listened to or piped elsewhere just like any other stream. We can grab the data right out of the stream by listening to the stream's `'data'` and `'end'` events." [Source](https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/)

The way to then read the data would look something like this
```javascript
var body = [];
request.on('data', function(chunk) {
  body.push(chunk);
}).on('end', function() {
  body = Buffer.concat(body).toString();
  // at this point, `body` has the entire request body stored in it as a string
});
```

This is horrible, and we avoid it by using `body-parser`. In addition, data  can be zipped, compresssed, or just text, and `body-parser` is able to figure it out and convert it to something readable in `request.body`.

Let us go back to the two lines in our file.

```javascript
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
```

This tells our application to use `body-parser` to decode all requests that come in either as json or as URL encoded data (how browsers send form data with `POST` and `PUT` requests). It is important to note that we are **only** expecting json or URL encoded data; if we received a request with a different format (raw, text, XML, etc.), `body-parser` would not know what to do. 

### morgan

In our code example from last class, run `npm install morgan --save`. Then, add the following lines to your project.

```javascript
var logger = require('morgan');
// After the app declaration
app.use(logger('dev'));
```

Start your application, and then go back to postman and submit a `POST` request to `/newcontact`. Go ahead and check your console out.

```shell
POST /newcontact 200 7.247 ms - 7
```

Morgan is defined as a "HTTP request logger middleware for node.js" ([Source](https://github.com/expressjs/morgan)). In a nutshell Morgan is used for logging HTTP request details. This helps us debug and see which endpoints are being hit in the terminal during development.

### Rendering HTML

Currently when we hit the `/` endpoint, we send the string `Hello World!` to the browser using the following line.

```javascript
res.send('Hello World!');
```

Instead, let's render an html file. Create a folder `public/` in your project directory. Put `index.html` inside of `public/` with the following html. 

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Just a Page</title>
</head>
<body>
    Hello World!
</body>
</html>
```

Now, we must change the way we send a response to our user. Take out `res.send()` and change it to the following.

```javascript
res.sendFile('./public/index.html');
```

Try hitting the endpoint `/`. What happens?

```bash
TypeError: path must be absolute or specify root to res.sendFile
```

This error is saying that we must specify absolute paths or give the root, which is the same thing. We can take advantage of the variable `__dirname` that has the project location (string that is echoed out if you run `pwd` in your project directory). Change the `res.sendFile()` line to.

```javascript
res.sendFile('/public/index.html', { root: __dirname });
```

We have to specify the root because the developers of express made it so you have to specify root. In other words, `res.sendFile()` needs an absolute path.

This whole thing is only partly satisfying...

This is nice because we are able to render HTML, CSS, and JavaScript (aka static) pages. This is not so nice because we cannot really do much more. If we want to return dynamic (content can change even at the same link) pages, we must learn about templating.

### Templating

Templating allows us to create **dynamic web pages**. We can create skeletons of what HTML pages should look like, and then control the content however we want. We are going to use the templating engine [handlebars](http://handlebarsjs.com/).

First, run the following line to grab the necessary module.

```shell
> npm install express-handlebars --save
```

We need to update our folder structure. In our main project directory, create a `views/` folder, and then another `layouts/` folder inside of that. 

Getting back to the `index.js` file, we need to require the module in our file.

```javascript
var exphbs  = require('express-handlebars');
```

Then, we must set the engine up with express, and then make sure express uses it. Insert the following lines after the above require statement. The `defaultLayout: 'main'` part is important; we will come back to that later.

```javascript
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
```

Let's create a `main.handlebars` in `layouts/` folder, and insert the html from `index.html` in it. 

Then, create `first.handlebars` inside of the `views/` directory (not `layouts/`) and put any text you want inside it.

Change the `res.sendFile()` line from earlier to the following.

```javascript
res.render('first');
```

Start your server and head to `http://localhost:3000/`.

Wonderful! Hello World!

While we have finally rendered something using handlebars, it does not make sense that 'Hello World!' was rendered even though we tried to render `'first'`. We need to go back and examine the following line.

```javascript
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
```

This means that whenever we render something with handlebars, we go off the `defaultLayout`, which is in this case `main`. If we check out our `main.handlebars` file, we see that it is identical to what our original `index.html` file is. So, the result we got on our page makes total sense.

However, we still have not truly created anything dynamic. This is where the magic happens. Let's change the 'Hello World!' in `main.handlebars` to `{{{body}}}`. Now, try hitting the same endpoint.

You should have seen the text we put in `first.handlebars`.

Let's do something interesting. Create `operation.handlebars` in `/views`.

We are going to try to make a page that can render all different operation requests we made last class. We can go ahead an modify our `res.send()` statement in `/operation/:op`.

Change it to the following lines.

```javascript
res.render('operation', {
    oper: op,
    inp: number,
    result: operations[op](number)
});
```

We are now rendering the `operation.handlebars` file, but also passing in this object of data. Now, let us look how we interact with that in the handlebars file.

Add the following lines to your `operation.handlebars` file.

```html
<h1>We are performing: {{oper}}</h1>
<h2>Our input was: {{inp}}</h2>
<h2>The output was: {{result}}</h2>
```

We are able to access the object that is passed into the render statement by simply writing out the key. Notice how we are using double brackets here versus the triple brackets in `main.handlebars`. Double brackets escape the HTML, which means they do not render anything inside. This means if I passed in a string that looked like `<a href="blah">Hello</a>` into `oper`, that entire string would display instead of the HTML link. The triple brackets would render the HTML link as you would expect. Why would we generally try to avoid the triple brackets?

Start your server and check out what happens.

The next question is what happens if we give an invalid operation? Let's check it out.

We notice that the following line fires.

```javascript
return res.send("Not a valid operation");
```

Let's edit this method to the following:

```javascript
app.get("/operation/:op", function(req, res) {
    var op = req.params.op;
    var number = req.query.number;
    var error = false;

    if (!operations[op] || !number) {
        error = true;
    }

    number = parseInt(number);
    
    res.render('operation', {
        oper: op,
        error: error,
        inp: number,
        result: error ? null : operations[op](number)
    });
})
```

All we are doing is setting a new variable `error` to true if one of our inputs is invalid. Then, when we render, we set `result` to null if `error` is true. Otherwise, we give `result` the result of applying the function to the inputted number. 

Now, we must modify our `operation.handlebars` file. Change it to look like the following.

```html
{{#if error}}
    <h1>You gave a bad input!</h1>
{{else}}
    <h1>We are performing: {{oper}}</h1>
    <h2>Our input was: {{inp}}</h2>
    <h2>The output was: {{result}}</h2>
{{/if}}
```

This is how we can use conditionals in handlebars.

What if we wanted to display some more information from something a little more complex? Edit the endpoint from earlier to look like the following.

```javascript
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
        past.push("BAD OPERATION");
    } else {
        past.push(op + " on " + number + ": " + operations[op](number));
    }

    res.render('operation', {
        oper: op,
        error: error,
        inp: number,
        result: error ? null : operations[op](number),
        past: past
    });
})
```

We are now passing in an array to the handlebars template. To handle this, we can add the following to the our `operation.handlebars`.

```html
<ol>
{{#each past}}
<li>{{this}}</li>
{{/each}}
</ol>
```

Now, we see a log our history. Notice how this may not work if only our number is invalid? I'll leave this next part up to you for practice.

### Back to middleware

If we want to include CSS in our HTML generated by handlebars (or in general), we have to make it so express can serve the css files on our own server. This does not happen by default; you cannot give relative paths to css files in your HTML and expect express to include it. This line makes express serve your public folder directly as files under the `/public` route. 

```javascript
app.use('/public', express.static('public'));
```

The first `/public` specifies what the URL the files can be accessed through. The second `'public'` specifies the folder in your actual server.