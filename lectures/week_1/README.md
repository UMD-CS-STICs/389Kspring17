# HTML, CSS
-------------------------

### What is HTML? 

HTML **(Hypertext Markup Language)** is the code that is used to structure and display a web page and its content. 

### Setup
---------

Create file named `index.html`.

Open it in your text editor and browser.

**Basic HTML document structure.**

Insert the following into your `index.html` file.

```html
<head>
    <!-- meta-info here -->
</head>
<body>
    <!-- page content here -->
</body>
```

### Tags and Elements
-------

HTML tags define **elements** that wrap content. 

For example, this is an HTML paragraph tag : 
```html
<p> this is text </p>
```

The main parts of an HTML element are:  
- Opening tag (`<p>`)
- Closing tag (`</p>`)
- Content (`text`)

Together, these parts form what we call an **element**.

Important elements you should know are: 
```html
<h1> - <h6>   Heading
<p> Paragraph
<i> Italic
<b> Bold
<a> Anchor
<ul> + <li> Unordered List and List Item
<blockquote>    Blockquote
<hr>    Horizontal Rule
<img>   Image
<div>   Division
```

Try experimenting with different elements and layouts to see how they are rendered in the browser. 

**Create h1 Element**

In the body, create an h1 element with the text content "UMD Courses".

```html
<h1>UMD Courses</h1>
```

### Header
-----------

There's a special tag in HTML that's just made for headers. It's called `<header>`

```html
<header>
    <h1>UMD Courses</h1>
</header>
```

Header is a `container` element -- it wraps other elements, just like body or html.

### Body Content
----------------

Add the following in the body, under the header. 

```html
<h2> Title </h2>
Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione a odio fugit, illum, soluta explicabo doloremque et! Cupiditate odio reprehenderit ut ipsa voluptates architecto, consectetur asperiores. Saepe sunt, fugiat molestiae!
```

### Element attributes
----------------------

Elements can additionally have attributes. 

For example: 

```html
    <p class="editor-note" id="web"> this is text </p>
```

These attributes can store extra information in the element. We can later access these attributes and the browser can special attribtues to render elements in certain ways. 

### Images
---------

In the header, above the `h1` element, add a image tag. 

```html
<header>
    <img>
    <h1>UMD Courses</h1>
</header>
```

Set the attribute `width="150px"` to the image. Also set the attribute `src` to a url link to an image. For example, 

```html
<img src="http://thestamp.umd.edu/portals/0/Images/Shops%20and%20Services/terapinLogo.png" width="150px">
```

### Navigation Bar
------------------

Navigation bar can be designed as a unordered list. Here is how you make an unordered list. Add it below the h1 element in the header. 

```html
<ul>
    <li>Home</li>
    <li>About</li>
    <li>Other</li>
</ul>
```

But these have to be links, so we need a link tag, aka `anchor tag`

```html
 <ul>
    <li>
        <a href="http://google.com">Home</a></li>
    <li>
        <a href="http://facebook.com">About</a>
    </li>
    <li>
        <a href="#">Other</a>
    </li>
</ul>
```

### **Attributes**

In addition to the tag name, elements can have attributes. Anchor tag has attribute called href (hypertext reference) which defines the url the link points to.

## CSS
------

CSS is a way for us to make our HTML look pretty. We can use the `<style>` tag to do this.

```html
<style></style>
```

### CSS Reset
-------------

Link tags lets you include CSS from an external file (`.css` file called a **stylesheet**).

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.css">
```

href: URL of CSS stylesheet
rel: stylesheet (relation)

We use `normalize.css` simply because it is a css file that renders everything consistently with modern standards. Some tags have styling be default that we do not want.

### Center header
-----------------

```css
header {
    text-align: center;
}
```

### Push over the bullet points
-----------------------

By setting the padding to ten, we push over the bullet points off screen. 

```css
ul {
    padding: 10px;
}
```

### Inline display
------------------

Make the elements come next to each other.

```css
li {
    display: inline;
}
```

**Block vs. Inline**

Block: 
Ex: headings, paragraphs, list items by default
Stretch the whole width of the webpage and have line breaks before and after

Inline: 
Ex: links by default
Take up minimum space, and exist within normal flow. No line breaks follow.

### Padding:
-------------

```css
li {
    display: inline;
    padding: 0px 10px 0px 10px; /* top right bottom left */
}
```

When we have 1 value for padding, it sets that padding on all four sides. 
When we have 4 values, we individually define the padding for each side. The order goes: top right bottom left. 

**Open chrome dev tools and show**

### Header styles
-----------------

```css
header {
    text-align: center;
    background: url("umd aerial photo");
    background-size: cover;
}
```

Now the text isn't visible, so add:

```css
header {
    color: white; /*NEW*/
}
```

The links stay blue because, unlike most other elements like headings and paragraphs, links dont inherit color from their parent element.

We have to explicitly set the color just for the anchor elements. 

```css
a {
    color: white;
}
```

### Small Adjustments
---------------------

Make the title larger

```css
h1 {
    font-size: 70px;
}
```

Add space between top of page and image.

```css
img {
    margin: 40px 0 0 0;
}
```

Margin creates space on the outside, while padding creates space on the inside.

```css
img {
    margin: ...;
    border: 7px solid red;
    border-radius: 20px;
    background-color: brown;
}
```

### Navigation bar
------------------

Change the background color of the navigation bar unordered list to black, and style the links. 

```css
ul {
    padding...;
    background: black;
}
```

```css
a {
    color: white;
    text-decoration: none;
    background-color: gray;
    padding: 5px;
    border-radius: 5px;
}
```

### Articles
------------

Wrap each article in `<article>` tag.

They currently stretch the whole page.

Making them narrower and centered makes them easier to read.

```css
article {
    width: 500px;
    padding: 20px;
}
```

To center: 

```css
article {
    width: 500px;
    padding: 20px;
    margin: 0 auto;
}
```

`margin: 0 auto` sets the top an bottom margins to 0, and left and right margins are automatically set to center the element. 

This is a very good trick used all the time. 

### Responsiveness
------------------

Try resizing the browser to see how the website reacts.

### Responsiveness for navigation
---------------------------------

Try adding this CSS rule, and then resizing the webpage:

```css
@media (max-width: 500px) {
   body {
        background: red;
   }
}
```

When you make the webpage less than 500px wide, the webpage turns red.

Here are several rules to enable when the website becomes to small. Paste them in and try resizing the browser now. 

```css
@media (max-width: 500px) {
    h1 {
        font-size: 36px;
    } 
    li {
        display: block; /*Makes them next to each other*/
        padding: 7px 0 7px 0; /*Change the padding to top and bottom now*/
    }
    a {
        padding: 5px 40% 5px 40%; /*Make them easier to click on*/
    }
}
```

Let's make one last style change to the links:

```css
a {
    color: white;
    text-decoration: none;
    background-color: gray;
    padding: 5px 100px 5px 100px;
    border-radius: 5px;
}
```


