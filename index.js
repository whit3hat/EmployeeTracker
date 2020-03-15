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
//ask the user which dept they want to find the employees for
    const { deptId } = await prompt([
        {
            type: 'list',
            name: 'deptId',
            message: 'Which department would you like to see employees for?',
            choices: deptChoices
        }
    ]);

    const employees = await db.findEmployeeDept(deptId);
//Display the employees in the table
    console.log('\n');
    console.table(employees);
//Start the questions over again 
    start();
};

//display all employees by manager
async function allEmployeesMgr(){
    const managers = await db.allEmployees();

    const mgrChoices = managers.map(({ id, first_name, last_name}) => ({
        name:  `${first_name} ${last_name}`,
        value: id
    }));
//Ask which manager they want
    const { mgrId } = await prompt([
        {
            type: 'list',
            name: 'mgrId',
            message: 'Which employee do you want to see the direct reports for?',
            choices: mgrChoices
        }
    ]);
//Search for the managers the return if they have the employees or not
    const employees = await db.findAllMgrs(mgrId);

    console.log('\n');

    if (employees.length === 0) {
        console.log('The selectd employee has no direct reports');
    } else {
        console.table(employees);
    }
//Run the application again for a new choice
    start();
};

//Add an employee
async function addEmployee(){

//Create the variables for roles and employee
    const roles = await db.findAllRole();
    const employees = await db.allEmployees();
//Get the employee basic information (first name and last name)
    const employee = await
        prompt([
            {
                type: 'input',
                name: 'firstName',
                message: "Whats the employees first name?"
                
            },
            {
                type: 'input',
                name: 'lastName',
                message: "Whats the employees last name?"
            }
        ]);
//Get the list of roles
        const roleChoice = roles.map(({ id, title }) => ({
            name: title,
            value: id
        }));
//Ask which role from the call above 
        const { roleId } = await prompt({
            type: 'list',
            name: 'roleId',
            message: 'What is the employees role?',
            choices: roleChoice
        });
           employee.role_id = roleId;
//Do the query into the db to get the managers list
        const mgrChoice = employees.map(({ id, first_name, last_name}) => ({
            name:  `${first_name} ${last_name}`,
            value: id
        }));

        mgrChoice.unshift({ name: 'None', value: null });
//Ask them which manager will be above the client
        const { mgrId } = await prompt({
            type: 'list',
            name: 'mgrId',
            message: "Who is the employee's manager?",
            choices: mgrChoice
        });

         employee.manager_id = mgrId;

         await db.createEmployee(employee);
//Adde the employee to the db, then let the user know the import is completed
         console.log(
                `Added ${employee.first_name} ${employee.last_name} to the database`
         );
//run the application again to ask what is next
         start();
   };

//Delete an employee
async function removeEmployee(){
    const employees = await db.allEmployees();
// run the function to get all employees then filter out for id, first name and last name
    const employeeChoice = employees.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id
    }));
//show the employee list from above and ask which you want to remove
    const { employeeId } = await prompt([
        {
            type: 'list',
            name: 'employeeId',
            message: 'Which employee do you want to fire?',
            choices: employeeChoice
        }
    ]);
//run the remove function from the db folder and pass the employee id to it
    await db.removeEmployee(employeeId);
//return that the employee has been removed
    console.log('Fired employee from the company');
//run the application again
    start();
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



