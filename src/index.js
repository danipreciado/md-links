
const { 
  absolutePath, 
  resolvePath,
  pathExists,
  findFilesInDir, 
  isDir,
  extMd,
  readFile, 
  findLinksInContent, 
  validateLink } = require('./functions.js')


function mdLinks(userPath, options = { validate: false }) {
  return new Promise((resolve, reject) => {
    
    const resolvedUserPath = absolutePath(userPath) ? userPath : resolvePath(userPath);
  
    pathExists(resolvedUserPath) //reject when !exists
    .then(() =>  isDir(resolvedUserPath))
    .then((isDirectory) => {
      if (isDirectory) {
        return findFilesInDir(resolvedUserPath);
      } else {
        extMd(resolvedUserPath);
        return [resolvedUserPath]; // for single files
      }
    })
    .then((files) => {
      const promises = files.map((file) => {
        return readFile(file).then((content) => {
          const links = findLinksInContent(content, file);
        
        if (options.validate){
          const linkPromises = links.map((link) => {
            return validateLink(link.href)
              .then(({ statusCode, message }) => {
                return { ...link, status:statusCode, message:message};
              })
            })
            
            return Promise.all(linkPromises);
        } else {
          return links; // when validate.false
        }  
      });
    }); 
    return Promise.all(promises);
    })
    .then((results) => {
      const flattenedLinks = results.flat(); //converts it into a single array, multiple objs
      resolve(flattenedLinks.length === 0 ? [] : flattenedLinks)
  })
    .catch((err) => {
      reject(err);
    });
  })
}

module.exports = mdLinks;