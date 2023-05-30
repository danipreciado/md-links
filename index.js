
const { absolutePath, resolvePath, findFilesInDir, isDir, readFile, findLinksInContent } = require('./functions.js')

const userPath = process.argv[2];
const extension = process.argv[3];
const resolvedUserPath = absolutePath(userPath) ? userPath : resolvePath(userPath);

isDir(resolvedUserPath)
  .then((isDirectory) => {
    if (isDirectory) {
      return findFilesInDir(resolvedUserPath, extension);
    } else {
      return [resolvedUserPath]; // Treat it as a single file
    }
  })
  .then((files) => {
    const promises = files.map((file) => {
      return readFile(file).then((content) => {
        const links = findLinksInContent(content, file);
        return links;
      });
    });

    return Promise.all(promises);
  })
  .then((results) => {
    const flattenedLinks = results.flat(); // It was giving me multiple arrays, this converts it into a single array, multiple objs
    console.log(flattenedLinks);
  })
  .catch((err) => {
    console.error(err);
  });
