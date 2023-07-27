const inquirer = require('inquirer');
const fs = require('fs');

const questions = [
  {
    type: 'input',
    name: 'projectName',
    message: "What is the project's name?",
  },
  {
    type: 'input',
    name: 'description',
    message: 'Description of this project:',
  },
  {
    type: 'input',
    name: 'installation',
    message: 'How to install this project?',
  },
  {
    type: 'input',
    name: 'usage',
    message: 'Intended use of this project?',
  },
  {
    type: 'input',
    name: 'contributing',
    message: 'Are there any guidelines for contribution of this project?',
  },
  {
    type: 'input',
    name: 'tests',
    message: 'How should testing be completed for this project?',
  },
  {
    type: 'list',
    name: 'license',
    message: 'What licence?',
    choices: ['MIT', 'Apache', 'GNU', 'BSD', 'None'],
  },
  {
    type: 'input',
    name: 'githubUsername',
    message: 'GitHub username?',
  },
  {
    type: 'input',
    name: 'email',
    message: 'Email address?',
  },
  {
    type: 'input',
    name: 'screenshot',
    message: 'Add the image file path to include a screenshot',
  },
];

function generateReadmeContent(answers) {
  let licenseBadge = '';
  let licenseNotice = '';
  if (answers.license !== 'None') {
    licenseBadge = `![License](https://img.shields.io/badge/license-${answers.license}-blue.svg)`;
    licenseNotice = `This application is covered under the ${answers.license} license.`;
  }

  let screenshotSection = '';
  if (answers.screenshot) {
    screenshotSection = `
`;
  }

  return `
# ${answers.projectName}

## Description
${answers.description}

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Tests](#tests)
- [License](#license)
- [Questions](#questions)
${screenshotSection}

## Installation
${answers.installation}

## Usage
${answers.usage}

## Contributing
${answers.contributing}

## Tests
${answers.tests}

## License
${licenseBadge}
${licenseNotice}

## Screenshots
![Screenshot](./${answers.screenshot})

## For Questions contact:
GitHub: [${answers.githubUsername}](https://github.com/${answers.githubUsername})
Email: ${answers.email}
`;
}

function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, (err) => {
    if (err) {
      console.error('Error writing README.md:', err);
    } else {
      console.log('README.md file created');
    }
  });
}

function init() {
  inquirer
    .prompt(questions)
    .then((answers) => {
      const readmeContent = generateReadmeContent(answers);
      writeToFile('README.md', readmeContent);
    })
    .catch((error) => {
      console.error('Error occurred:', error);
    });
}

init();
