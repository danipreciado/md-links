const fs = require('fs')
const path = require('path')

const absolutePath = (userPath) => path.isAbsolute(userPath);
const resolvePath = (userPath) => path.resolve(userPath);
const extMd = (userPath) => path.extname(userPath) === '.md';
const isDir = (userPath, callback) => {
  fs.stat(userPath, (err, stats) => {
    if (err) {
      return callback(err);
    }

    if (stats.isDirectory()) {
      
      return callback(null, true);
      
    } else {
      return callback(null, false);
    }
  });
};
function filterFiles(files, extension) {
  return files.filter(file => path.extname(file) === extension);
}

/* function findFilesInDir(directory, extension = '.md', callback) {
 
    fs.readdir(directory, (err, files) => {
      if (err) {
        return callback(err);
      }

      files.forEach(file => {
      
        const filePath = path.join(directory, file);
        
        fs.stat(filePath, (err, stats) => {
          if(stats.isDirectory()) {
            findFilesInDir(filePath, extension, callback)
          }
        })
      
      })
     
      filteredFiles = filterFiles(files, extension);
      
      callback(null, filteredFiles);
    });
  }; */ 
 
  function findFilesInDir(directory, extension = '.md') {
    try {
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
      return filteredFiles;
    } catch (err) {
      throw err;
    }
  }

  function readFile(filePath, callback) {
    
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        return callback(err);
      }
  
      callback(null, data);
    });
  }
  
  function findLinksInContent(content) {
    const linkRegex = /\[([^\]]+)\]\(([^\)]+)\)/g;
    const links = [];
    let match;
  
    while ((match = linkRegex.exec(content)) !== null) {
      const linkText = match[1];
      const linkUrl = match[2];
      links.push({ text: linkText, url: linkUrl });
    }
  
    return links;
  }

module.exports = {
  absolutePath,
  resolvePath, 
  extMd,
  findFilesInDir,
  isDir,
  readFile, 
  findLinksInContent,
};