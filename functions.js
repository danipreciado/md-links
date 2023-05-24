const fs = require('fs')
const path = require('path')

module.exports = function(directory, extension, callback) {

   
    fs.readdir(directory, (err, files) => {
      if (err) {
        return callback(err);
      }
     
      files = files.filter(file => path.extname(file) === extension);
      
      callback(null, files);
    });
  };