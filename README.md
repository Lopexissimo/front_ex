## Description
The goal is visualize and interact with some People data obatined throught an external API.

## Technologies Used
-   React 
-   Material UI for the interface design
-   Axios for handling API requests

# Setup and Running the Project
1-> Clone th erepository:
    `git clone https://github.com/Lopexissimo/front_ex.git`
2-> install dependencies
    `npm install`
3-> start the project locally
    `npm start`
4-> open http://localhost:3000 to see the page

# API Integration
/src/util/Api.js
methods: 
-   Get/users
-   Post/users
-   Put/users/:id
-   Delete/users/:id

# Project implemantation
-   The only way to get a specific person from the API is just by its specific ID, in order to provide a better research also though name and surname, all the users and their information are saved in a state variable at the beginning.
All the actions provided (add, edit, delete and research) acts on the state and the API.
The results are shown thought different pages each with 25 people.

Developed by: Mattia Lopez
Email: mattialopez13@gmail.com