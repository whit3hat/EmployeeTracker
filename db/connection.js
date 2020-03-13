const mysql = require('mysql');
const util = require('util');

//mysql connection
var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "Madylin3!",
    database: "companyinfo_db"
  });


//connect to the mysql server and sql DB
connection.connect(function(err) {
    if (err) throw err;
    //console.log('connected as id ' + connection.threadId);
   
});

//use to allow for async/await options
connection.query = util.promisify(connection.query);

module.expoerts = connection;
