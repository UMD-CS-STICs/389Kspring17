# 50 States Game
### Out: 2/10/17 | Due: 2/24/17 11:59 PM (Deadline 2/25/17 11:59 PM for 10% reduction)

## Overview
In this project you will implement a game about the 50 states in the US.

The goal of the game is to input all 50 states within a time limit. If the user inputs all the states within the time limit, the user wins. Else, the user loses. Display the names of a state's senators when hovered over.

## Objective
Learn how to use Javascript to interact with the DOM. Practice using AJAX to interact with APIs.

## Grading
This project will use a **feature based** grading system (out of 68 points).

Points are gained by implementing features.

Requirements must be followed and failure to follow them may result in a 0.

## Specifications:

- **[5]** Input field to enter states. Input MUST be case insensitive.
    + **[3]** State should be submitted when full state is typed. No need to hit enter.
- **[10]** Display a continuously updated list of states the user has inputed correctly.
- **[10]** Timer set to 20 seconds displayed prominently and counts down every second. (Note: We know you are going to want to test with more than 20 seconds, but please make sure that it is 20 seconds when you submit. This will make grading easier.)
- When timer ends:
    - **[5]** Disable input field
    - **[10]** Display score (states correct / total states)
    - **[10]** Display which states the user did not get separately
- If user finishes before timer ends:
    - **[5]** Stop timer
    - **[3]** Display "You win!" or some clear indication that the user has won.
- **[15]** If a user hovers over any state name on the screen at any point, you should display the names of the state's senators. You can choose how to display the names, but it should be easily visible.   

## Tips:

Use the **Sunlight Foundation's Congress API** to get senator data.

Documentation for the API can be found here: [Sunlight Foundation API](https://sunlightlabs.github.io/congress/legislators.html)

This URL should help you out:
https://congress.api.sunlightfoundation.com/legislators?state=MD&chamber=senate


## Code Distribution
Clone the project folder located in this directory.

## Submission
Please zip up your `index.html` and `index.js` and submit on the [submit server](submit.cs.umd.edu).
