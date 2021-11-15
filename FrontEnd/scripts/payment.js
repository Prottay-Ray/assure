let visibleSection = document.getElementById("visibleRegion");
let processingSection = document.getElementById("processing");
let doneSection = document.getElementById("payment_success_section");

let cardButtton = document.getElementById('paybutton');
let successButton = document.getElementById('paymentDone');
let cardNumber = document.getElementById('number_debit');
let cardName = document.getElementById('name');
let expiryYear = document.getElementById('expiryyear')
let expiryMonth = document.getElementById('expirymonth')
let cvv = document.getElementById('cvv');
let otp = document.getElementById('otp')
let isOtpEnterred = false;

function validateOtp(enterredOtp) {
    
    //Here is the code for validating the otp, enterred by the user

    return true;
}
function sendOtp() {
    
    //Here is the code to send OTP

}
function validateName(a) {
    for (let index = 0; index < a.length; index++) {
        if (!((a[index] >= 'A' && a[index] <= 'Z') || (a[index] >= 'a' && a[index] <= 'z') || a[index] == ' ')) {
            return false;
        }
    }
    return true;
}
function validateCardNumber(cardNumb) {
    return (Number(cardNumb.length) === 16);
}
function validateCvv(cardNumb) {
    return (Number(cardNumb.length) === 3);
}
function bookPolicy() {
    
    //Here policy will be booked by fetching data from local storage and doing api post request

}
cardButtton.addEventListener('click', (e) => {

    e.preventDefault();
    if (!isOtpEnterred) {

        //Validation of details taking place
        let isDataValid = validateName(cardName.value)
        if (!isDataValid) {
            alert('Invalid Card Name!')
            return;
        }
        isDataValid = validateCardNumber(cardNumber.value)
        if (!isDataValid) {
            alert('Invalid Card Number!')
            return;
        }
        isDataValid = validateCvv(cvv.value)
        if (!isDataValid) {
            alert('Invalid cvv!')
            return;
        }
        sendOtp();
        document.getElementById('otpbox').style.visibility = "visible";
        isOtpEnterred = true;

    } else {
        if (validateOtp(otp.value)) {
            visibleSection.style.display = "none";
            processingSection.style.display = "block";
            setTimeout(() => {
                bookPolicy();
                processingSection.style.display = "none";
                doneSection.style.display = "block";
            }, 2000);
        }
    }

});

let paybutton = document.getElementById('paybutton');

let allDetails = JSON.parse(localStorage.getItem('allDetails'));
let det = JSON.parse(localStorage.getItem('ChosenTA'));
paybutton.innerText = "Pay Rs. " + det.premium;

let userId = JSON.parse(localStorage.getItem("UserID"));

let obj = {
    coverAmount : det.cover,
    premium : det.premium,
    coverTenure : det.tenure,
    members : allDetails
}

paybutton.onclick = () => {
    fetch(`http://localhost:8070/bookings/${userId}`, {
        method:"POST",
        body: obj,
        mode: 'cors',
        headers:{
            "Content-Type":"application/json; charset=UTF-8"
        },
    })
    .then((res) => {
        if(res.status == 302){
             res.json().then((r) => {
                 console.log("success")
             })
        }
    })
}

successButton.addEventListener('click', () => {
    window.location = "./home_navigation.htm";
});