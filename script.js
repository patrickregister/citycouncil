const text = document.getElementById("text");
const divTel = document.getElementById("div_tel");
const divMail = document.getElementById("div_mail");

function showTel(){
  divTel.style.display = 'block';
}

function showMail(){
  divMail.style.display = 'block';
}

function showBoth(){
    divTel.style.display = 'block';
    divMail.style.display = 'block';
}
