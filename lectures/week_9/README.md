# Week 9: Databases

A prerequisite for this lecture is that you have done everything in the [pre_class.md](https://github.com/CMSC389K/spring17/blob/master/lectures/week_9/pre_class.md) file. 

### What is a database?

"A database is a collection of information that is organized so it can be easily accessed, managed, and updated." ([Source](http://searchsqlserver.techtarget.com/definition/database))

There are many different types of databases. We will discuss relational and document-oriented databases.

#### Relational

"A relational database is a collection of data items organized as a set of formally-described tables from which data can be accessed or reassembled in many different ways without having to reorganize the database tables." ([Source](http://searchsqlserver.techtarget.com/definition/relational-database))

In order to interface with a relational database, one typically uses SQL, or Structured Query Language. 

A **table** contains one or more data categories in each column.

Each **row** contains a unique data instance for the categories defined by the column. 

For example, a table could exist of everyone in this class. We could have `id`, `name`, and `grad_year` be the data categories, and then entries would look like the following.

| id | name | grad_year |
| --- | --- | --- |
| 0 | John Smith | 2019 |
| 1 | John Legend | 2020 |
| 2 | Jane Smith | 2021 |
| 3 | Jane Legend | 2022 |
| 4 | Frank | 2023 |

We can define another table to be grades.

| id | student_id | project | grade |
| --- | --- | --- | --- |
| 0 | 0 | 1 | 92.3 |
| 1 | 2 | 2 | 34.2 |
| 2 | 2 | 4 | 54.2 |
| 3 | 4 | 2 | 64.2 |
| 4 | 3 | 3 | 25.2 |

Say we want to get all of student 2's grades. We can then perform an SQL query to _join_ the database based on the class table's `id` field and the grades table's `student_id` field when both are equal to 2. We take advantage of the **relation**ship between the two tables in order to perform more complex queries.

#### Documented-Oriented

Document-oriented databases do not have tables, but instead have _documents_. These are all records that contain all the data in the document. They can be as complex as you choose.

A student from the above example could be stored as a document that looks like the following.

```js
{
    "id": 2,
    "name": "Jane Smith",
    "grad_year": 2021,
    "projects": [
        {
            "id": 1,
            "project": 2,
            "grade": 34.2
        },
        {
            "id": 2,
            "project": 4,
            "grade": 54.2
        }
    ]
}
```

### MongoDB, ODMs, and Mongoose

MongoDB is a type of document-oriented database. It is great for modeling many of the entities that many modern web applications use. In order to interact with MongoDB, we use an abstraction over it, or an Object Data Manager (ODM), called Mongoose. It allows you to use things like **Schemas** (will discuss later) and has automatic data validation. It also creates **Model** abstraction, which makes it look like you are working with objects rather than pure data.

We will cover both Schemas and Models later in this tutorial.

Thanks to [this](http://stackoverflow.com/questions/18531696/why-do-we-need-what-advantages-to-use-mongoose) link for some of this information. 

### Interact w/ a Database

Navigate to [this](https://github.com/CMSC389K/spring17/tree/master/lectures/week_9/code) folder and copy the `shell` directory.

Let us create a database of movies. Navigate to `models/Movie.js` file and add the following lines to the top of the file to require in the mongoose module.

```js
var mongoose = require('mongoose');
```

For our sake, movies will have the following properties.
- Title* (string)
- Year Released* (integer)
- Genre* (string)
- Reviews (array of reviews)

We also need to define what goes in a review.
- Rating out of 5.0* (double)
- Comment (string)
- Author* (string)

\* required

In Java, this class would have looked something like the following.

```java
public Movie {
    private String title;
    private int year;
    private String genre;
    private Review[] reviews;
    
    ...
}
```

In order to define the structure with Node.js and MongoDB, you must use a **schema**.

Let us create the review schema first. Add the following to your `Movie.js` file.

```js
var reviewSchema = new mongoose.Schema({});
```

The schema constructor takes an object where the keys are the subfields and the values are specifications on that subfield. Fill in the object with the following.

```js
var reviewSchema = new mongoose.Schema({
    rating: {
        type: Number,
        min: 0.0,
        max: 5.0,
        required: true
    },
    comment: {
        type: String
    },
    author: {
        type: String,
        required: true
    }
});
```

This should read fairly intuitively. The only reason we know that we have to use keys like `type`, `min`, and `required` are because we looked at the documentation. 

Now, we move on to the movie schema. Add the following to your file.

```js
var movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        min: 0,
        max: 2017,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    reviews: [reviewSchema] 
});
```

Once again, this should read fairly intuitively. The only two things to point are are:

- You use `Number` for both ints and floats. You can sanitize before saving to the database manually.
- Since we want to save an array of reviews, we literally specify just that.

Now, we take the `movieSchema` object and associate it with a certain model. Then, we make it accessible by other files (specifically `index.js`). Add the following lines to the end of your code.

```js
var Movie = mongoose.model('Movie', movieSchema);
module.exports = { Movie };
```

Now, please open up the `.env` file sitting in the project's root. Replace the text `YOUR URL HERE` with your link from [mlab.com](mlab.com). Now, please open the `index.js` file. Let us go over some existing code.

```js
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var dotenv = require('dotenv');
```

These lines are requiring in the necessary modules.

```js
var Movie = require('./models/Movie');
```

This line is giving us access to the movie schema we defined in `Movie.js`.

```js
// Load envirorment variables
dotenv.load();
```

This line is using the `dotenv` module to grab all of the variables defined in the earlier `.env` file. All of the variables set can be accessed through `process.env`. To test this, try adding the following line.

```js
console.log(process.env.MONGODB);
```

The next lines simply set up the express application as we have done many times before.

```js
// Setup Express App
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
```

All remaining existing code blocks are empty endpoints that we are going to fill in. After our application is set up, we need to connect to the database. To do this, we use the following line.

```js
mongoose.connect(process.env.MONGODB);
```

If this happens properly, then we are happy! However, if something goes wrong, we probably want to know. We can listen for this event with the following code.

```js
mongoose.connection.on('error', function() {
    console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
    process.exit(1);
});
```

This reads fairly intuitively. If our mongoose connection has an error, execute the inputted function that logs out a statement, and then exits.

Let us move on to the `POST /movie` endpoint. This endpoint should allow us to add movies to the database. Move your cursor under `// Create a new movie`. In order to create a new movie (assuming perfect user input), insert the following lines.

```js
var movie = new Movie({
    title: req.body.title,
    genre: req.body.genre,
    year: parseInt(req.body.year),
    reviews: []
});
```

Because everything comes in as strings, we use `parseInt()` to convert the year to an integer because we specify in the schema that this must be a 'Number'.

Now, we need to fill in the `// Save movie to database` section. Insert the following code.

```js
movie.save(function(err) {
    if (err) throw err;
    return res.send('Succesfully inserted movie.');
});    
```

Because `movie` is a `mongoose.Schema` object, it has a built-in function called `save()` that does exactly what you would expect. Use Postman to insert a movie of your choice.

![Imgur](http://i.imgur.com/ThC02oV.png)

Now, we want to see all the movies we put into our database. Naturally, let's create a `GET` endpoint. Find `app.get('/movie', ...` and insert the following code.

```js
Movie.find({}, function(err, movies) {
    if (err) throw err;
    res.send(movies);
});
```

Notice how we are using `Movie`, which is the model we grab from `Movie.js`. When we do `Movie.find()`, we are going to be searching the entire movie collection. Inside of the `find()`, we have an empty object (`{}`) as an argument. This object is supposed to be a search paramater (I could specify all movies that have genre comedy with `{ genre: 'Comedy' }`). By leaving that blank, everything in the collection will be a match, and we will get everything in our callback.

Hit this endpoint in postman. What do you see? Hopefully, you get something like this.

```json
[
  {
    "_id": "58d96d32c460515e393d2ef5",
    "title": "Beauty and the Beast",
    "genre": "family",
    "year": 2017,
    "__v": 0,
    "reviews": []
  }
]
```

Please notice the `_id` field. You did not create this field. MongoDB did it for us automatically in order to have a unique identifier. Take a note of the `_id` of the movie you inserted (if you have not done that with Postman, please do it now).

Now that we can see and add movies, let us add a delete functionality. Find the endpoint `app.delete('/movie/:id', ...`. We will use the `_id` noted above as the url parameter.

The first thing we have to do is match the movie that has the same `_id` as `req.params.id`. There is a nice built-in function so we do not have to manually iterate across the entire database. Insert the following code.

```js
Movie.findByIdAndRemove(req.params.id, function(err, movie) {
    if (err) throw err;
    res.send('Movie deleted!');
});
```

Perfect! Now our application finds the movie we need by its `_id` field, and removes it. However, the obvious follow-up question is: What if there is no movie with that ID? Modify the code to be the following.

```js
Movie.findByIdAndRemove(req.params.id, function(err, movie) {
    if (err) throw err;
    if (!movie) {
        return res.send('No movie found with given ID.');
    }
    res.send('Movie deleted!');
});
```

`findByIdAndRemove()` returns the object it matches with in the second parameter of the callback. We can check if this object does not exist, because that means no match was found.

Going back to the original schema, we see that each movie has a spot for reviews. Please navigate to the endpoint `app.post('/movie/:id/review' ...`. This endpoint is going to allow us to add reviews to specific movies (selected by the `_id`).

There are a few steps here:
- Find the movie with the given id
- Create and insert the comment
- Save the updated movie with the new review

In order to find the movie with the given id, we can use the `Model.findOne()` function. Please insert the following code in your endpoint.

```js
Movie.findOne({ _id: req.params.id }, function(err, movie) {
    if (err) throw err;
    if (!movie) return res.send('No movie found with that ID.');
});
```

Great! Now we are getting the movie matching the id, or telling the user that no movie exists for that id. Now, let's update the reviews array. Remember that we defined the review schema to look like the following.

```js
var reviewSchema = new mongoose.Schema({
    rating: {
        type: Number,
        min: 0.0,
        max: 5.0,
        required: true
    },
    comment: {
        type: String
    },
    author: {
        type: String,
        required: true
    }
});
```

In `movieSchema`, we said that reviews would be an array of reviews (as shown below).

```js
reviews: [reviewSchema]
```

So, in order to push a new comment, all we have to do is add the following.

```js
Movie.findOne({ _id: req.params.id }, function(err, movie) {
    if (err) throw err;
    if (!movie) return res.send('No movie found with that ID.');
    movie.reviews.push({
        rating: parseFloat(req.body.rating),
        comment: req.body.comment,
        author: req.body.author
    });
});
```

A question that could arise here is: Why do we not have to export `reviewSchema` from `Movie.js` and say something like:

```js
movie.reviews.push(new Review ({
    rating: parseFloat(req.body.rating),
    comment: req.body.comment,
    author: req.body.author
}));
```

This is because in the movie schema, we define `movie.reviews` to be an array of review objects (that are also defined in `Movie.js`). So, MongoDB knows that when something is added, it must be in that form. You do not have to explictly label it as a review. Try changing a key to something else and see what happens.

Lastly, we have to save the updated movie. Modifying the movie in memory does not mean it is modified in the database. Change your code to the following.

```js
Movie.findOne({ _id: req.params.id }, function(err, movie) {
        if (err) throw err;
        if (!movie) return res.send('No movie found with that ID.');

        movie.reviews.push({
            rating: parseFloat(req.body.rating),
            comment: req.body.comment,
            author: req.body.author
        });

        movie.save(function(err) {
            if (err) throw err;
            res.send('Sucessfully added review.');
        });
    });
```

As a final exercise for you, create the following endpoint.

```js
app.delete('/movie/:id/review/last', function (req, res){

})
```

This endpoint should delete the last review added to the reviews array for a specific movie. Have fun!
