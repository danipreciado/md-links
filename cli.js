#!/usr/bin/env node
const mdLinks = require('./src/index.js')
const chalk = require('chalk');
const { simpleStats, complexStats } = require('./src/stats.js')
//if process.argv[2] || process.argv[3] === '--validate' create const validateOption = true
//if process.argv[2] || process.argv[3] === '--stats' create const statsOption = true

//if validateOption --> mdLinks(userPath, options = { validate: true })
//if !validateOption --> mdLinks(userPath)
//if validateOption && statsOption --> mdLinks(userPath, options = { validate: true }) && complexStats(resolvedPromise)
//if statsOption --> mdLinks(userPath) simpleStats(resolvedPromise)
const userPath = process.argv[2];
const option1 = process.argv[3];
const option2 = process.argv[4];
//checks either option
const validateOption = option1 === '--validate' || option2 === '--validate';
const statsOption = option1 === '--stats' || option2 === '--stats';

if (validateOption && statsOption) {
    mdLinks(userPath, { validate: true })
      .then((links) => {
        console.log(links);
        console.log(complexStats(links));
      })
      .catch((error) => {
        console.error(error);
      });
  } else if (validateOption) {
    mdLinks(userPath, { validate: true })
    .then((links) => {
        links.forEach((link) => {
          
            console.log(chalk.bgBlue.bold('URL:'), chalk.blue(link.href));
            console.log(chalk.bold('Text:'), chalk.green(link.text));
            console.log(chalk.bold('File:'), chalk.yellow(link.file));
            console.log(chalk.bold('Status:'), getStatusIcon(link.status), link.status);
            console.log(chalk.bold('Message:'), getMessageIcon(link.message), link.message);
            console.log(chalk.gray('-----------------------------------'));
        });
      })
      .catch((error) => {
        console.error(error);
      });
  } else if (statsOption) {
    mdLinks(userPath)
      .then((links) => {
        console.log(simpleStats(links));
      })
      .catch((error) => {
        console.error(error);
      });
  } else {
    mdLinks(userPath)
      .then((links) => {
        console.log(links);
      })
      .catch((error) => {
        console.error(error);
      });
  }


//appearance functions
function getStatusIcon(status) {
    if (status >= 200 && status < 300) {
      return '✔️';
    } else if (status >= 400 && status < 500) {
      return '⚠️';
    } else if (status >= 500) {
      return '❌';
    } else {
      return '⚪';
    }
  }
  
  function getMessageIcon(message) {
    if (message === 'ok') {
      return '✅';
    } else if (message === 'fail') {
      return '❌';
    } else {
      return '⚪';
    }
  }