## express-state

Previously, we've passed data to the client using **handlebars**. After we consolidate our data on the server, we can pass our data to our view to make a dynamic page using `res.render`.

For example, let's say we were making a site to display movies. 

Our `server` may look like this:

`index.js`:
```javascript
var express = require('express');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

var movies = [...] // Movies would be stored here. 

app.get("/", function(req, res) {
    res.render("home", {
        movies: movies
    });
});

app.listen(3000);
```

And our handelbars template to display the data would look like this: 

`main.handlebars`:
```handlebars
{{#each movies}}
    <div class="movie">
        Title: {{title}}
        Actors: {{#each actors}} {{this}} {{/each}}
    </div>
{{/each}}
```

This is great, as it makes it really easy to make views that dynamically update based on data. 

But let's say we wanted to use JavaScript on the client, and we needed access to the data to build some functionality. 

One thing we could to is **scrape data from our own view**. In this examle, we could iterate over each `.movie` div and extract the title and actors and build an array in JavaScript. 

**But this is a bad idea**. 

What if the user modified the HTML using chrome developer tools? Then they could hijack our website and have our client-side JavaScript use illegimate data. Also, it's simply inefficient. We control this data, and we should be able to access it more easily. 

---


**Enter express-state**

There is a npm module from Yahoo called [express-state](https://github.com/yahoo/express-state). `express-state` allows us to **"expose"** data to our client directly through a variable we can access in our Javascript. 

From the `express-state` documentation directly:  

> Express State is designed to make it easy to share configuration and state data from the server to the client. It can be used to share any data that needs to be available to the client-side JavaScript code of the an app: e.g., the current user, a CSRF token, model data, routes, etc.

This is exactly what we want! We want to be able to share our data directly to our client-side Javascript. 

**Setup**:

Setting up `express-state` is straightforward. First, run `npm install express-state --save` to install the package. 

Next, in our `index.js`, we need to: 
1. require the module
2. set up express-state
3. expose data to the client

First, we add the following two lines two our application: 

```javascript
expstate.extend(app);
```

What this does is add the `.expose()` method to `app` and all `res` objections in our routes. This means we can use the two functions `app.expose()` and `res.expose()`

```javascript
app.set("state namespace", 'App');
```

What this does is set which variable our data will live under on the client. `App` can be switched out for whatever you want. 

We add these two lines like so: 

```javascript
var express = require('express');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Set up express-state
expstate.extend(app);
app.set("state namespace", 'App'); 

var movies = [...] // Movies would be stored here. 

app.get("/", function(req, res) {
    res.render("home", {
        movies: movies
    });
});

app.listen(3000);
```

One last thing we need to do is render a variable in our main handlebars file:

`main.handlebars`:
```handlebars
<html>

<body>
    {{{body}}}
</body>

<script>
    {{{state}}}
</script>

</html>
```

`{{{state}}}` will actually insert the variable into our page. 

**Exposing data**: 

Now exposing data is really easy. We can do it through `app` for globally exposed data, and through `res` for per-request based exposed data. 

Let's say we had API keys we want to make available to every client. We can expose them like so: 

```javascript
var express = require('express');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Set up express-state
expstate.extend(app);
app.set("state namespace", 'App'); 

var movies = [...] // Movies would be stored here. 

var API_KEYS = {
    "GOOGLE_API_KEY": "102938120938123", 
    "FACEBOOK_API_KEY": "12039812093",
}

app.expose(API_KEYS, "API_KEYS"); // Exposes the API_KEYS variable above

app.get("/", function(req, res) {
    res.render("home", {
        movies: movies
    });
});

app.listen(3000);
```

Now, on the client, we can access the same exact `API_KEYS` object through the variable `App.API_KEYS`. 

Next, if we wanted to expose data on a per-route basis, we could do it like so: 

```javascript
app.get("/", function(req, res) {
    res.expose(movies, "movies");
    res.render("home", {
        movies: movies
    });
});
```

Now, we again have access to the movies variable on the client, through the variable `App.movies`. 

Now we have a way to access server side JavaScript variables easily on the client! Check out the `code_complete` folder for a complete working example. 

