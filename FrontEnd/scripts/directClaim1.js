
document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    // console.log(JSON.stringify(Object.fromEntries(formData)));
    // console.log(Object.fromEntries(formData));
    if(document.activeElement.classList.value=="next"){
        addToTreatmentDetails(Object.fromEntries(formData));
    }
    else{
        window.location = "./directClaim.html";
    }
});

if(localStorage.getItem("treatmentDetails")==null){
    localStorage.setItem("treatmentDetails", JSON.stringify([]));
}

function addToTreatmentDetails(p){
    let openTreatmentDetails = JSON.parse(localStorage.getItem("treatmentDetails"));
    openTreatmentDetails.push(p);
    localStorage.setItem("treatmentDetails", JSON.stringify(openTreatmentDetails));

    window.location = "./directClaim2.html";
}

