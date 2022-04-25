const Employee = require("./Employee");

class Intern extends Employee{
    constructor(
        name = "",
        id = 0,
        email = '',
        school = '',
    ){
        super(name, id, email);
        this.role = {roleType: 'Intern', icon: 'fas fa-user-graduate'};
        this.school = school;
    }

    getSchool() {
        return this.school;
    }

    getRole() {
        return super.getRole(this.role);
    }
}

module.exports = Intern;