//readline module is included in node that can read line one-by-one (https://nodejs.org/api/readline.html). 
var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('out.txt') //out.txt is the text file that was created when the pdf was parsed by running pdf2txt in terminal
});

var currentPetition = '';

//create object to hold petitions
// looks like: {
//   "1": ["petition to destroy the roundaobut", "petition to rezone the terrace"]
// };
var petitionsByDistrict = {};
//finds Rezoning Petition lines (These are the headings for each zoning petition)
lineReader.on('line', function (line) {
  var title = line.match(/Rezoning Petition: (.*)/);
  if (title) {
    currentPetition = title[1];

  }
  //finds lines containing 'Council District #'
  var district = line.match(/Council District ([1-7])/);
  if (district){
    //add item into petition that matches district
    var districtNumber = district[1];
    //skip lines that do not contain 'Council District #'
    if(!petitionsByDistrict[districtNumber]) {
      petitionsByDistrict[districtNumber] = [];
    }
    //if line contains a district number it is pushed to array
    petitionsByDistrict[districtNumber].push(currentPetition);
  }
});
//runs readline to create the 'out.txt' file
lineReader.on("close", function(){
  console.log(petitionsByDistrict);
});
//timeout function run because otherwise program would search the text forever. 
setTimeout(function(){}, 5000);
