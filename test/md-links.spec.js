const mdLinks = require('../src/index.js');


const {
  absolutePath,
  resolvePath,
  isDir,
  readFile,
  findLinksInContent,
  validateLink,
} = require('../src/functions.js');

jest.mock('../src/functions.js');

describe('mdLinks', () => {
  // Test mdLinks
  describe('mdLinks', () => {
    test('should return an array of links when validate is false', async () => {
      const resolvedUserPath = '/path/to/directory';
      const files = ['/path/to/file.md'];
      const content = 'This is a [link](https://example.com) in the content.';
      const links = [{ href: 'https://example.com', text: 'link', file: '/path/to/file.md' }];

      // Mocking the dependent functions
      absolutePath.mockReturnValue(true);
      resolvePath.mockReturnValue('/path/to/directory');
      isDir.mockResolvedValue(true);
      findFilesInDir.mockResolvedValue(files);
      readFile.mockResolvedValue(content);
      findLinksInContent.mockReturnValue(links);

      const result = await mdLinks('/path/to/directory', { validate: false });
      expect(result).toEqual(links);
    });

    test('should return an array of links with status and message when validate is true', async () => {
      const resolvedUserPath = '/path/to/directory';
      const files = ['/path/to/file.md'];
      const content = 'This is a [link](https://example.com) in the content.';
      const links = [{ href: 'https://example.com', text: 'link', file: '/path/to/file.md' }];
      const validatedLinks = [
        {
          href: 'https://example.com',
          text: 'link',
          file: '/path/to/file.md',
          status: 200,
          message: 'OK',
        },
      ];

      // Mocking the dependent functions
      absolutePath.mockReturnValue(true);
      resolvePath.mockReturnValue('/path/to/directory');
      isDir.mockResolvedValue(true);
      findFilesInDir.mockResolvedValue(files);
      readFile.mockResolvedValue(content);
      findLinksInContent.mockReturnValue(links);
      validateLink.mockResolvedValue({ statusCode: 200, statusMessage: 'OK' });

      const result = await mdLinks('/path/to/directory', { validate: true });
      expect(result).toEqual(validatedLinks);
    });
  });
});