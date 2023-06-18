const pgp = require('pg-promise')();
const path = require('path');
const fs = require('fs');

// Connection parameters
const host = 'dpg-ci7f8lenqql0ldbdt070-a';
const port = '5432';
const database = 'srishti_database';
const user = 'srishti_database_user';
const password = 'Db6wKof7pq0kXcvTJt27Ko5AMhZoGV8a';

// Create a connection string
const connectionString = `postgres://${user}:${password}@${host}:${port}/${database}`;

// Create a connection instance
const db = pgp(connectionString);

// Define an SQL query to fetch the data from the database
const sql = 'SELECT * FROM your_table';

// Execute the query and process the retrieved data
db.any(sql)
  .then(data => {
    // Convert the data to JSON
    const jsonData = JSON.stringify(data, null, 2);

    // Write the JSON data to a file
    fs.writeFile('output.json', jsonData, err => {
      if (err) {
        console.error('Error writing JSON file:', err);
      } else {
        console.log('JSON file generated successfully.');
      }
    });
  })
  .catch(error => {
    console.error('Error executing SQL query:', error);
  });

const jsonServer = require("json-server"); // importing json-server library
const server = jsonServer.create();
const router1 = jsonServer.router("db.json");
const router2 = jsonServer.router("intents.json");
const middlewares = jsonServer.defaults();
const port1 = process.env.PORT || 8080; //  chose port from here like 8080, 3001

server.use(middlewares);
server.use("/data", router1);
server.use("/intent", router2);

server.listen(port1);