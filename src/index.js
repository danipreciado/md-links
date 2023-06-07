
const { 
  absolutePath, 
  resolvePath, 
  findFilesInDir, 
  isDir, 
  readFile, 
  findLinksInContent, 
  validateLink } = require('./functions.js')

/* const userPath = process.argv[2];
const extension = process.argv[3];
 */

function mdLinks(userPath, options = { validate: false }) {
  
  const resolvedUserPath = absolutePath(userPath) ? userPath : resolvePath(userPath);
  console.log(resolvedUserPath)

  isDir(resolvedUserPath)
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
              .then(({ statusCode, statusMessage }) => {
                
                return { ...link, status:statusCode, message:statusMessage};
              })
              .catch((error) => {
                return { ...link, statusCode: 404, error: error.message }; //i need to review this
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
      console.error("No links found in the specified files or file.");
    } else {
      console.log(flattenedLinks)
    }
  })
  .catch((err) => {
    console.error(err);
  });

}

/* mdLinks(userPath, options = { validate: true})
 */
module.exports = { mdLinks };