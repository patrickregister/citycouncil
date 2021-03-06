//This file is no longer being used. 
//Previously, it populated the dropdown menu on index.html with neighborhoods from the neighborhoods array below. 


let express = require("express");
let app = express();
let fs = require('fs'),
    PDFParser = require("pdf2json"),
    pdfParser = new PDFParser(),
    parseData;
app.use(express.static('js'));
app.use(express.static('css'));

app.get("/", (req, res) => {
  res.sendFile(__dirname + '/index.html');
  });

// pdfParser.on("pdfParser_dataReady", pdfData => {
//         fs.writeFile("./charlotte_data.json", JSON.stringify(pdfData), (err) => {
//           if (err) {
//             throw err;
//           }
//           console.log('success')
//         });
//     });
//
// pdfParser.loadPDF("charlotte.pdf");
//
// fs.readFile('./charlotte_data.json', 'utf8', (err, data) => {
//   if (err) throw err;
//   parseData = JSON.parse(data);
//   lookThroughData(parseData);
// });

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

app.get("/neighborhood", (req, res) => {
  //Array of Charlotte neighborhoods. Sourced from http://web.archive.org/web/20071029142821/http://www.charmeck.org/Departments/Neighborhood+Dev/Quality+of+Life/Neighborhoods+Listing.htm
  let neighborhoods = ["Alexander", "Amity Gardens", "Arbor Estates", "Arbor Glen", "Ashbrook", "Ashley Park", "Autumnwood", "Back Creek Church Road", "Back Creek Forest", "Bahama/Havana Park", "Ballantyne", "Bar Harbor", "Barclay Downs", "Barringer Woods", "Beatties Ford-Trinity", "Becton Park", "Beechwood", "Belmont", "Belvedere Homes", "Bent Oaks", "Berwick", "Beverly Crest", "Beverly Woods", "Beverly Woods East", "Bexley", "Biddleville", "Bishop's Ridge", "Boulevard Homes", "Bradfield Farms", "Braemar", "Brantley Oaks", "Briarcreek-Woodland Area", "Briarwood Terrace", "Bridlewood", "Brighton Woods", "Brittany Oaks", "Brookfield", "Brookhill", "Cameronwood", "Capitol Drive", "Cardinal Glen", "Carmel Estates", "Carmel Forest", "Carmel Park", "Carmel Station", "Carmel Valley", "Carolinas Landing", "Carson's Pond", "Cedar Knoll (CHA)", "Cedars East", "Chantilly Area", "Charcon Heights/Mecklenburg", "Charlie Hipps Rd.", "Cherry", "Cheshire Area", "Cheshunt", "Chestnut Lake", "Cheverton", "Churchill Downs", "Claiborne Woods", "Clanton Park", "Cloisters (The)", "Closeburn/Glenkirk", "Coliseum Drive", "College Downs", "Collingwood", "Colonial Village", "Colony Acres", "Commonwealth/Morningside", "Cotswold Area", "Coulwood", "Coulwood East", "Coulwood Ridge-Kluts", "Country Club Heights", "Coventry Woods Development", "Crab Orchard", "Craighead/North Tryon", "Crescent Heights", "Cresswick", "Crown Colony", "Dalebrook", "David Cox Road", "Davis Lake Community", "Derita Woods/Tanglewood", "Derita/Statesville", "Derita/Tanglewood", "Devonshire", "Dilworth", "Dixie/Berryhill", "Double Oaks", "Druid Hills North", "Druid Hills South", "Eagle Lake", "East Forest", "Eastbrook Woods", "Eastfield Ridge", "Eastland Estates", "Eastover", "Eastway Park Community", "Echo Hills", "Edison Street Community", "Edwin Towers", "Eleanor Heights", "Elizabeth", "Enderly Park", "Enderly Park South", "Fairfield Park", "Fairmeadows", "Fairway Downs", "Farm Pond", "Farmcrest", "Farmington", "Farmington", "Finchley/Purser", "Firestone/Garden City", "First Ward", "Forest Heights", "Forest Ridge", "Four Seasons", "Fourth Ward", "Foxcroft HOA", "Freedom Park", "Freedom Park North", "Galloway Road", "Garden Park", "Gaynor Arms", "Genesis Park", "Giverny", "Glenlea Park", "Governer's Square", "Graham Heights", "Graybark Avenue", "Great Oaks", "Green Meadows", "Greentree Neighborhood", "Greenville", "Grenelefe Village", "Greylyn Drive", "Grier Heights", "Griers Fork", "Grove Park", "Hamlin Park", "Hampshire Hills", "Happy Valley", "Harbor House", "Harrington Woods", "Harris-Houston", "Harwood Lane", "Hay Market Island", "Hearthstone", "Heatherwood/Hickory Ridge", "Hembstead", "Hemphill Heights", "Henderson Circle", "Heritage Woods", "Herrinwood", "Hickory Grove", "Hickory Grove", "Hidden Valley", "Highland Creek", "Hillsboro Acres", "Historic Rosedale", "Holly Hill Farm", "Homewood Acres", "Hoskins Community", "Howie Acres", "Hunter Acres", "Hunters Gate", "Huntington", "Huntingtowne Farms", "Hyde Park", "Idlewild Brook", "Idlewild Farms", "Idlewild South", "J. T. Williams", "J.H. Gunn", "Jackson Homes", "Johnston Rd./McAlpine", "Julius Alexander", "Kenilworth/Amberleigh", "Kilborne Acres", "Kimberlee Apartments", "Kingstree", "Kingswood", "Knollwood Acres", "Lakeview Village", "Lakewood", "Lamplighter Village", "Lansdowne", "Leafcrest (CHA)", "Lexington", "Lincoln Heights", "Linda Lake Drive", "Live Oak (CHA)", "Lockwood", "Lower Briar Creek", "Lundy Lane", "Lynbridge-Oxford Park", "Lyntonshbrooke", "Mayfield Park", "McCrorey Heights", "McDowell Meadows", "McGregor Downs", "McLean Road/Middle Acres", "Meadow Oaks", "Mecklenburg Estates", "Medford Acres", "Merry Oaks Neighborhood", "Misty Creek", "Montclaire South", "Montibello", "Moores Chapel Community", "Morrocroft Estates", "Mountain Island", "Mountain Island", "Mountain Pointe", "Mountainbrook", "Myers Park", "Nevin Community", "Newell", "Newell Community", "Newell Place", "North Charlotte", "Northwood Estates", "Northwoods", "Oak Forest", "Oakdale", "Oakhurst", "Oaklawn", "Oakview Terrace", "Oberbeck Farms", "Old Farm", "Old Georgetown", "Olde Foxcroft", "Olde Providence North", "Olde Providence Park", "Olde Savannah", "Olde Whitehall", "Optimist Park", "Orchard Park", "Oxford Hunt", "Park Crossing", "Parkdale League", "Parktown Terrace (CHA)", "Parkview", "Pawtuckett", "Picardy", "Pine Island", "Pine Valley", "Pinecrest Neighborhood", "Piper Glen Estates", "Plaza Hills", "Plaza Midwood", "Plaza-Shamrock", "Pleasant Hill", "Pleasant Hill", "Ponderosa Community", "Pondside", "Prescott Place", "Prosperity Church Road", "Providence", "Providence Arbours", "Providence Colony", "Providence Crossing", "Providence Estates East", "Providence Landing", "Providence Park", "Providence Plantation", "Providence Springs", "Providence Towers", "Providence West", "Providence Woods", "Providence Woods", "Provincetowne", "Pullengreen", "Quail Acres", "Quail Hollow", "Quail Hollow", "Radbourne", "Raeburn", "Rain Tree", "Ramblewood", "Randolph Park", "Ravenwood", "Reid Park", "Revolution Park", "Ridgeloch", "Robinson Community", "Robinson Woods", "Rockbridge", "Rockwell Park", "Rosdale Heights", "Rosegate", "S.CreekW/WT Harris", "Sardis by the Park", "Sardis Forest", "Sardis Forest", "Sardis Pointe", "Sardis Woods", "Sedgefield Neighborhood", "Sedgewood Cir/Meadowbrook", "Sedgewood Lake", "Selwyn", "Setters Trace Landing", "Settlers Landing", "Seven Eagles", "Seversville", "Seversville", "Shadowlake", "Shannon Park", "Sharon Forest", "Sharon Woods", "Sheffield Park", "Shelton", "Sherbrook", "Sherwood Forest", "Silverstone", "Silverwood", "Slater Springs", "Smallwood", "South Dilworth", "South Hall", "Southpark Coalition", "Southside Park", "Southwold Drive", "Spring Field", "Spring Valley", "St. George Place", "Starkwood/Grafton", "Starmount", "Starmount Forest", "Steele Creek", "Steeleberry Acres", "Sterling", "Stonehaven", "Sturnbridge", "Sugaw Creek Area", "Taragate", "Tarlton Hills", "Taylor-LaSalle", "The Crossings", "The Park at Oaklawn", "The Village of Raintree", "Third Ward", "Thomasboro", "Thompson Avenue", "Todd Park", "Toddville Road", "Touchstone Village", "Tryon Hills", "Tryon North", "Tuckaseegee/Road", "Tuckaway Park", "University Park", "University Park North", "Valley Grove", "Verndale Farms", "Villa Heights", "Villages of Wexford", "Wallace Woods (CHA)", "Washington Heights", "Wedgewood", "Wendover", "Wesley Heights", "Wessex Square", "Westchester", "Westerly Hills", "Westerly Hills", "Westmoreland South", "Westover Hills", "Whiteoak", "Wildwood", "Wilkinson Boulevard", "Williamsburg", "Willowmere", "Wilmont", "Wilmore", "Wilora Lake", "Wilson Heights", "Wilton Wood", "Winding Brook", "Windsor at Wedgewood", "Windsor Park", "Wingate", "Winterfield/Eastway", "Winterwood Estates", "Withrow Downs", "Wolfe Ridge", "Woodberry Forest", "Woodburn", "Woodsdale Acre", "York Road", "Yorkmont", "Yorkshire"]
res.json(neighborhoods);
});




// function Circle(radius) {
//   this.radius = radius;
// }
//
// var bigCircle = new Circle(20);
// console.log(bigCircle.radius)

//fs is file system and it is a native node package (meaning does not need to be npm installed)

app.listen(3000, () => {
  console.log("listening on port 3000");
});
