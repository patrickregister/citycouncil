//linereader is reading out.txt line-by-line
var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('out.txt') //out.txt is the text file that was created when the pdf was parsed by running pdf2txt in terminal
});

var currentPetition = '';

// looks like: {
//   "1": ["petition to destroy the roundaobut", "petition to rezone the terrace"]
// };
var petitionsByDistrict = {};

lineReader.on('line', function (line) {
  var title = line.match(/Rezoning Petition: (.*)/);
  if (title) {
    currentPetition = title[1];

  }

  var district = line.match(/Council District ([1-7])/);
  if (district){
    //add item into petition that matches district
    var districtNumber = district[1];
    if(!petitionsByDistrict[districtNumber]) {
      petitionsByDistrict[districtNumber] = [];
    }
    petitionsByDistrict[districtNumber].push(currentPetition);
  }
});

lineReader.on("close", function(){
  console.log(petitionsByDistrict);
});
//timeout function run because otherwise program would search the text forever. 
setTimeout(function(){}, 5000);
