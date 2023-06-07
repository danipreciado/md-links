#!/usr/bin/env node
const {mdLinks} = require('./src/index.js')

const userPath = process.argv[2];
const validateOption = process.argv[3]; 

if (validateOption){
    mdLinks(userPath, options = { validate: true })
} else {
    mdLinks(userPath)
}; // or pass { validate: false } for not validating
