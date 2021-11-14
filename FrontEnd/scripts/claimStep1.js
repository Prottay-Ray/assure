let selected_claim=JSON.parse(localStorage.getItem("choosen_claim"));
document.getElementById("claim_heading").innerText=selected_claim.selected;

if(selected_claim.selected=="Call & Claim"){
    document.getElementById("call_icon").classList.remove('d-none');


}

let policies = 0;
let policyNameSet = [];
let userId = 1;//JSON.parse(localStorage.getItem("UserID"));
let selectPolicy = document.getElementById('select_policy')
let selectLocation = document.getElementById('select_location')
let selectHospital = document.getElementById('select_hospital')
let next = document.getElementById('next');

async function populate() {
    
    let a = await fetch(`http://localhost:8070/booking/hospital/${userId}`);
    policies = await a.json();

    localStorage.setItem("policy_hospital_claim", JSON.stringify(policies));

    for (let {bookingId, policyName} of policies) {
        if (policyNameSet.length === 0 || policyNameSet.indexOf(policyName) === -1) {
            policyNameSet.push(policyName);
            let option = document.createElement('option');
            option.value = policyName;
            option.innerText = policyName;
            selectPolicy.appendChild(option);
        }
    }
    alert("Working")
}

selectPolicy.onchange = () => {
    for (let {policyName, location} of policies) {
        if (selectPolicy.value === policyName) {
            let option = document.createElement('option');
            option.value = location;
            option.text = location;
            selectLocation.appendChild(option);
        }
    }
}

selectLocation.onchange = () => {
    for (let {policyName, location, hospital} of policies) {
        if (selectPolicy.value === policyName && selectLocation.value === location) {
            let option = document.createElement('option');
            option.value = hospital;
            option.text = hospital;
            selectHospital.appendChild(option);
        }
    }
}


next.onclick = () => {
    let a = {
        location: selectLocation.value,
        hospital: selectHospital.value
    }
    for (let {bookingId, policyName} of policies) {
        if (policyName === selectPolicy.value) {
            a.policyBookingId = bookingId;
            break;
        }
    }
    localStorage.setItem('claim_details', JSON.stringify(a));
}
window.onload = populate();

