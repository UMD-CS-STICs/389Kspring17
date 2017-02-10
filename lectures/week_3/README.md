
# Week 3: jQuery + AJAX
--------------------

Before we start, copy `template.html` from the `code` folder in `week_3`.

During class, we will go over how to interact with the webpage using plain JavaScript, and then introduce how to do the same with jQuery. We will use jQuery to add interactivity to our webpage that we build from the first class. 

Finally we will learn AJAX and how to use it to pull data from external APIs, and render it on our webpage. 

#### JavaScript w/ DOM
----------------------
We can use JavaScript to manipulate our webpages and enable interactivity. 

First we will learn how to do so in plain JavaScript, and then move on to using a library, called jQuery, to make our lives easier. 

**What is the DOM**

DOM stands for Document Object Model, and is a programming interface for HTML. It serves as the bridge that connects HTML to JavaScript. 

A Web page is a document, and can be displayed in either the browser window or as the HTML source. 

The access point to the *DOM tree* in JavaScript is the global variable `document`. 

Open up Chrome Developer Tools -> Console, and type in `document`.

Explore the following: 
`document.head`
`document.body`
`document.URL`
`document.write`

There are also several functions (such as `document.write` in `document`, which will be what we will use to manipulate the webpage. 

We can use `document.write` to write a string to the webpage:
```javascript
document.write("<h1>Helloworld</h1>");
```

We can also create elements, append then to eachother, and add them to the body: 
```javascript
var container = document.createElement("header");
var header = document.createElement("h1");
header.textContent = "hi";
container.append(header);
document.body.append(container)
```

Finally, we can select elements and manipulate them: 
```javascript
var links = document.getElementsByTagName("a");
links[0].textContent = "hello"
```

Notice that `links` isn't an array. It's actually an `HTMLCollection`, or a list of element nodes. 

Therefore, we couldn't do something like this: 
```javascript
var links = document.getElementsByTagName("a");
links.map(function(i) { 
    i.textContent = "hi" 
});
```

Since `map` is only a function property of arrays. We could, however, convert the `HTMLCollection` to a normal array, using this snippet:
```javascript
var links = document.getElementsByTagName("a");
links = Array.apply(null, links)
```

We can also select on attributes like class names and ids, using functions like: 
```javascript
document.getElementsByClassName
document.getElementById
```

Notice the difference in plurality. Multiple elements can have the same class name but only one element can have a specific id. 

#### jQuery
-----------

[jQuery](https://jquery.com/) is a JavaScript library that makes the operations like the ones we discussed above easier, while augmenting the exisiting set of DOM functionality given to us by the browser to make advanced interactivity easier.  

We can pull in jQuery from a **CDN**, just like we did with `normalize.css` in our first class. 

Append the following to the bottom of your body: 
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.js"></script>
```

In jQuery, we can *select* elements: 
```javascript
$("p"); // select by tag name
$(".navigation"); // select by class
$("#credit-card-number"); // select by id
```

In order to change specific elements, we can give them a class or id, and then select on the given class/id. 

For example, let's give our `h1` header an id:
```html
<h1 id="main_header"></h1>
```

Now, we can change the text:
```javascript
$("#main_header").text(); // returns UMD Courses
$("#main_header").text("Berkeley Courses");
```

#### Event Handlers
-------------------

Now let's enable interactivity. 

Let's add a id to our button:
```html
<button id="search_button">Search! </button>
```

And add the following JavaScript to the bottom of our file in the script tags:
```javascript
$("#search_button").on("click", function() {
    alert("hello world");
})
```

We can also capture the value from the input and display it: 

Give the input an id:
```html
<input id="school_field" type="text" placeholder="Ex: CMSC">
```

```js
$("#search_button").on("click", function() {
    var inputValue = $("#school_field").val();
    alert(inputValue);
});
```

#### Adding new content to the page
-----------------------------------

We can use `$(...).append("html")` to append new html to the page. 

Let's make an `article-container` to serve as our container for our results:

```html
<div id="articles-container"></div>
```

We can test it out with this:
```javascript
$("#search_button").on("click", function() {
    $("#articles-container").append("<article><h2>This is a title</h2><p>This is content.</p></article>")
});
```

And we can make the other button clear the resuts:

```html
<button id="clear_button"> Clear Results </button>
```

```javascript
$("#clear_button").on("click", function() {
    $("#articles-container").empty();
});
```

#### Pulling data from umd.io

We can use the `$.get()` to request and return data from a URL.

```javascript
$("#search_button").on("click", function() {
    var school = $("input").val();
    $.get("http://api.umd.io/v0/courses?dept_id=" + school, function(data) {
        console.log(data);
    });
});
```

Notice how `data` is an array of the classes we want to display. We can loop through this array and display it on the page:

```javascript
$("#search_button").on("click", function() {
    var school = $("#school_field").val();
    $.get("http://api.umd.io/v0/courses?dept_id=" + school, function(data) {
        for(var i = 0; i < data.length; i++) {
            var current = data[i];
            $("#articles-container").append("<article><h2>"+current.course_id + " : " + current.name +"</h2><p>"+current.description+"</p></article>");
        }
    });
});
```

We can add a check to make sure the school entered is valid:

```javascript
if(data.length == 0) {
    alert("oops not found");
    return;
}
```

Also clear the container every time a new search is conducted:
```javascript
$("#articles-container").empty();
```

#### Making search happen on input change

Change the event handler to:

```javascript
$("#school_field").on("keyup", function() {});
```













