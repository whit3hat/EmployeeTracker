//call the connection file created to start the communcation with the db
const connection = require('./connection');

/*Classes for the calls needed for the index file, this will leave all the queries
we need into one file and decluter the index.js file.*/

class DB {
    //call to use the connection file
    constructor(connection){
        this.connection = connection;
    }

    //Find all employees, join with all info. Roles, depts, salaires and managers
    allEmployees(){
        return this.connection.query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONACT(manager.first_name,'',manager.last_name) AS manager FROM employee LEFT JOIN role on employee.rold_id=role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee maanger on manager.id = employee.manager.id;"
        );
    };

};