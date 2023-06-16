const fs = require('fs');
const path = require('path');
const https = require('https');


const absolutePath = (userPath) => path.isAbsolute(userPath);

const resolvePath = (userPath) => path.resolve(userPath);

function pathExists(path) {
  return new Promise((resolve, reject) => { //add reject
    fs.access(path, fs.constants.F_OK, (err) => {
      if (err){
        reject('Path does not exist')
      }
      resolve(true);
    });
  });
}
const extMd = (userPath) => {
  if (path.extname(userPath) !== '.md') {
    throw new Error('Invalid file format. Only .md files are supported.');
  }
  return true;
};

function isDir(userPath) {
  return new Promise((resolve, reject) => {
    fs.stat(userPath, (err, stats) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(stats.isDirectory());
    });
  });
}

function findFilesInDir(directory, extension = '.md') {
    const files = fs.readdirSync(directory);
    let filteredFiles = [];
  
    files.forEach(file => {
      const filePath = path.join(directory, file);
      const stats = fs.statSync(filePath);
  
      if (stats.isDirectory()) {
        const subDirectoryFiles = findFilesInDir(filePath, extension);
        filteredFiles = filteredFiles.concat(subDirectoryFiles);
      } else if (path.extname(file) === extension) {
          filteredFiles.push(filePath);
      }
      
    });
  
    if (filteredFiles.length === 0){
      throw new Error('No .md files found');
    }
  return filteredFiles;
}

function readFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
        return;
      }
  
      resolve(data);
    });
  });
}
  
  function findLinksInContent(content, filePath) {
    const linkRegex = /\[([^\]]+)\]\((?!#)(https?:\/\/[^\)]+)\)/g; //regular expression first matches [text] & then (text) except if it starts with #
    const links = [];
    let match;
  
    while ((match = linkRegex.exec(content)) !== null) {
      const linkText = match[1];
      const linkUrl = match[2];
      links.push({ href: linkUrl, text: linkText, file: filePath  });
    }
    
    return links;
  }

  function validateLink(url) {
    return new Promise((resolve, reject) => {
      https.get(url, (res) => { 
        const { statusCode } = res;
        let message;
  
        if (statusCode >= 400 ) {
          message = 'fail';
        } else {
          message = 'ok';
        }
  
        resolve({ statusCode, message });
      }).on('error', (err) => {
        
        if (err.code === 'ENOTFOUND') {
          
          resolve({ statusCode: 404, message: 'fail' });
        } 
      }).on('close', () => {
        resolve({ statusCode: 0, message: 'connection_issue' });
      })
    });
  }
  

module.exports = {
  absolutePath,
  resolvePath, 
  pathExists,
  extMd,
  findFilesInDir,
  isDir,
  readFile, 
  findLinksInContent,
  validateLink,
};

