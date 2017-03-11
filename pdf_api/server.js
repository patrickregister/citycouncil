let fs = require('fs'),
    PDFParser = require("pdf2json"),
    pdfParser = new PDFParser(),
    parseData;

pdfParser.on("pdfParser_dataReady", pdfData => {
        fs.writeFile("./charlotte_data.json", JSON.stringify(pdfData), (err) => {
          if (err) {
            throw err;
          }
          console.log('success')
        });
    });

pdfParser.loadPDF("charlotte.pdf");

fs.readFile('./charlotte_data.json', 'utf8', (err, data) => {
  if (err) throw err;
  parseData = JSON.parse(data);
  lookThroughData(parseData);
});

function lookThroughData(data) {
  let pageData = data.formImage.Pages;

  pageData.forEach((text) => {
    getWords(text)
  });
}

function getWords(word) {
  moreWords(word.Texts)
}

function moreWords(words){
  words.forEach((word) => {
    console.log(word.R)
  })
}






// function Circle(radius) {
//   this.radius = radius;
// }
//
// var bigCircle = new Circle(20);
// console.log(bigCircle.radius)

//fs is file system and it is a native node package (meaning does not need to be npm installed)
