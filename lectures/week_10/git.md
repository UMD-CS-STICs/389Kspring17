
## Git

Git is how we are going to version control.

### What is version control?

Version control is what allows hundreds of developers to work on the same code base at the same time. When we work on a project, let us think of it as a sort of timeline. Let us also call this timeline `master`.
![Imgur](http://i.imgur.com/UZaNj8f.png)
Node 1 represents our starting point, and we can continue working on this code. Let us say we added a bunch of new functionality and iterated on our initial code base.
![Imgur](http://i.imgur.com/oNZj3IS.png)
We can keep building this way, but this is not sustainable in the case of having multiple developers. For example, what if Dev A wants to make changes to the same code base, or repository, as Dev B needs to work on. Then we will run into something like this:
![Imgur](http://i.imgur.com/kfRDvxy.png)
Which code is part of the true `master` branch (timeline)? 

One developer should be working on a specific part of the code at a time, otherwise it can be extremely hard to merge the changes. However, let us say that Dev A and Dev B wanted to work together. Dev A could **branch** of the original `master` branch into a `dev` branch. This would look something like this.
![Imgur](http://i.imgur.com/rn8H5zV.png)
Dev A could work on this branch for a while, and then **push** up his/her changes. 
![Imgur](http://i.imgur.com/C966EYd.png)
Dev B can then **checkout** the `dev` branch, and make his/her following changes. Dev B will have all the updates Dev A made as long as he/she switches to the `dev` branch. 
![Imgur](http://i.imgur.com/CoNCiNF.png)
Now, this needs to be put back into the `master` branch, as we were only working on something in the not-production/master `dev` branch. This is what we call a **merge**. We need to merge the `dev` branch with `master`.

This would ideally look like the following.
![Imgur](http://i.imgur.com/VmrGNDs.png)
Keep in mind that we are operating one serious assumption. When we merge back into `master`, none of the files modified in the `dev` branch can have been modified in `master`, because then we run into the same problem described earlier (when Dev A and Dev B both worked on master). This problem is called a **merge conflict**. 

To resolve this, you generally revert the changes in `dev` in the overlapping files, merge the new branch, and then branch again to fix the overlapping files. _Fix: Never work on things in master and **ALWAYS** branch._

Briefly, let us introduce Dev C. Dev C is new to our engineering team, and he/she is given an old laptop that only has version 1 of our master branch. How do we fix this? We simply **pull** all the changes from the respository. Pull is another way of getting back up-to-date.

This is a very high-level explanation of version control, as many other things can go wrong. Git allows us to control this branching structure (sort of) easily. 

### Install git

Git is the most common version control system. Please install it from [this](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) link.

Go to [GitHub](github.com) and create an account if you do not have one already. Then, create a new respository called `branch-simple`. 

Run the following commands in the root of the project we worked on earlier in this tutorial.

```shell
> git init
> git add -A
> git commit -m 'first commit'
> git remote add origin git@github.com:<YOUR USERNAME>/branch-simple
> git push -u origin master
```

Let us discuss these one at a time.

```shell
> git init
```

This initializes a git repository in your project folder. This is essentially a marker saying that "everything in this folder is part of our repository".

Let us also quickly add a file called `.gitignore` in the project root. Inside of this file, add the following lines.

```
.env
node_modules
```

We add files/folders to this file if we do not want them to be included in the pushes. Things like `node_modules` should not be in this because we can replicate it easily with the `package.json` file (and `npm install`). We do not want files like `.env` because it is a security issue if everyone knows the MongoDB URL. 

```shell
> git add -A
```

This adds all (`-A`) the files in the current directory (and all subdirectories) to a queue to be committed. It automatically takes into account the files in `.gitignore` and (you guessed it) ignores them. That brings us to the next line.

```shell
> git commit -m 'first commit'
```

This marks all the new files/changes that have been added with the log message 'first commit'. Git knows that this log message follows the `-m` flag. These files are now staged to be pushed. 

```shell
> git remote add origin git@github.com:<YOUR USERNAME>/branch-simple
```

This tells the local git repository to communicate with the `branch-simple` repository we created on github.com. You may need to enter your username and password for GitHub at this step. Finally, we run:

```shell
> git push -u origin master
```

This pushes the code to the master branch of our repository.

### Testing it with our code

Let us try branching with some harmless lines of code. Create a new branch with the following code.

```shell
> git checkout -b dev
```

You just checked out a new branch (new because of the `-b` flag) called `dev`. Now, go to `index.js` and add some lines of code at the top of your file.

```js
1 // Hello this is a comment.
2 // Yes it is.
3 // Nelson.
```

Now, run the following lines to get the code up in the GitHub repository.

```shell
> git add index.js
> git commit -m 'adding harmless comments'
> git push -u origin dev
```

Notice how we do not have `master` as the branch anymore; it is now `dev` because we want to push to the dev branch. 

Go to [GitHub](github.com) and check out your repository. Switch to the `dev` branch on the website and check out the changes in `index.js`.

Go back to your terminal and switch back to the master branch.

```shell
> git checkout master
```

Look at `index.js` now. Notice how the comments are gone. Now, we need to merge the `dev` branch into `master`, and so we run the following commands.

```shell
> git merge dev
> git push -u origin master
```

Go back to the online repository and look at the changes!