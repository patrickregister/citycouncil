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

$.ajax({
  url: '/neighborhood',
  success: (res) => {
    neighborhoodFunction(res);
  }
});

function neighborhoodFunction(neighborhoods){
  // Populate a dropdown list of all neighborhoods using the "neighborhoods" array
  for (var i = 0; i < neighborhoods.length; i++) {
    // create an "option" element
    const neighborhoodOptions = document.createElement("OPTION");
    // set the value of the option element
    neighborhoodOptions.setAttribute("value", neighborhoods[i]);
    // set the text of the option element
    const neighborhoodName = document.createTextNode(neighborhoods[i]);
    neighborhoodOptions.appendChild(neighborhoodName);
    document.querySelector("#neighborhoodKeyword").appendChild(neighborhoodOptions);
  }

}
