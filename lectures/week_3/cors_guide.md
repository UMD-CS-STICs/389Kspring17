
# CORS (Cross Origin Requests)

Many of you are getting the following error when completing the project: 

```
index.html:1 XMLHttpRequest cannot load 
https://congress.api.sunlightfoundation.com/legislators?state=AK&chamber=senate. 
The 'Access-Control-Allow-Origin' header has a value that is not equal to the supplied origin. 
Origin 'null' is therefore not allowed access.
```

Here's a quick guide to what that means, and how you can easily fix it. 

**What is CORS**

​Cross-origin resource sharing (CORS) is an Internet standard that defines how we can access resources on different web domains. 

We want to use APIs and be able to grab information from other sites, and CORS allows us to do so and openly interact with content on the web. 

When we have a website, we have our own domain. For example, if we were Google, our HTML and JavaScript would live on `http://google.com`. When we're devloping on our own computers, our domain might be `localhost://` or `null`.

CORs allows us to make requests from one domain to another. For this project, we are trying to make requests from our domain: `null` to the `https://congress.api.sunlightfoundation.com/` domain. 

**What is causing the problem?**

The problem is your *web browswer*. In order to prevent sites from abusing other sites and promote security, certain web browsers have a built in security measure called the *same-origin policy**.

What this does is restrict resources, such as our JavaScript code, from interacting with resources from different domains than our own. 

Websites and API providers (such as the Congress Sunlight Foundation API we are using) have to **explicitly enable and allow CORS** to tell the browser it is OK for other domains to make and use resources on their own domain. In this case, the Congress Sunlight Foundation API did not do this. 

Some browsers don't enable this policy (such as developer mode in Safari), but most modern browsers do.  

**How can I solve this?**

There's a clever trick to *very easily* solve this problem. It's called `jsonp`. 

All you have to do in your code is slightly change how you make your get request. 

Let's say this is your original request (just like how we did it in class): 
```javascript
$.get("http://google.com", function(data) {
    // your code here
});
```

Instead of passing a string as the first parameter, pass an object with two fields: `url` and `dataType`:
```javascript
$.get({
    url: "http://google.com", // Same URL, but now as a key in an object
    dataType: "jsonp" // This is new and fixes our problem!
}, function(data) {
    // your code here
});
```

**Why does this fix it**

Remember when we included jQuery in our website using the script tag, like this: 

```html
<script src="http://jquerycdnlink"></script>
```

It turns out that these `script` tags are **not subject to the same-origin policy**. This means they can grab resources from other domains freely. This is why we were able to include jQuery like this. 

What `jsonp` does is internally create a script tag to get the data we need. For our example, it creates a script tag like this: 
```html
<script src="http://google.com?callback=myFunc"></script>
```

And when it gets the result, passes the data to the callback function you defined! 

This trick always doesn't work (some sites have builtin security measures not controlled by the browser), but for any **same-origin policy** issues, this will work! 

Hope this helps :)

