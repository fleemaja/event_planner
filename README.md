# Event Planner

Event Planner is a mobile-first web app that allows authenticated users to create events.

Live site: [https://morning-reaches-98323.herokuapp.com/](https://morning-reaches-98323.herokuapp.com/)

![event planner app](http://res.cloudinary.com/dkw0kkkgd/image/upload/v1475187137/events_wd9oq6.png)


### Local Setup
***

Clone this repo to your local machine by running `git clone https://github.com/fleemaja/event_planner.git` in the terminal.
Navigate to the project root and do the following:

##### 1. Environmental variables
  * Create a file called `.env` on the project root.
  * add a variable to the file called SUPER_SECRET and set it to any string you want e.g. `SUPER_SECRET=super-super-super-secret-string`

##### 2. node modules/dependencies
  * run `npm install` to create the necessary node_modules to run the app

##### 3. mongodb database
  * install mongodb on your local machine if it is not already installed
  * run `mkdir data` in the terminal on the project root
  * start mongodb by running the mongod script on the project root: `./mongod`

##### 4. gulp build process
  * open a new terminal tab/window
  * install the gulp command line interface with `sudo npm install --global gulp-cli`
  * run `gulp`

##### 5. start the server
  * open a new terminal tab/window
  * run `node server.js`
  * open `http://localhost:8080/` in a browser to use the web app