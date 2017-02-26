# Pokémon API
### Out: 2/25/17 | Due: 3/11/17 11:59 PM (Deadline 3/12/17 11:59 PM for 10% reduction)

## Overview

You have a large `.json` file available to you called `poke.json` that contains information about 150 Pokemon. 

In this project, you will create: 

1. A website that allows to you visually explore Pokemon
2. An API that will allow you to query different Pokemon. 

A demo of this project can be found at: [Demo](http://104.131.182.143:3000/)

## Objectives

This project will give you practice with using Express.js, and how to use it to create both a website and API. You will also practice JSON parsing. 

## Grading

The project will be graded as follows: 

- Public Tests: 60 points
- Manual Tests: 20 points 

The **API portion** will be tested using public Mocha tests. 
The **Website portion** will be tested manually after submission to the submit server by the TAs. 

## Setup 

Clone this project folder and run `npm install` inside the directory. 

You have the following files available to you: 
- `index.js`: this is where all your code will be. We have provided a skeleton of a working server that has Express required and initialized, middleware initialized, and the server listening on port `3000`. We have also defined all the routes. **This is the only file you should edit, and where all your code must be.**
- `poke.json`: this is a `json` file containing all of the Pokemon data you will need.
- `poke-data-util.js`: these are three utility functions available for you. Read them carefully to understand what they are doing. 

READ: `underscore_guide.md` This is an _excellent_ library that makes working with complex (or even simple) objects and arrays a lot easier. Read the guide and use it in your project if you'd like! (This is not a requirement. Normal for loops and for-each loops will be fine).

**Do not use any other NPM modules other than the ones already in `package.json` to complete this project**

## Specifications 

This project has two sections:
1. API
2. Website

**API (Total: 60 points in tests)**

You will need to implement the following routes. All API routes are under `/api`

1.  `GET` `/api/id/:pokemon_id` 
    
  Return the entire data entry associated with the given pokemon_id. 

  If the Pokemon ID does not exist, return an empty object. 

  ---- 

  Example Request: `GET` `/api/id/24`

  Response: 
  ```js
   {
       "id": 23,
       "num": "023",
       "name": "Ekans",
       "img": "http://www.serebii.net/pokemongo/pokemon/023.png",
       "type": [
         "Poison"
       ],
       "height": "2.01 m",
       "weight": "6.9 kg",
       "candy": "Ekans Candy",
       "candy_count": 50,
       "egg": "5 km",
       "spawn_chance": 2.27,
       "avg_spawns": 227,
       "spawn_time": "12:20",
       "multipliers": [
         2.21,
         2.27
       ],
       "weaknesses": [
         "Ground",
         "Psychic"
       ],
       "next_evolution": [{
         "num": "024",
         "name": "Arbok"
       }]
   }
  ```

  Example Request: `GET` `/api/id/1000`

  Response: 
  ```
  {}
  ```

2. `GET` `/api/evochain/:pokemon_name` 

  Return an array of all the Pokemon in the given Pokemon's evolution chain in alphabetical. Include the given Pokemon in the array.

  If the Pokemon name does not exist, then return an empty array. 

  You can assume we will provide the correct capitalization of the Pokemon. (Ex: We will request `/evochain/Pikachu`, not `/evochain/pikachu`)

  For those not familiar with Pokemon, Pokemon evolve into other Pokemon in it's evochain. Think of it as a singly-linked linked list. It is tored in the JSON under `prev_evolution` and `next_evolution`.

  ---- 

  Example Request: `GET` `/api/evochain/Starmie`

  Example Response: 
  ```js
  ['Starmie', 'Staryu']
  ```

  Example Request: `GET` `/api/evochain/Electabuzz`

  Example Response: 
  ```js
  ['Electabuzz']
  ```

  Example Request: `GET` `/api/evochain/Sashank`

  Example Response: 
  ```js
  []
  ```

3. `GET` `/api/type/:type` 

  Return an array of all Pokemon of the given type in the order they appear in the data object. 

  If no Pokemon are of the given type, then return an empty array. 

  You can assume we will provide the correct capitalization of the type. (Ex: We will request `/type/Fire`, not `/evochain/fire`)

  ---

  Example Request: `GET` `/api/type/Fire`

  Response: 
  ```js
  ["Charmander","Charmeleon","Charizard","Vulpix","Ninetales","Growlithe","Arcanine","Ponyta","Rapidash","Magmar","Flareon","Moltres"]
  ```

  Example Request: `GET` `/api/type/Ghost`

  Response:
  ```js
  ["Gastly","Haunter","Gengar"]
  ```

  Example Request: `GET` `/api/type/Nelson`

  Response:
  ```js
  []
  ```

4. `GET` `/api/type/:type/heaviest` 

  Return an object with the name and weight of the heaviest Pokemon of a given type. 

  The weight of a Pokemon can be found under the attribute `weight`
  (Note: there are no ties, so they are not an issue)

  If the given type does not exist, return an empty object. 


  ----

  Example Request: `GET` `/api/type/Fire/heaviest`

  Response:
  ```js
  {"name":"Arcanine","weight":155}
  ```

  Example Request: `GET` `/api/type/Water/heaviest`

  Response:
  ```js
  {"name":"Gyarados","weight":235}
  ```

  Example Request: `GET` `/api/type/Rachel/heaviest`

  ```js
  {}
  ```

5. `POST` `/api/weakness/:pokemon_name/add/:weakness_name` 

  Adds the given weakness to the `weaknesses` array of a given pokemon. 
  If the weakness is already there, you should not add another instance of it. 

  You should update: 
  1. The `poke.json` file with the new weakness so changes are saved to disk (and persist even if the server is reloaded). 
  2. The global `_DATA` object, so that subsequent requests will use the updated data.

  Return an object with the name and updated Pokemon weakness array. **Weaknesses should be added to the end of the weaknesses array.**

  If the Pokemon does not exist, return an empty object. 

  ----

  Example Request: 

  Example Request: `POST` `/api/weakness/Fearow/add/Fire`

  Response:
  ```js
  {"name":"Fearow","weaknesses":["Electric","Rock", "Fire"]}
  ```

  **AND `poke.json` should be updated**

  Example Request: `POST` `/api/weakness/Sashank/add/Fire`

  ```js
  {}
  ```

6. `DELETE` `/api/weakness/:pokemon_name/remove/:weakness_name` 

  Removes the given weakness from the `weaknesses` array of a given pokemon. 
  If the does not exist, keep the weaknesses array as it is.  

  You should update: 
  1. The `poke.json` file with the weakness removed so changes are saved to disk (and persist even if the server is reloaded). 
  2. The global `_DATA` object, so that subsequent requests will use the updated data.

  Return an objecect with the name and updated Pokemon weakness array. Order **Order all all other weaknesses should be maintained.**

  If the Pokemon does not exist, return an empty object. 

  ----

  Example Request: 

  Example Request: `DELETE` `/api/weakness/Fearow/remove/Rock`

  Response:
  ```js
  {"name":"Fearow","weaknesses":["Electric"]}
  ```

  **AND `poke.json` should be updated**

  Example Request: `DELETE` `/api/weakness/Sashank/remove/Fire`

  ```js
  {}
  ```


**Website (Total: 20 points)**

1. `GET` `/` **5 points**

  Display an HTML homepage of all the pokemon in a table with two columns:

  1. Pokemon ID
  2. Link tag with Pokemon name that links to `/pokemon/:pokemon_id`

  ----

  Response (Image):

  ![Pokemon Page](http://i.imgur.com/976SSuy.png)


  Reponse (HTML: 

  ```html
  <html>
  <body>
      <table>
          <tr><td>1</td><td><a href="/pokemon/1">Bulbasaur</a></td></tr>
          <tr><td>2</td><td><a href="/pokemon/2">Ivysaur</a></td></tr>
          <tr><td>3</td><td><a href="/pokemon/3">Venusaur</a></td></tr>
          <tr><td>4</td><td><a href="/pokemon/4">Charmander</a></td></tr>
          ...
      </table>
  </body>
  </html>
  ```

2. `GET` `/pokemon/:pokemon_id` **10 points**

  Display an HTML page with a table of all the Pokemon's data in two columns: 

  1. Key
  2. Value (if the value is not a String, just show it's `toString` representation)

  If the Pokemon ID does not exist, return an "Error: Pokemon not found". 


  ----

  Example Request: `GET` `/pokemon/33`

  Response (Image):

  ![Pokemon Page](http://i.imgur.com/QCQSJCB.png)

  Response (HTML):

  ```html
  <html>
  <body>
    <table>
      <tr><td>id</td><td>33</td></tr>
      <tr><td>num</td><td>"033"</td></tr>
      <tr><td>name</td><td>"Nidorino"</td></tr>
      <tr><td>img</td><td>"http://www.serebii.net/pokemongo/pokemon/033.png"</td></tr>
      <tr><td>type</td><td>["Poison"]</td></tr>
      <tr><td>height</td><td>"0.89 m"</td></tr>
      <tr><td>weight</td><td>"19.5 kg"</td></tr>
      <tr><td>candy</td><td>"Nidoran ♂ (Male) Candy"</td></tr>
      <tr><td>candy_count</td><td>100</td></tr>
      <tr><td>egg</td><td>"Not in Eggs"</td></tr>
      <tr><td>spawn_chance</td><td>0.083</td></tr>
      <tr><td>avg_spawns</td><td>8.3</td></tr>
      <tr><td>spawn_time</td><td>"09:02"</td></tr>
      <tr><td>multipliers</td><td>[1.83]</td></tr>
      <tr><td>weaknesses</td><td>["Ground","Psychic"]</td></tr>
      <tr><td>prev_evolution</td><td>[{"num":"032","name":"Nidoran(Male)"}]</td></tr>
      <tr><td>next_evolution</td><td>[{"num":"034","name":"Nidoking"}]</td></tr>
    </table>
  </body>
  </html>
  ```


3. `GET` `/pokemon/image/:pokemon_id` **5 points**

  Display an HTML page with *just* an image of a given Pokemon ID: 

  If the Pokemon ID does not exist, return an "Error: Pokemon not found". 

  ----

  Example Request: `GET` `/pokemon/33`

  Response (Image):

  ![Img](http://i.imgur.com/W24vqds.png)

  Response (HTML):

  ```html
  <html>
  <body>
    <img src="http://www.serebii.net/pokemongo/pokemon/033.png">
  </body>
  </html>
  ```

## Testing

Make sure to run `npm install mocha -g` on your machine if you have not done so already. To test your project, run `mocha test` while in the main project directory. If you only want to run public tests, run `mocha test/publicTests.js`.

When testing with mocha, make sure before you run your tests that:
1. You are not running your app 
2. You are not running any other application on `port 3000` (If you go to `localhost:3000` it should say "This site can’t be reached")

## Submissions

Please submit your `index.js` file **only** to the submit server.

You cannot use any other npm packages, so do not include your `package.json`
