# vitae
I began this project in the summer of 2020 to attempt to write a fully functional full-stack application, using exlusively Javascript packages. 
The ongoing result is an application that puts a spin on the classic React example of the todo list, designed to mitigate some of the pain and trepidation around creating a CV.

While I created this project to help sharpen and demonstrate my abilities with React, and learn my way around Express, there are many features I would like to implement as the
project continues to grow, mutate, and hopefully become fully sentient.

Currently, the App uses a MySQL database to store information sent and received by an Express server API. This API works with the React front end to handle basic CRUD functionality.

I also used this project as the basis for teaching collaboration and some new full-stack technologies for early software development students at the Manitoba Institute of Trades and Technologies. The relevant document can be found here: https://docs.google.com/document/d/1ICm_q8bAzRQ0m7emc30jKNuHY_fzIaG-cXZ9kLFy8M0/edit?usp=sharing


## Planned Features
- Refactor of client to employ Hooks
- Individual user accounts and authentication
- Deployment to a cloud service


## Installation and Use
After downloading and installing packages, connect to your MySQL database with a new API/.env file with the following format:

HOST=
USER=
PASSWORD=
DATABASE=

`npm run` both the API and Client projects, and if necessary, update the API link in `client/src/App.js`.
