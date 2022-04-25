const generateTeamCard = (member) => {
    if (!member) {
        return `<div> No Member</div>`
    }
    // destructure the team member info
    const { name, id, email, role } = member

    // this will be used to create any extra attributes on default employee
    let extraAttr = '';

    // check to see what the extra attribute is for each member
    if (member.officeNumber) {
        extraAttr = `
            <li class="list-group-item">
                Office Number: ${member.officeNumber}
            </li>
            `
    } else if (member.github) {
        extraAttr = `
                    <li class="list-group-item">
                    Github: 
                        <a target="_blank"
                            href="https://github.com/${member.github}" 
                            class="card-link">github: ${member.github}</a>
                    </li>
                    `
    } else if (member.school) {
        // console.log(member.school)
        extraAttr = `
                    <li class="list-group-item">
                       School:<a class="card-link"> ${member.school} </a>
                    </li>
                    `
    }


    return `
    <div id="cards" class="card" style="width: 18rem;">
      <div class="card-body bg-primary">
        <h5 class="card-title text-light">${name}</h5>
        <h6 class="card-title text-light">
            <i class="${role.icon}"></i>
            ${role.roleType}
        </h6>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">Employee ID: ${id}</li>
        <li class="list-group-item">
            Email: <a href="mailto:${email}" class="card-link">${email}</a>
        </li>
        ${extraAttr}
      </ul>
    </div>
    `
}

const generateTeamCards = (team) => {
    return team.map(member =>
        generateTeamCard(member)
    )
        .join("")
}

const generateTeamPage = (team) => {
    if (!team) {
        return ' '
    } else {
        return `
        <!DOCTYPE html>
        <html lang="en">
      
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="ie=edge">
          <title>My Team List</title>
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css">
          <link href="https://fonts.googleapis.com/css?family=Public+Sans:300i,300,500&display=swap" rel="stylesheet">
          <link rel="stylesheet" href="style.css">
        </head>
        
        <body>
      <header class="bg-primary">
        <h1 class="text-light">My Team</h1>
      </header>
      <main class="container my-5 d-flex justify-content-center">
        ${generateTeamCards(team)}
      </main>
    </body>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
    </html>
    `
    }

}

module.exports = generateTeamPage;