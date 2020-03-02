//Variables for the project
const inquire = require('inquirer');
// const consoleTable = require('consle.table');
// const figlet = require('figlet');
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
    console.log('connected as id ' + connection.threadId);
    //run the start function after the connection is made to prompt the user
  
});

function query(connection, sql, where=[]){
    if (!sql || !sql.length) throw new Error('Sql cannot be empty');

    return new Promise((resolve, reject) =>{
        connection.query(sql, where, function(err, res){
            if (err) return reject(err);
            return resolve(res);
        });
    });
        };



//inquirer Prompts about what user wants to do
  inquire
        .prompt([
            {
                type: 'list',
                name: 'choice',
                message: 'What would you like to do?',
                choices: ['View All Employees', new inquirer.Separator(),'View All Employees By Department', new inquirer.Separator(),'View All Employees By Manager', new inquirer.Separator(), 
                        'Add Employee', new inquirer.Separator(),'Remove Employee',new inquirer.Separator(),'Update Employee Role', new inquirer.Separator(), 'Update Employee Manager']

            },
        ]).then(answers => {
            console.log('Choice: ' , answers.choice);
            switch (answers.choice) {
                case ' ';
                inquire.prompt([
                    {
                        type: 'input',
                        name: '',
                        messsage: ''
                    },
                ]).then()
                break;
    
            }
        })
            

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



