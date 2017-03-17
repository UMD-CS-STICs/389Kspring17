# House of Representatives
### Out: 3/17/17 | Due: 3/31/17 11:59 PM (Deadline 4/1/17 11:59 PM for 10% reduction)

## Overview

You have a `data.json` file that contains much information about most of the US House of Representatives (we removed some representatives from places like Guam, Puerto Rico, etc.).

In this project, you will create a website that allows to you visually explore all of the 50 states and their representatives.

## Objectives

This project will give you practice with using handlebars as a templating engine. In addition, it will be a refresher for your HTML and CSS understanding. 

## Grading

Grading is done entirely through visual inspection. The point breakdown of each template is described below. In total, there are **24 points** to be earned, with varying numbers coming from each `.handlebars` file.


## Setup 

Clone this project folder and run `npm install` inside the directory. 

You have the following files available to you: 
- `index.js`: this is where you will define all your routes. We have provided a skeleton of a working server that has Express required and initialized, middleware initialized, and the server listening on port `3000`. We have also defined all the routes.
- `data.json`: this is a `json` file containing all of the representative data you will need. This file should never be modified. 
- `data-util.js`: these are three utility functions available for you. Read them carefully to understand what they are doing. Feel free to modify this file if you want to add your own functions, as you will be turning in the entire project directory.
- `main.handlebars`: this is the default template file. You must add a navigation bar to this. More instructions will be provided below and in the file.
- `allstates.handlebars`: this is the template file that supports the `/` endpoint.
- `person.handlebars`: this is the template file that will be used for the `/rep/:repid` endpoint. 
- `state.handlebars`: this is the template file that supports the `/state/:statename` endpoint.
- `representatives.handlebars`: this is the template file that supports the `/rep` and `/party/:partyname` endpoints.

READ: `underscore_guide.md` This is an _excellent_ library that makes working with complex (or even simple) objects and arrays a lot easier. Read the guide and use it in your project if you'd like! (This is not a requirement. Normal for loops and for-each loops will be fine).

**Do not use any other NPM modules other than the ones already in `package.json` to complete this project**

## Specifications 

This project is going to be graded through visual inspection. You must implement the following routes and their respective handlebar templates as specified. Please note that when we refer to adding links on a page, the links are considered incorrect if the page they link to (within the application) is broken.

**Please note that all the information that we ask for can be found in `data.json`.**

### Templating

#### `main.handlebars` [5 pts.]

Add a navigation bar to `main.handlebars` so there is one present in all pages rendered. The requirements are the following:

- This navigation bar must have four link (`<a>`) elements **inline** with one another. [1 pt.]

These elements are all links to other pages and are as follows:

- States: links to `/` [1 pt.]
- Democracts: links to `/party/:partyname` for Democrats [1 pt.]
- Republicans: links to `/party/:partyname` for Republicans [1 pt.]
- Representatives: links to `/rep` [1 pt.]

You can find examples of a nav bar in the picture examples below. 

Please note that for the sake of this example, we have done this with only HTML. If you would like to practice your CSS (which you should), please feel free to add some!

#### `person.handlebars` [8 pts.]

This template is rendered when the `/rep/:repid` endpoint is hit. On this page, you must display the following information:
- Full name [1 pt.]
- State (abbreviation or full name) that links to the `/state/:statename` page for that state. [2 pts.]
- Birthday [1 pt.]
- Description (can be found in `data.json`) [1 pt.]
- The representative's party. This text must link to the `/party/:partyname` endpoint for that party. [2 pts.]
- The text "Website" that links to the representative's website [1 pt.]

Example:

![Imgur](http://i.imgur.com/eDo97vK.png)

#### `representatives.handlebars` [5 pts.]

This template is rendered when either the `/party/:partyname` or `/rep` endpoints are hit. This page must display the following:
- The party that is being displayed (can either be "Democrats", "Republicans", or "All Representatives") as a header [1 pts.]
- A list of all the people in that particular group where each name is linked to that representative's `/rep/:repid` page [2 pts.]
- Next to each name should also be the state (full name or abbreviation), and this text should link to the relevant `/state/:statename` page [2 pts.]

Example:

![Imgur](http://i.imgur.com/3laAXxE.png)

#### `state.handlebars` [4 pts.]

This template is rendered when the `/state/:statename` endpoint is hit. The following should be displayed:
- The name of the state in an <ht> tag [1 pt.]
- All of the representatives from that state. However, the representatives must be separated into whether they are democrats or republicans by an `<h2>` label. Please note that if there is a state with no representative from a particular party, that party header should not even be displayed. For example, because there are no democratic representatives from Oklahoma, the page should only have a "Republicans" header, following by the representatives. [3 pts.]

Examples:

Utah (Republican)

![Imgur](http://i.imgur.com/p4orSw9.png)

Alabama (Bipartisan)

![Imgur](http://i.imgur.com/1UQm3kI.png)

#### `allstates.handlebars` [2 pts.]

This template is rendered when the `/` endpoint is hit. This page should display a list of all 50 states (full names) where each name links to the respective `/state/:statename` page. [2 pts.]

![Imgur](http://i.imgur.com/bqtjXIi.png)

### Endpoints

All endpoints are `GET` requests. Please notice that you cannot simply pass in the information in `data.json` to these endpoints. Some preprocessing is necessary. For all of the endpoints, it is up to you to decide what information must be passed into the template file. These endpoints are not going to be graded as implementations will vary. We are going to be looking at what the endpoints show in our browsers and are not grading for efficiency. 

Here is a list of the endpoints and what they must render.

1.  `/` 
    
  This endpoint must render `allstates.handlebars`. 

2. `/party/:partyname`

  This endpoint must render `representatives.handlebars`. Do keep in mind that `/rep` will also be rendering the same template when you are deciding what to pass into the render statement. 

3. `/state/:statename`

  This endpoint must render `state.handlebars`.

4. `/rep`

  This endpoint must render `representatives.handlebars`.

5. `/rep/:repid`

  This endpoint must render `person.handlebars`. Use the `.person.id` field from the sample object below as the `:repid` here, as we can guarantee these are unique. 

```json
  {
        "caucus": null,
        "congress_numbers": [
            115
        ],
        "current": true,
        "description": "Representative for Rhode Island's 2nd congressional district",
        "district": 2,
        "enddate": "2019-01-03",
        "extra": {
            "address": "2077 Rayburn HOB; Washington DC 20515-3902",
            "fax": "202-225-5976",
            "office": "2077 Rayburn House Office Building",
            "rss_url": "http://langevin.house.gov/rss.xml"
        },
        "id": 43865,
        "leadership_title": null,
        "party": "Democrat",
        "person": {
            "bioguideid": "L000559",
            "birthday": "1964-04-22",
            "cspanid": 86608,
            "firstname": "James",
            "gender": "male",
            "gender_label": "Male",
            "id": 400230,
            "lastname": "Langevin",
            "link": "https://www.govtrack.us/congress/members/james_langevin/400230",
            "middlename": "R.",
            "name": "Rep. James “Jim” Langevin [D-RI2]",
            "namemod": "",
            "nickname": "Jim",
            "osid": "N00009724",
            "pvsid": "55787",
            "sortname": "Langevin, James “Jim” (Rep.) [D-RI2]",
            "twitterid": "JimLangevin",
            "youtubeid": "jimlangevin"
        },
        "phone": "202-225-2735",
        "role_type": "representative",
        "role_type_label": "Representative",
        "senator_class": null,
        "senator_rank": null,
        "startdate": "2017-01-03",
        "state": "RI",
        "title": "Rep.",
        "title_long": "Representative",
        "website": "http://langevin.house.gov"
    }
```
 
## Testing

We will be grading these projects with visual inspection, and so you should test with the same method.

## Submissions

Please zip up your entire project and upload it to the submit server! 

**BE SURE TO NOT INCLUDE THE `node_modules` FOLDER WHEN UPLOADING**

Simply delete the `node_modules` directory before submitting. We will re-install the modules when testing. 

## Credits

Credit to [this](https://www.govtrack.us/api/v2/role?current=true&role_type=representative&limit=438) for the `data.json` file. 