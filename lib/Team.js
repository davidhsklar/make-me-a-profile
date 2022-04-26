const inquirer = require('inquirer');
const Manager = require('./Manager');
const Engineer = require('./Engineer');
const Intern = require('./Intern')

//functions to generate and write HTML file

const generateTeamPage = require('../utils/page-template-generation');
const { writeFile, copyFile} = require("../utils/file-generator");


class Team {
    constructor(){
        this.manager;
        this.engineer;
        this.intern;
        this.teamRoster = [];
        this.userQuestions = [
            {
                type: "input",
                name: "name",
                message: "What is the managers name?",
                validate: (nameInput) => {
                    if (nameInput){
                        return true;
                    } else {
                        console.log("Please enter the managers name!");
                        return false;
                    }
                },
            },
            {
                type: "input",
                name: "id",
                message: " What is the managers ID?",
                validate: (idInput) => {
                    if (idInput){
                        return true;
                    } else {
                    console.log("Please enter the managers ID!");
                    return false;
                    }
                },
                },
            {
                type: "input",
                name: "email",
                message: "what is the managers email?",
                validate: (emailInput) => {
                    if (emailInput) {
                        return true;
                    } else {
                        console.log("Please enter the managers email!");
                        return false;
                    }
                },
            },
                {
                    type: "input",
                    name: "officeNumber",
                    message: "what is the team managers office number?",
                    validate: (officeNumber) => {
                        if (officeNumber){
                            return true;
                        } else {
                            console.log("Please enter an office number!");
                            return false;
                        }
                    }
                  },
                ];

                this.teamQuestions = [
                   
                    {
                        type: "rawlist",
                        name: "employeeType",
                        message: "What is your colleagues job?",
                        choices: ["Engineer", "Intern"],
                        default: "Engineer",
                    },
                    {
                        type: "input",
                        name: "name",
                        message: " What is your colleagues name?",
                        validate: (nameInput) => {
                            if (nameInput){
                                return true;
                            } else {
                                console.log("Please enter a name");
                                return false;
                            }
                        },
                        },
                        {
                            type: "input",
                        name: "id",
                        message: " What is your colleagues ID?",
                        validate: (idInput) => {
                            if (idInput){
                                return true;
                            } else {
                            console.log("Please enter your colleagues ID!");
                            return false;
                            }
                        },
                        },
                    
                        {
                            type: "input",
                            name: "github",
                            message: 'what is the engineers github user name?',
                            when: (answers) => answers.employeeType === "Engineer",
                            validate: (githubInput) => {
                              if (githubInput) {
                                return true;
                              } else {
                                console.log("Please enter the github user name");
                                return false;
                              }
                            },
                          },
                          {
                            type: "input",
                            name: "email",
                            message: "what is your colleagues email?",
                            validate: (emailInput) => {
                                if (emailInput) {
                                    return true;
                                } else {
                                    console.log("Please enter your colleagues email!");
                                    return false;
                                }
                            },
                        },
                          // Intern specific questions
                          {
                            type: "input",
                            name: "school",
                            message: 'what is the name of the interns school?',
                            when: (answers) => answers.employeeType === "Intern",
                          },
                          {
                            type: "input",
                            name: "email",
                            message: "what is the colleagues email?",
                            validate: (emailInput) => {
                                if (emailInput) {
                                    return true;
                                } else {
                                    console.log("Please enter the colleagues email!");
                                    return false;
                                }
                            },
                        },
                          {
                            type: "confirm",
                            name: "addTeamMember",
                            message: "Would you like to enter another member?",
                            default: false,
                          },
                        ];
                      }
                      // this function to get the manager info
                      getManager() {
                        console.log(`
                                      =================
                                      Add Team Manager
                                      =================
                                `);
                    return inquirer.prompt(this.userQuestions).then((manager) =>{
                        const {name, id, email, officeNumber } = manager;
                        return (this.manager = new Manager(name, id, email, officeNumber));
                    });
                 }

                 getTeamMember(team = {}) {
                    console.log(`
                              =================
                              Add New Team Member
                              =================
                        `);
                
                    if (!team.roster) {
                      team.roster= [];
                    }
                
                    return inquirer.prompt(this.teamQuestions).then((teamRoster) => {
                        
                        const { name, id, email, github } = teamRoster;
                      
                        if (teamRoster.employeeType === "Engineer") {
                        this.engineer = new Engineer(name, id, email, github);
                        team.roster.push(this.engineer);
                      } else {
                      
                        let { name, id, email, school } = teamRoster;
                        this.intern = new Intern(name, id, email, school);
                        team.roster.push(this.intern);
                      }
                
                      // check if the user wants to add another employee.
                      if (teamRoster.addTeamMember) {
                        return this.getTeamMember(team);
                      } else {
                        return team;
                      }
                    });
                  }
                startGeneration(){
                    this.getManager()
                    .then((manager) => {
                      this.teamRoster.push(manager);
                      return this.getTeamMember();
                    })
                    .then((team) => {
                      // use the spread operator to add the team members to the array
                      this.teamRoster.push(...team.roster);
                      const teamRoster = this.teamRoster;
                      console.log(this.teamRoster);
                      return teamRoster;
                    })
                    .then((teamRoster) => {
                      return generateTeamPage(teamRoster);
                    })
                    .then((htmlCode) => writeFile(htmlCode))
                    .then((styleCSS) => copyFile(styleCSS));
                }
              };
              
              module.exports = Team;