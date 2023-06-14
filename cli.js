#!/usr/bin/env node
const mdLinks = require('./src/index.js')
const chalk = require('chalk');
const { simpleStats, complexStats } = require('./src/stats.js')
const CFonts = require('cfonts');

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
 

const usage = chalk.bold('Usage:') + ' md-links <path> [--validate] [--stats]';
const options = [
  chalk.bold('Options:'),
  chalk.bold('--validate') + '  Validates the status of each link',
  chalk.bold('--stats') + '  Displays basic statistics of the links'
];

const separator = "---------------------------------------------------------------------------------------------------"

const description = '\nThis is a CLI tool for extracting and analyzing links from Markdown files. It allows you to retrieve all the links contained in a given directory or file, and provides options for validating the status of each link and generating statistics about the links.\n';


if (!userPath) {
 
  CFonts.say('md-links', {
    font: 'block',
    align: 'center',
    colors: ['cyan'],
    gradient: ['red', 'blue'],
  });
  console.log(separator);
  console.log(description);
  console.log(separator);
  console.log(usage);
  options.forEach(option => {
    console.log(option);
  })
} else {

  if (validateOption && statsOption) {
    mdLinks(userPath, { validate: true })
      .then((links) => {
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
            console.log(chalk.bold('Status:'), link.status);
            console.log(chalk.bold('Message:'), link.message , getMessageIcon(link.message) );
            console.log(chalk.gray(separator));
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
  } else if (!option1 && !option2){
    mdLinks(userPath)
      .then((links) => {
        console.log(links);
      })
      .catch((error) => {
        console.error(error);
      });
  } else {
    console.log('⚠️  Invalid option. Please provide either --stats or --validate.');
  }

}



//appearance functions
  
  function getMessageIcon(message) {
    if (message === 'ok') {
      return '✅';
    } else if (message === 'fail') {
      return '❌';
    } else {
      return '⚪';
    }
  }