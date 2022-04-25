const Employee = require("./Employee");

class Engineer extends Employee{
    constructor(
        name = "",
        id = 0,
        email = '',
        github = ""
        ){
        super(name, id, email);
        this.role = {roleType: 'Engineer', icon: 'fas fa-glasses'};
        this.github = github;
    }

    getGithub() {
        return this.github;
    }

    getRole() {
        return super.getRole(this.role);
    }


}

module.exports = Engineer;