//Variables for the project
const inquirer = require('inquirer');
//const consoleTable = require('consle.table');
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
    //console.log('connected as id ' + connection.threadId);
    //run the start function after the connection is made to prompt the user
    init();
    start();
   
});

// function to run figlet before inquirer 
const init = () =>
     figlet.text('Employee', {
        font: 'epic',
        horizontalLayout: 'default',
        verticalLayout: 'default'
    }, function(err, data){
        if (err){
            console.log('Something went wrong...');
            console.dir(err);
            return;
        };
        console.log(data);
    });
    figlet.text('Tracker', {
        font: 'epic',
        horizontalLayout: 'default',
        verticalLayout: 'default'
    }, function(err, data){
        if (err){
            console.log('Something went wrong...');
            console.dir(err);
            return;
        };
        console.log(data);
        
    });
//inquirer Prompts about what user wants to do
function start(){
   
  inquirer
        .prompt([{
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: ['View All Employees', new inquirer.Separator(),'View All Employees By Department', new inquirer.Separator(),'View All Employees By Manager', new inquirer.Separator(), 
                    'Add Employee', new inquirer.Separator(),'Remove Employee',new inquirer.Separator(),'Update Employee Role', new inquirer.Separator(), 'Update Employee Manager',new inquirer.Separator()]

            },
        ]).then(answers => {  //Getting user response from above
            if ( answers.choice === 'View All Employees'){
                allEmployees();
            }
            else if(answers.choice === 'View All Employees By Department'){
                allEmployeesDept();
            }
            else if(answers.choice === 'View All Employees By Manager'){
                allEmployeesMgr();
            }
            else if(answers.choice === 'Add Employee'){
                addEmployee();
            }
            else if(answers.choice === 'Remove Employee'){
                removeEmployee();
            }
            else if(answers.choice === 'Update Employee Role'){
                updateEmployeeRole();
            }
            else if(answers.choice === 'Update Employee Manager'){
                updateEmployeeMgr();
            }
    });
}

//search for all employees in DB
function allEmployees(){
    connection.query('SELECT * FROM employee', function(err, res){
        if (err) throw err;
console.table(res);
       connection.end();
        });
    start();
}


//display all employees by dept
function allEmployeesDept(){

};

//display all employees by manager
function allEmployeesMgr(){

};

//Add an employee
function addEmployee(){
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'firstName',
                message: "Employee's First name:"
                
            },
            {
                type: 'input',
                name: 'lastName',
                message: "Employee's Last name:"
            },
            {
                type: 'list',
                name: 'role',
                message: "Employees Role",
                choices: ['Human Resources', 'Engineer', 'Project Manager']
            },
            {
                type:'choice',
                name: 'manager',
                message: "Who is the employee's Manager:",
                choices: ['Spencer', 'Mady', 'Connor']
            },
            {
                type:'input',
                name: 'id',
                message: 'Enter employee id number'
            }
        ]).then(res => {
            console.log(res);
            connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('firstName', 'lastName', 'role', 'manager') " , function(err, res){
                if (err) throw err;

            });
        });
   

};

//Delete an employee
function removeEmployee(){
    //get the list of current employees
    connection.query('SELECT first_name, last_name FROM employee', function(err,res){
        if (err) throw err;
        Object.keys(res).forEach(function(key){
            var row = res[key];
            // console.log(row.first_name);
    
    //passing the MySQL query list of employees to inquirer so you can chose
    inquirer
        .prompt([
            {
                type:'list',
                message: 'Which Employee would you like to remove',
                choices: row.first_name,
                name: 'removeEmployee'
                
            }
        ])
    });
        
})
};

//Update Employee Role
function updateEmployeeRole(){

};

//update Employee Manager
function updateEmployeeMgr(){

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



