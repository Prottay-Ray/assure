let selected_claim = JSON.parse(localStorage.getItem("choosen_claim"));
document.getElementById("claim_heading").innerText = selected_claim.selected;
if (selected_claim.selected == "Call & Claim") {
    document.getElementById("call_icon").classList.remove('d-none');

}
function submit() {
    console.log("submit");
    document.getElementById("form_claim").classList.remove("d-block");
    document.getElementById("form_claim").classList.add('d-none');
    document.getElementById("nav_steps_img").classList.add('d-none');
    document.getElementById("processing").classList.remove('d-none');
    setTimeout(() => {
        let img = document.getElementById("nav_steps_img");
        img.src = "../icons/Component 8payment_success.svg";
        img.classList.remove('d-none');
        img.classList.add("d-block");
        document.getElementById("processing").classList.add('d-none');
        document.getElementById("content_success").classList.remove('d-none');
    }, 2000);
    storedetails();
    post_claim_data();

}
function removelclstg() {
    localStorage.removeItem('choosen_claim');
    location.href = "../html/home_navigation.htm"
}

function storedetails() {
    let claim_details = JSON.parse(localStorage.getItem('claim_details'));
    claim_details.name = document.getElementById("select_name").value,
        claim_details.aadharNo = document.getElementById("select_aadharno").value,
        claim_details.membershipno = document.getElementById('select_membershipno').value
    localStorage.setItem('claim_details', JSON.stringify(claim_details));
}
var userId = JSON.parse(localStorage.getItem("UserID"));
async function populate() {
    let select_name=document.getElementById("select_name");
    let select_aadharNo=document.getElementById("select_aadharno");
    let select_membershipno=document.getElementById("select_membershipno");
  
    
    let a = await fetch(`http://localhost:8070/get/member/${userId}`);
   let member = await a.json();
   console.log(member);


        let option1 = document.createElement('option');
        option1.innerText = member.name;
        select_name.appendChild(option1);
        let option2 = document.createElement('option');
       option2.innerText = member.aadhaar;
        select_aadharNo.appendChild(option2);
        let option3 = document.createElement('option');
        option3.innerText =userId;
        select_membershipno.appendChild(option3);

}
populate();




async function post_claim_data() {
    let claim = JSON.parse(localStorage.getItem("claim_details"));
    let policy_book=JSON.parse(localStorage.getItem("policy_hospital_claim"));
    console.log(policy_book[0].bookingId);
    console.log(claim.membershipno);
    let response = await fetch(`http://localhost:8070/claim/${policy_book[0].bookingId}/${userId}/${claim.membershipno}`, {
        method: "POST",
        body: JSON.stringify({
            type: null,
            aadharNumber: claim.aadharNo,
            hospitalName: claim.hospital,
            dateOfTreatment: new Date(),
            claimItem: null,
            amountToClaim: null,
            preauthorizedConfirmation: true,
            documents:[],
            followUpVisits: false,
            member:null,
            user:null,
            policyBookings:null
        }),
        headers: { "Content-Type": "application/json" }
    });



}