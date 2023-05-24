
const mymodule = require('./functions.js')

const folder = process.argv[2];
const ext = process.argv[3];

mymodule(folder, ext, (err, files) => {
  if (err) {
    return console.error(err);
  }

  files.forEach(file => console.log(file));
});

