
const { absolutePath, resolvePath, extMd, findFilesInDir, isDir, readFile, findLinksInContent } = require('./functions.js')
const path = require('path');

const userPath = process.argv[2];
const extension = process.argv[3];
const resolvedUserPath = absolutePath(userPath) ? userPath : resolvePath(userPath);

isDir(resolvedUserPath)
  .then((isDirectory) => {
    if (isDirectory) {
      return findFilesInDir(resolvedUserPath, extension);
    } else {
      throw new Error('The specified path is not a directory.');
    }
  })
  .then((files) => {
    console.log(files);
  })
  .catch


/* 
isDir(resolvedUserPath, (err, isDirectory) => {
  if (err) {
    console.error(err);
    return;
  }

  if (isDirectory) {
    findFilesInDir(resolvedUserPath, ext  => {
   
      files.forEach(file => {
        
        
        readFile(file, (err, content) => {
          if (err) {
            console.error(err);
            return;
          }
          console.log(content);
          });
      }); 
    });
  } else {
    if (extMd(resolvedUserPath)){
      console.log('file is md')
    } else {
      console.log('file is not md')
    }
  }
}); */