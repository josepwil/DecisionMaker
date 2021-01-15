Decision Maker
=========
Decision Maker is a Full Stack application that helps users make decisions. Built using HTML, CSS, JS, jQuery and AJAX on the front-end, with Node/Express and Postgres on the back-end.

## Final Product

Home page (SPA) showing all polls created using the application:
!["Home Page"](https://github.com/josepwil/DecisionMaker/blob/master/screenshots/homepage.png?raw=true)

Results for specific poll rendered as a graph using canvas.js, option on hover also shows where each voter ranked it:
!["Specific Vote Page"](https://github.com/josepwil/DecisionMaker/blob/master/screenshots/specificresult.png?raw=true)

Form to create a new poll:
!["New Poll Form"](https://github.com/josepwil/DecisionMaker/blob/master/screenshots/newpollform.png?raw=true)

Email send using mailgun api notifying creator their new poll was created (They also receive one when someone votes):
!["Email Confirmation"](https://github.com/josepwil/DecisionMaker/blob/master/screenshots/emailconfirmation.png?raw=true)

Voting screen where voters can click and drag options into their preferred order using sortable.js:
!["Voting Screen"](https://github.com/josepwil/DecisionMaker/blob/master/screenshots/voteform.png?raw=true)


## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information 
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Reset database: `npm run db:reset`
  - Check the db folder to see what gets created and seeded in the SDB
7. Run the server: `npm run local`
  - Note: nodemon is used, so you should not have to restart your server
8. Visit `http://localhost:8080/`
9. Start making some decisions!

## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x
- Body-parser
- Chalk
- Dotenv
- ejs
- express
- mailgun-js
- morgan
- node-sass-middleware
- Sortable.js
- Canvas Js

