// set variables
const text = document.querySelector("#text");
const divTel = document.querySelector("#div_tel");
const divMail = document.querySelector("#div_mail");

// functions that display fields to enter contact info depending on user choices
function showTel(){
  divTel.style.display = 'block';
  divMail.style.display = 'none';
}
function showMail(){
  divTel.style.display = 'none';
  divMail.style.display = 'block';
}
function showBoth(){
  divTel.style.display = 'block';
  divMail.style.display = 'block';
}

// $.ajax({
//   url: '/neighborhood',
//   success: (res) => {
//     neighborhoodFunction(res);
//   }
// });


//enter number of council districts
const numberOfDistricts = 7;
//create an array for a list of city council districts
const districtList = [];
//function to populate array of city council districts
function listOfDistricts(){
    for(let i = 1; i <= numberOfDistricts; i++){
        districtList.push("Council District " + i);
    } //end for loop
    console.log(districtList);
} //end listOfDistricts function
//run function
listOfDistricts();

function districtFunction(districtList){
    // Populate a dropdown list of all districtList using the "districtList" array
    for (var i = 0; i < districtList.length; i++) {
        // create an "option" element
        const districtOptions = document.createElement("OPTION");
        // set the value of the option element
        districtOptions.setAttribute("value", districtList[i]);
        // set the text of the option element
        const districtName = document.createTextNode(districtList[i]);
        districtOptions.appendChild(districtName);
        document.querySelector("#districtKeyword").appendChild(districtOptions);
    }

}
districtFunction(districtList);
