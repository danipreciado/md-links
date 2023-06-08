
const { 
  absolutePath, 
  resolvePath,
  pathExists,
  findFilesInDir, 
  isDir, 
  readFile, 
  findLinksInContent, 
  validateLink } = require('./functions.js')

/* const userPath = process.argv[2];
const extension = process.argv[3];
 */

function mdLinks(userPath, options = { validate: false }) {
  return new Promise((resolve, reject) => {
    
  const resolvedUserPath = absolutePath(userPath) ? userPath : resolvePath(userPath);
  
  return pathExists(resolvedUserPath)
  .then((exists) => {
    if (!exists) {
      throw new Error('Path does not exist');
    }
    return isDir(resolvedUserPath);
  })
  .then((isDirectory) => {
    if (isDirectory) {
      return findFilesInDir(resolvedUserPath);
    } else {
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
              .catch((error) => {
                return (console.error('Error message: ', error)) //i need to review this
              });
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
    
    const flattenedLinks = results.flat(); // It was giving me multiple arrays, this converts it into a single array, multiple objs
    
    if (flattenedLinks.length === 0) {
      console.error(` \u{1F641} No links found in the specified files or file.\u{1F62D}` );
    } else {
      resolve(flattenedLinks)
    }
  })
  .catch((err) => {
    reject(err);
  });
 })
}

/* mdLinks(userPath, options = { validate: true})
 */
module.exports = mdLinks;