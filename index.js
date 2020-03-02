//Variables for the project
const inquire = require('inquirer');
const consoleTable = require('consle.table');
const figlet = require('figlet');
const mysql = require('mysql');

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
    //run the start function after the connection is made to prompt the user
    start();
});

//inquirer Prompts about what user wants to do
function start(){
    connection.query('SELECT * FROM employee' , function(err, employee){
        if (err) throw err;
        
        inquire
            .prompt([
                {
                    name: 'employee',
                    type: 'rawlist',
                    choices: function(){
                        var employeeArray =[];
                        for (var i=0; i < results.length; i++){
                            employeeArray.push(results[i].item_name);
                        }
                        return employeeArray;
                    },
                }
            ])
    })

        function emplyeeSearch(){
            inquire
                .prompt([
                    {
                        name: 'department',
                        type: 'input',
                        message: 'Which department?'
                    }
                ])
                .then(function(answer){
                    connection.query("SELECT * FROM companyinfo_db.department WHERE ?", {
                        department: answer.department
                    }, (err, res) =>{
                        if (err) {
                            renderError(err);
                        } else {
                            renderResponse(res);
                        }
                    })
                    start();
                });
        };

};



//=====================================
//===========Objectives================
//add departments
//add roles
//add employees
//update employee roles

//BONUS
//update employee mnagers
//view employees by manager
//delete departs, roles, and employees
//view total utilized budget of a department -- ie the combined salaries



