# md-links-danipreciado

This is an npm package for extracting and analyzing links from Markdown files. It provides a command-line interface (CLI) tool that allows you to retrieve all the links contained in a given directory or file, and provides options for validating the status of each link and generating statistics about the links.

## Installation

To install the package, use the following command:


```
npm install md-links-danipreciado 
```
```
npm install danipreciado/md-links
```

To install the command line globally, run: 


``
npm install -g md-links-danipreciado 
``

## Usage

To use the md-links-cli tool, run the following command in your terminal:

```
md-links <path> [--validate] [--stats]
```

Replace `<path>` with the path to the directory or file containing the Markdown files you want to analyze.

### Options

The following options are available:

- `--validate`: Validates the status of each link.
- `--stats`: Displays basic statistics of the links.

You can use either one or both options together.

### Example

To extract and display all the links in a directory without any validation or statistics:

```
md-links /path/to/directory
```

To extract and validate the status of each link in a directory:

```
md-links /path/to/directory --validate
```

To extract and display basic statistics of the links in a directory:

```
md-links /path/to/directory --stats
```

To extract, validate, and display complex statistics of the links in a directory:

``
md-links /path/to/directory --validate --stats
``
## Output

The md-links-cli tool outputs the links found in the specified directory or file. If the `--validate` option is used, it also includes the status and message for each link. If the `--stats` option is used, it displays basic or complex statistics of the links.

