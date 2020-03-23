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
            "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
            );
    }

    //find all managers
    findAllMgrs(employeeId){
        return this.connection.query(
            "SELECT id, first_name, last_name FROM employee WHERE id != ?",
            employeeId
        );
    }

    //create new employee
    createEmployee(employee){
        return this.connection.query("INSERT INTO employee SET ?", employee);
    }

    //remove employee with id
    removeEmployee(employeeId){
        return this.connection.query(
            "DELETE FROM employee WHERE id = ?",
            employeeId
        );
    }

    //Update the employee role
    updateEmployeeRole(employeeId, roleId) {
        return this.connection.query(
            "UPDATE employee SET role_id = ? WHERE id = ?",
            [roleId, employeeId]
        );
    }

    //update employees manager
    updateEmployeeManager(){
        return this.connection.query(
            "UPDATE employee SET manager_id = ? WHERE id = ?",
            [managerId, employeeId]
        );
    }

    //find all roles, join with dept to display the dept name
    findAllRole(){
        return this.connection.query(
            "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;"
        );
    }

    //create role
    createRole(role) {
        return this.connection.query("INSERT INTO role SET ?", role);
    }

    //remove role
    removeRole(roleId) {
        return this.connection.query("DELETE FROM role WHERE id = ?", roleId);
    }

    //find all dept join with employee and role and sum up utilized dept budget
    findAllDepts(){
        return this.connection.query(
            "SELECT department.id, department.name, SUM(role.salary) AS utilized_budget FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id GROUP BY department.id, department.name;"
        );
    }
    //create dept
    createDept(department){
        return this.connection.query("INSERT INTO department SET ?", department);
    }

    //remove dept
    removeDept(departmentId){
        return this.connection.query(
            "DELETE FROM department WHERE id = ?", departmentId
        );
    }

    //find all employees in given dept, join w/ roles display role titles
    findEmployeeDept(departmentId) {
        return this.connection.query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department department on role.department_id = department.id WHERE department.id = ?;",
            departmentId
        );
    }

    //find all employees by manager, join w/ depts and roles to display titles and dept name
    findEmployeeMgr(managerId) {
        return this.connection.query(
            "SELECT employee.id, employee.first_name, employee.last_name, department.name AS department, role.title FROM employee LEFT JOIN role on role.id = employee.role_id LEFT JOIN department ON department.id = role.department_id WHERE manager_id = ?;",
            managerId
        );
    }
}

module.exports = new DB(connection);
