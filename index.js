//Variables for the project
const { prompt } = require('inquirer');
const figlet = require('figlet');
const db = require('./db');
require('console.table');


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
    //starts the function to as the questions
        start();
    });

//inquirer Prompts about what user wants to do
async function start(){
   
        const { choice }  = await prompt([
            {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: [
                {
                name:'View All Employees',
                value: "View_All"
                },
                {
                name:'View All Employees By Department',
                value: 'View_By_Dept'
                },
                {
                 name: 'View All Employees By Manager',
                 value: 'View_By_Manager'
                },
                {
                name: 'Add Employee',
                value: 'Add_Employee'
                },
                {
                name: 'Remove Employee',
                value: 'Remove_Employee'
                },
                {
                name:'Update Employee Role',
                value: 'Update_Role'
               },     
               {
               name:'Update Employee Manager',
               value:'Update_Manager'
               },   
               {
                name: 'Quit',
                value: 'Quit'
               },
        ]
       
     }, //Getting user response from above
]); 
    switch (choice) {  
            case  'View_All':
               return viewEmployees();
            case 'View_By_Dept':
                allEmployeesDept();
            case 'View_By_Manager':
                allEmployeesMgr();
            case 'Add_Employee':
                addEmployee();
            case 'Remove_Employee':
                removeEmployee();
            case 'Update_Role':
                updateEmployeeRole();
            case 'Update_Manager':
                updateMgr();
            default:
               return quit();
            }
    }

//search for all employees in DB
async function viewEmployees(){
    //using the db class we are runing the query written there and returning the value 'employees'
const employees = await db.allEmployees();

console.log("\n");
console.table(employees);


    start();
}


//display all employees by dept
async function allEmployeesDept(){
    const dept = await db.findAllDepts();

    const deptChoices = dept.mapt(({ id, name}) => ({
        name: name,
        value: id
    }))

    const { deptId } = await prompt([
        {
            type: 'list',
            name: 'deptId',
            message: 'Which department would you like to see employees for?',
            choices: deptChoices
        }
    ]);

    const employees = await db.findEmployeeDept(deptId);

    console.log('\n');
    console.table(employees);
    
    start();
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
function updateMgr(){

};

//ends the application
function quit(){
    console.log('Bye!');
    process.exit();
}
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



