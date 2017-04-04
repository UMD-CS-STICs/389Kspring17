# Final Project
#### Out: 4/3/17 | Deadline: 5/1/17 11:59 PM 

### Overview 

In this project, you will tie together everything you have learned this semester. 

The application you will build is a "crowdsourced data application". 

You will utilze the technologies we learned (HTML, CSS, JS, Node.js, Express, Handlebars, and MongoDB) to create an API and front-end website with interactivity for your data.

### Objectives

The purpose of this project is to create a fully functioning **"crowdsourced data application"**.

First, you must select a topic for your project to be on. Example topics could be (you cannot use any of these for your project): 

- Local Dogs for Adoption
- Movie Reviews
- UMD Clubs and Activities
- Rock Climbing Gyms

Topics should ideally be people/places/things that can be crowdsourced by users of your application. Throught this project specification, we will use **Local Dog for Adoption** as an example. 

This project is largely open ended. The only requirement is to satisfy all parts of the `Specifications` section below, which are broad and flexible. Outside of that, you are free to be creative and make something you are proud of. 

### Grading

You fill submit both the application source as well as a `documentation.md` file that documents how you implemented each part of the project. 

Grading will be done using the `documentation.md` file to test your application.

Each specificiation has two types of requirements: 
- (REQ): These are requirements **must** be followed. Failue to do so can result in up to 50% point deductions for the entire project. 
- (X pt): These specifications are worth X points.

### Setup

There is a provided a shell that has all the dependencies you need set up. We have also included several libaries you will need in `package.json`. Clone the shell and run `npm install`. 

### Specifications


1. **Data Format and Storage**

    - (REQ) Data should be stored in MongoDB
    - (5 pt) Each schema should have _at least_ 5 fields (minimum one schema).
    - (5 pt) There should be at least one of each of the following field types:
        - String
        - Number
        - Array (of anything)

    In `documentation.md`, you must list each field and their respective types, as well as include the `mongoose schema`.
    
    **`documentation.md` example**:
    ```markdown
    
    ### 1. Data Format and Storage
    
    #### Dog

    Data fields:
    - `Field 1`: name               `Type: String`
    - `Field 2`: breed              `Type: String`
    - `Field 3`: image              `Type: String`
    - `Field 4`: age                `Type: Number`
    - `Field 5`: characteristics    `Type: [String]`

    Schema: 

    {
        name: {
            type: String,
            required: true
        },
        breed: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        }, 
        age: {
            type: Number,
            required: true
        }, 
        characteristics: [String]
    }
    ```


2. **Add New Data**

    Users will need to be able to add data to your databse. Users will be able to   add data in two ways: 
    
    - (10 pt) Submitting an HTML form. The form should have an input for each data  field. 
    - (10 pt) Sending a `POST` request to an API endpoint. The API endpoint must    take in entry for each data field. 
    
    In `documentation.md`, you will need to include:
    - At which route the HTML form lives on the website
    - At which route the `POST` API endpoint can be accessed. 
    - An example Node.js `POST` request using the `request` module to the API   endpoint.
    
    **`documentation.md` example**:
    ```markdown
    ### 2. Add New Data
    
    HTML form route: `/addDog`
    POST endpoint route: `/api/addDog`
    
    Example Node.js POST request to endpoint: 
    var request = require("request");
    
    var options = { 
        method: 'POST',
        url: 'http://localhost:3000/api/addDog',
        headers: { 
            'content-type': 'application/x-www-form-urlencoded' 
        },
        form: { 
            name: 'Cupcake', 
            breed: 'German Shepherd',
            image: "http://i.imgur.com/iGLcfkN.jpg",
            age: 10,
            characteristics: ["Brown", "Black", "Sleepy", "Lazy"]
        } 
    };
    
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
    
      console.log(body);
    });
    ```

3. **View Data**

    Users should be able to view all data in two ways: 
    
    - (REQ) The HTML pages should be generated using Handlebars
    - (10 pt) At the home `/` route, you should display every data point in an  HTML Page. 
    - (10 pt) At another API `GET` endpoint, you should return all data points as   JSON. 
    
    In `documentation.md`, you will need to include: 
    - The **route** for the API endpoint that returns all data. 
    
    
    **`documentation.md` example**:
    ```markdown
    ### 3. View Data
    
    GET endpoint route: `/api/getDogs`
    
    ```

4. **Search Data**

    Also on the home page, you should implement an **auto-updating search feature** . 
    
    Select an appropriate field to run your searches on. 
    
    When the user first visits the home `/` page, they should see all data points. 
    
    - (15 pt) As the user types in the search bar, filter the results on the page   to those that match the search query. The results should be **auto-updating**. This means that for every keystroke, the results should be updated. The page should NOT refresh while typing and searching. 
    - (5 pt) If there is no match, then display text indicating that there are no   matches. 
    
    Note: Feel free to use any **NPM Modules** to help you complete this task. 
    
    **Example:**
    
    I chose to implement search on Dog names. Suppose I have dogs `"nelson"`,  `"nelley"`, and `"noslen"`. As soon as I type `"N"` (without hitting enter), the  list should be filtered to only include `"nelson"` and `"nelley"`. If I type `"Nee"`, then I should see something like "There are no dogs with the name "Nee". 
    
    In `documentation.md`, you will need to include: 
    - Which field you chose to conduct the search on. If you pick a string field, please make sure it is case-insensitive.
    
    **`documentation.md` example**:
    ```markdown
    ### 4. Search Data
    
    Search Field: name

    ```

5. **Navigation Pages**

    On the home `/` page, you should also have a **navigation bar**. This navigation bar will have **5 links**, and should be visible on every page. 

    The navigation bar links should filter your data in some way. 

    As an example, for the Dogs example, we could have: 
    - Heavy Dogs: Lists all dogs over 20.0 pounds
    - Select a Breed: Displays a list of breeds that you can use to filter. 
    - Young Dog: Lists all dogs younger than 4 years old. 
    - Random Dog: Showcases a random dog. 
    - Alphabetical Dogs: Lists all dogs in alphabetical order by name.

    (REQ) All additional pages must be rendered using handlebars. 

    (5 pt) 5 navigation bar links visible on each page (Hint: Use `main.handlebars`). 

    (15 pt) 5 pages linked to from the navigation bar that display the appropriate filtered data. 

    In `documentation.md`, you will need to include: 
    - Each of the 5 navigation filters
    - The routes for each of the additional pages
    
    **`documentation.md` example**:
    ```markdown
    ### 5. Navigation Pages

    Navigation Filters
    1. Heavy Dogs -> `/heaviest`
    2. Select a Breed -> `/breed/:breed_name`
    3. Young Dog -> `/youngest`
    4. Random Dog -> `/random`
    5. Alphabetical Dogs -> `/alphabetical`
    
    ```

### Submission

We will detail how to submit this project in the next week. In class we will learn about hosting and git.

### Additional Comments

You can use mlab for a free MongoDB instance. Read the instructions [here](http://google.com) for instructions.

Please ask questions if you are confused! Posting in piazza is a huge resource for everyone. This is a very general project, so we expect to clarify quite a bit. 
