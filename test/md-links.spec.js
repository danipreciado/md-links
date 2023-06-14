const mdLinks = require('../src/index.js');


const realResult = [
  {
    href: 'https://es.wikipedia.org/wiki/Markdown',
    text: 'Markdown',
    file: 'C:\\Users\\danis\\OneDrive\\Escritorio\\Laboratoria\\md-links\\demo\\readme2.md'
  },
  {
    href: 'https://es.wikipedia.org/wika',
    text: 'brokenlinklol',
    file: 'C:\\Users\\danis\\OneDrive\\Escritorio\\Laboratoria\\md-links\\demo\\readme2.md'
  }
]; 

const array2 = [
  {
    href: 'https://es.wikipedia.org/wiki/Markdown',
    text: 'Markdown',
    file: 'C:/Users/danis/OneDrive/Escritorio/Laboratoria/md-links/demo/readme2.md'
  },
  {
    href: 'https://es.wikipedia.org/wika',
    text: 'brokenlinklol',
    file: 'C:/Users/danis/OneDrive/Escritorio/Laboratoria/md-links/demo/readme2.md'
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
    
      // Mock the validateLink function to return a specific result
      jest.mock('../src/functions.js', () => ({
        ...jest.requireActual('../src/functions.js'),
        validateLink: jest.fn(() => Promise.resolve({ statusCode: 200, message: 'OK' })),
      }));
    
      return mdLinks(userPath, options)
        .then((result) => {
          // Expect each link to have a status and message property
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
          // Expect the result to be an array of links from all files in the directory
          expect(result).toEqual(expect.arrayContaining(realResult));
        });
    });

    it('should handle an absolute path', () => {
      const userPath = 'C:/Users/danis/OneDrive/Escritorio/Laboratoria/md-links/demo/readme2.md';
  
      return mdLinks(userPath)
        .then((result) => {
          expect(result).toEqual(array2);
        });
    });

});