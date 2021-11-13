localStorage.setItem("UserID", JSON.stringify(1));
let userId = JSON.parse(localStorage.getItem("UserID"));

let userName = document.getElementById('helloUser');
let claimId = document.getElementById('claimId');
let claimSubmitDate = document.getElementById('claimValidThru');
let benefitItem = document.getElementById('benefitItem');
let claimStatus = document.getElementById('claimStatus');
let policy = document.getElementById('scheme');
let membership_title = document.getElementById('membership_title');
let membership_no = document.getElementById('membership_no');
let claim_card = document.getElementById('claim_card');
let claimCard = document.getElementById('claimCard');
let exploreButt = document.getElementById('explore');
let claimButt = document.getElementById('claim')

exploreButt.onclick = () => {
    window.location = "./Explore2.html";
}
claimButt.onclick = () => {
    window.location = "./directClaim.html";
}

async function loadUser() {
    
    // userId = 2;
    let a  = await fetch(`http://localhost:8070/claim/${userId}`);
    let b = await a.json();
    localStorage.setItem("Claim", JSON.stringify(b));
    b = b[0];
    if (b.id !== null) {

        claim_card.style.display = "none";
        claimCard.style.display = "block";
        userName.innerText = "Hello " + b.userName + "!";
        claimId.innerText = b.id;
        claimSubmitDate.innerText = b.submissionDate.substring(0, 10);
        benefitItem.innerText = b.claimItem;
        claimStatus.innerText = b.status;
        policy.innerText = b.policyBookingName;
        membership_title.innerText = "Membership No.";
        membership_no.innerText = b.memberId;
    }
    // else {
    //     let 
    // }
}

window.onload = loadUser();

