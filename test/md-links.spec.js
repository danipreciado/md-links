const mdLinks = require('../src/index.js');
const path = require('path');

const currentDirectory = __dirname;
const projectDirectory = path.resolve(currentDirectory, '..');
const readme2Path = path.join(projectDirectory, 'demo', 'readme2.md');
const realResult = [
  {
    href: 'https://es.wikipedia.org/wiki/Markdown',
    text: 'Markdown',
    file: readme2Path,
  },
  {
    href: 'https://es.wikipedia.org/wika',
    text: 'brokenlinklol',
    file: readme2Path,
  }
];
describe('mdLinks', () => {
 
    it('should be a function', () => {
      expect(typeof mdLinks).toBe('function');
    });

    it('should return an error when path does not exist', () => {
      const userPath = './demo/readme3.md';
      return expect(mdLinks(userPath)).rejects.toEqual('Path does not exist');
    });

    it('should process a single file', () => {
      
      
      const userPath = './demo/readme2.md';
  
      return mdLinks(userPath)
        .then((result) => {
          expect(result).toEqual(realResult);
          
        });
      });
    
    it('should handle a non-existent file', () => {
      const userPath = './demo/archivosinlink.md';
      return expect(mdLinks(userPath)).resolves.toEqual([]);
    });

    it('should validate links when options.validate is true', () => {
      const userPath = './demo/readme2.md';
      const options = { validate: true };
    
      // Mock 
      jest.mock('../src/functions.js', () => ({
        ...jest.requireActual('../src/functions.js'),
        validateLink: jest.fn(() => Promise.resolve({ statusCode: 200, message: 'OK' })),
      }));
    
      return mdLinks(userPath, options)
        .then((result) => {
          
          result.forEach((link) => {
            expect(link).toHaveProperty('status');
            expect(link).toHaveProperty('message');
          });
        });
    });

    it('should process a directory and return links from all files', () => {
      const userPath = './demo';
      
      return mdLinks(userPath)
        .then((result) => {
          console.log('this is result', result)
          // Expect the result to be an array of links from all files in the directory
          expect(result).toEqual(expect.arrayContaining(realResult));
        });
    });

    it('should handle an absolute path', () => {
      
      const userPath = readme2Path
      return mdLinks(userPath)
        .then((result) => {
          expect(result).toEqual(realResult);
        });
    });

});