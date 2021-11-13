let policyList = [
    {
        "policyId": 1,
        "policyName": "MAX BUPA HEALTH INSURANCE",
        "roomRentLimit": "AC/NON AC",
        "claimBonus": 10.0,
        "pedWaitingPeriod": "2 YEARS",
        "copayPercent": 0.0,
        "isCriticalIllnessCovered": true,
        "isMaternityCovered": true,
        "isRestorationBenefitsCovered": true,
        "premium1": 19000.0,
        "premium2": 22800.0,
        "premium3": 26600.0,
        "coverAmount1": 100000.0,
        "coverAmount2": 200000.0,
        "coverAmount3": 300000.0,
        "tenure1": 3,
        "tenure2": 4,
        "tenure3": 5
    },
    {
        "policyId": 2,
        "policyName": "RELIANCE HEALTH INSURANCE",
        "roomRentLimit": "NON AC",
        "claimBonus": 10.0,
        "pedWaitingPeriod": "3 YEARS",
        "copayPercent": 0.0,
        "isCriticalIllnessCovered": true,
        "isMaternityCovered": true,
        "isRestorationBenefitsCovered": true,
        "premium1": 25000.0,
        "premium2": 30000.002,
        "premium3": 35000.0,
        "coverAmount1": 400000.0,
        "coverAmount2": 500000.0,
        "coverAmount3": 600000.0,
        "tenure1": 5,
        "tenure2": 6,
        "tenure3": 7
    }
];
let cardStore = document.getElementById('bookings');
function loadInsurances() {
    var i = -1;
    for (let {premium1, policyName, coverAmount1} of policyList) {

        i++;
        let div = document.createElement('div');
        div.innerHTML = `<div class="bookingCard">
        <p class="policyName">
            ${policyName}
        </p>
        <p class="product_title">
            Product
        </p>
        <p class="insurance_type">
            Health Insurance
        </p>
        <div class="cover_block">
            <span>
                <p class="cover_title">
                    Cover
                </p>
                <p class="cover_amount">
                    Rs. ${coverAmount1}
                </p>
            </span>
            <span class="left_valid">
                <p class="valid_title">
                    Premium/month
                </p>
                <p class="valid_thru">
                    Rs. ${premium1}
                </p>
            </span>
        </div>
        <div class="details_div">
            <p class="view_details">
                View Details
            </p>
            <img src="../icons/detail.svg" alt="" class="detail_arrow">
        </div>
    </div>`

    
    div.onclick = () => {
        localStorage.setItem("PolicySelected", JSON.stringify(policyList[i]));
        window.location = "explore_maxBupa.html";
    }
        
    cardStore.appendChild(div);

    }
    
}

loadInsurances();