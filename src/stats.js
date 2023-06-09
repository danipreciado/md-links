let arrayOfObjects = [  
    {
      href: 'https://es.wikipedia.org/wiki/Markdown',
      text: 'prueba',
      file: 'C:\\Users\\danis\\OneDrive\\Escritorio\\Laboratoria\\md-links\\demo\\carpeta\\archivorecursive.md',
      status: 200,
      message: 'ok'
    },
    {
      href: 'https://es.wikipedia.org/wiki/Markdown',
      text: 'Markdown',
      file: 'C:\\Users\\danis\\OneDrive\\Escritorio\\Laboratoria\\md-links\\demo\\readme2.md',
      status: 200,
      message: 'ok'
    },
    {
      href: 'https://es.wikipedia.org/wika',
      text: 'brokenlinklol',
      file: 'C:\\Users\\danis\\OneDrive\\Escritorio\\Laboratoria\\md-links\\demo\\readme2.md',
      status: 404,
      message: 'fail'
    }
  ]

function brokenLinks (arrayOfObjects) {
    let broken = 0;
    arrayOfObjects.map(element => {
        if (element.message === 'fail') {
            broken ++;
        }
    })
    return broken;
}

function linksQty (arrayOfObjects) {
    let links = 0;
    arrayOfObjects.map(element => {
        if (element.href) {
            links++;
        }
    })
    return links;
}

function uniqueLinks (arrayOfObjects) {
    let linksArr = [];
    arrayOfObjects.map(element => {
        if (!linksArr.includes(element.href)) {
            linksArr.push(element.href)
        }
    })
   return linksArr.length;
}

function simpleStats(arrayOfObjects) {
    const totalLinks = linksQty(arrayOfObjects);
    const unique = uniqueLinks(arrayOfObjects);
  
    return `Total: ${totalLinks}\nUnique: ${unique}`;
  }
  
  function complexStats(arrayOfObjects) {
    const totalLinks = linksQty(arrayOfObjects);
    const unique = uniqueLinks(arrayOfObjects);
    const broken = brokenLinks(arrayOfObjects);
  
    return `Total: ${totalLinks}\nUnique: ${unique}\nBroken: ${broken}`;
  }

  module.exports = {
    simpleStats,
    complexStats,
  };