
# Deploying using `now`

We will deploy our final project using a neat little utility called [now](https://zeit.co/now).

To get started, install both the desktop client and the command line application. 

**Desktop Client**

1. Visit https://zeit.co/download
2. Click Download Now
3. Create an account (you will need to verify your email address)

**Command Line Client**

1. Run `sudo npm install now -g` to install
2. Run `now --login` and authenticate yourself using the same email.


### How to Deploy
-----------------

Navigate to an exising project, open up `package.json`. 

You should already have a `script` key that looks like this:

```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
},
```

We want to add one more command called `start` to tell `now` what command to use to start our server. 

```javascript
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node index.js" /* Add this */
},
```

Now simply run `now deploy`. 

That's literally it. You should have a link copied to your clipboard. Paste it into your browser, and view your live application!

### Enviroment Variables
------------------------ 

One really cool feature of `now` is the ability to view the source code of a live website. If you append `/_src/` to the URL, you can view all of the server-side files. 

BUT we don't want to display our enviroment variables. So instead of putting it in our .env file (which is now public to everyone), we run:

`now deploy -e MONGODB="mongo url here"`

Or, if you want to use the `.env` file as is, run:

`now deploy --dotenv`

And it will turn your `.env` file into a `-e` command automatically. 
