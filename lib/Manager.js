const Employee = require("./Employee");

class Manager extends Employee{
    constructor(         name = "",
                         id = 0,
                         email = '',
                         officeNumber = 0
                         ){
        super(name, id, email);
        this.officeNumber = officeNumber;
        this.role = {roleType: 'Manager'};
    }

    getRole() {
        return super.getRole(this.role);
    }
}

module.exports = Manager;