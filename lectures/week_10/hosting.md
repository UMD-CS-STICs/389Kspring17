## Web Server Hosting

When we want to run our application on a website, we must put it on a **web server**. Think about it in the following way.

When we run our Node.js applications, we can access them through `localhost` because that is the default port they run on. However, if we want our application to be accessible by the world, we need to put it on a public web server.

Web hosting services own computers (servers) that all have public-facing IP addresses. If we deploy one of these applications on a web server, then it should work just the way it does now, except anyone can access it!

Often, to set up your servers, you should follow official tutorials like [this](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-16-04) one.

I am going to create my own Digital Ocean server. You can use whatever you want. After creating one, Digital Ocean tells me the droplet IP is `IPADDRESS` and sends me an email with the root's password.

Now, open your terminal and run the following command.

```shell
> ssh root@IPADDRESS
```

`ssh` stands for 'Secure Shell', but think of it as what logs us onto our web server. It prompts for the password, so I just enter what was emailed to me originally. It is likely that you will have to set a new password next. 

Since we want to run Node.js on an Ubuntu (Linux) machine, we need to run a few commands. 

```shell
> curl -sL https://deb.nodesource.com/setup_6.x -o nodesource_setup.sh
> sudo bash nodesource_setup.sh
> sudo apt-get install nodejs
```

The first command grabs a PPA, or personal package archive, which you install with the next line. This makes it so when you install Node.js with the third line, things like `npm` run out of the box.

Now, go find the repository we created earlier, and find the clone link. Run the following command.

```shell
> git clone https://github.com/<USERNAME>/branch-simple.git
```

We have everything here now! Run `npm install` to load all `node_modules` and then run `node index.js`. Navigate to `IPADDRESS:3000` in your web browser. 

**Voila!**

This is not super satisfying, however. When we close the tab our terminal is open on, the web server will stop too. Run the following command.

```shell
> npm install pm2 -g
```

We are install a package called `pm2` (process manager) globally (`-g`). Now run `pm2 start index.js`. Close the terminal window and it should still be fully functional. 

Try to Google a little to figure out how we can remove the `:3000` at the end of the URL...

