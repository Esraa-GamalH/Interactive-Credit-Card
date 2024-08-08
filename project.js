var nameRegex = /^[a-zA-Z]+ [a-zA-Z]+$/;    //fname space lname
var cardNumRegex = /^[0-9]*$/;              //numbers only no letters

function showName(){
    let userName = document.querySelector("#cardNameInput").value;
    userName = userName.toUpperCase();
    document.querySelector("#cardName").textContent = userName;
}

function checkName(){
    let userName = document.querySelector("#cardNameInput").value;
    if (userName.length == 0){
        document.querySelector("#nameError").textContent = "";
        return false;
    }
    if (!nameRegex.test(userName)){
        document.querySelector("#nameError").textContent = "Wrong format";
        document.querySelector("#cardNameInput").style.borderColor = "hsl(0, 100%, 66%)";
        return false;
    }
    else{
        document.querySelector("#nameError").textContent = "";
        document.querySelector("#cardNameInput").style.borderColor = "hsl(270, 3%, 87%)";
        return true;
    }
}


function showCardNum(){
    let cardNum = document.querySelector("#cardNumInput").value;
    let newCardNum = "";
    let inputDigits = cardNum.length;

    for (let i=0; i<16; i++){
        if (i%4==0){
            newCardNum = newCardNum.concat(" ");
        }
        if (i < inputDigits){
            newCardNum = newCardNum.concat(cardNum[i]);
        }
        else{
            newCardNum = newCardNum.concat("0");
        }
    }
    document.querySelector("#cardNum").textContent = newCardNum;
}

function checkNum(){
    let userNum = document.querySelector("#cardNumInput").value;
    if (!cardNumRegex.test(userNum)){
        document.querySelector("#numError").textContent = "Wrong format, Numbers only";
        document.querySelector("#cardNumInput").style.borderColor = "hsl(0, 100%, 66%)";  //red
        return false;
    }
    else{
        document.querySelector("#numError").textContent = "";
        document.querySelector("#cardNumInput").style.borderColor = "hsl(270, 3%, 87%)"; //gray
        return userNum.length == 16;
    }

}

function showCvc(){
    let cvcNum = document.querySelector("#cvcNumInput").value;
    let cvcDigits = 3- cvcNum.length;
    for (let i=0; i<cvcDigits; i++){
        cvcNum+="0";
    }
    document.querySelector("#cardCvc").textContent = cvcNum;
}

function checkCvc(){
    let cvcNum = document.querySelector("#cvcNumInput").value;
    if (cvcNum == ""){
        document.querySelector("#cvcError").textContent = "Can't be blank";
        document.querySelector("#cvcNumInput").style.borderColor = "hsl(0, 100%, 66%)";
        return false;
    }
    else if (!Number(cvcNum)){
        document.querySelector("#cvcError").textContent = "Can't be letter, numbers only";
        document.querySelector("#cvcNumInput").style.borderColor = "hsl(0, 100%, 66%)";
        return false;
    }
    else{
        document.querySelector("#cvcError").textContent = "";
        document.querySelector("#cvcNumInput").style.borderColor = "hsl(270, 3%, 87%)";
        return cvcNum.length == 3;
    }
}

function showDate(){
    let month = document.querySelector("#cardMonth").value;
    let year = document.querySelector("#cardYear").value;
    if (month.length == 1){
        month = "0"+month;
    }
    else if (month.length == 0){
        month = "00";
    }
    if (year.length == 1){
        year = "0"+year;
    }
    else if (year.length == 0){
        year = "00";
    }
    document.querySelector("#cardExpDate").textContent = month+'/'+year;

}

function checkMonth(){
    let month = Number(document.querySelector("#cardMonth").value);
    return month>=1 && month<=12;
}

function checkYear(){
    let year = document.querySelector("#cardYear").value;
    return year>=24 && year<=99;
}

function checkDate(){
    let currentDate = new Date();
    let month = document.querySelector("#cardMonth").value;
    let year = document.querySelector("#cardYear").value;
    let newYear = "20"+year;
    let inputDate = new Date (newYear,month);
    if (month == ""){
        document.querySelector("#dateError").textContent = "Can't be blank";
        document.querySelector("#cardMonth").style.borderColor = "hsl(0, 100%, 66%)";
    }
    else if (year == ""){
        document.querySelector("#dateError").textContent = "Can't be blank";
        document.querySelector("#cardYear").style.borderColor = "hsl(0, 100%, 66%)";
    }
    else{
        document.querySelector("#dateError").textContent = "";
        document.querySelector("#cardMonth").style.borderColor = "hsl(270, 3%, 87%)";
        document.querySelector("#cardYear").style.borderColor = "hsl(270, 3%, 87%)";
        if (inputDate < currentDate){
            document.querySelector("#dateError").textContent = "Can't be in the Past";
            document.querySelector("#cardYear").style.borderColor = "hsl(0, 100%, 66%)";
        }
        else{
            document.querySelector("#dateError").textContent = "";
            document.querySelector("#cardYear").style.borderColor = "hsl(270, 3%, 87%)";
        }
    }
}

//Check on all inputs that they pass the validation tests, then enable confirm button and show thank you div.
function isEnabled(){
    let confirm = document.getElementById("confirmBtn");
    if (checkName() && checkNum() && checkCvc() && checkMonth() && checkYear()){
        confirm.disabled = false;
    }
    else{
        confirm.disabled = true;
    }
}

function showThankU(){
    document.getElementById("cardForm").style.display = "none";
    document.getElementById("thankYou").style.display = "flex";
}

document.getElementById("confirmBtn").addEventListener("click", function(event){
    event.preventDefault();
});

document.querySelectorAll('input').forEach(input => {
input.addEventListener('focus', () => {
    input.style.outline = 'none';
    input.style.border = '2px solid transparent';
    input.style.backgroundImage = 
    'linear-gradient(to right, white, white), ' +
    'linear-gradient(to left, hsl(278, 94%, 30%), hsl(249, 99%, 64%))';
    input.style.backgroundClip = 'padding-box, border-box';
    input.style.backgroundOrigin = 'padding-box, border-box';
});

input.addEventListener('blur', () => {
    // Reset styles when input loses focus 
    input.style.outline = '';
    input.style.border = '';
    input.style.backgroundImage = '';
    input.style.backgroundClip = '';
    input.style.backgroundOrigin = '';
});
});