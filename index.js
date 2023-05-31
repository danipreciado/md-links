
const { 
  absolutePath, 
  resolvePath, 
  findFilesInDir, 
  isDir, 
  readFile, 
  findLinksInContent, 
  validateLink } = require('./functions.js')

const userPath = process.argv[2];
const extension = process.argv[3];

function mdlinks(path, options = { validate: false }) {
  
  const resolvedUserPath = absolutePath(userPath) ? userPath : resolvePath(userPath);

  isDir(resolvedUserPath)
  .then((isDirectory) => {
    if (isDirectory) {
      return findFilesInDir(resolvedUserPath, extension);
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
              .then((statusCode) => {
                return { ...link, statusCode};
              })
              .catch((error) => {
                return { ...link, statusCode: -1, error: error.message };
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
    const modifiedLinks = flattenedLinks.map((link) => {
      return {
        href: link.href,
        text: link.text,
        file: link.file,
        status: link.statusCode,
      };
    });
    console.log(modifiedLinks);
  })
  .catch((err) => {
    console.error(err);
  });

}

mdlinks(userPath, options = { validate: true})