# book_collection

A web application to view and edit a collection of books

## Requirements
A mysql database must be installed and running.
## Installation
 To install, run the following command on the root foler:
 ```
npm install
```
To configure the mysql database, open the .env file and replace the values for DB_HOST, DB_USER and DB_PASS to represent your mysql database setup.
## Deployment

Before running the application for the first time, the database should be initialized. This can be done by running the command:
 ```
npm run database
```
To reset the database, use:
 ```
npm run database reset
```

To run the client and server applications concurrently, run the following command on the root folder:
 ```
npm start
```
Client is run on port 3000 and server on port 4000

## Built with
* Node.js (https://nodejs.org/en/)
* Express (https://expressjs.com/)
* React (https://reactjs.org/)
* Axios (https://github.com/axios/axios)
* npm (https://www.npmjs.com/)
* mysql (https://www.mysql.com/ https://www.npmjs.com/package/mysql)
