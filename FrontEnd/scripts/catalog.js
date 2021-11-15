let policyList = JSON.parse(localStorage.getItem('policyList'));

let cardStore = document.getElementById('bookings');
function loadInsurances() {

    for (let el of policyList) {

        let div = document.createElement('div');
        div.innerHTML = `<div class="bookingCard">
        <p class="policyName">
            ${el.policyName}
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
                    Rs. ${el.coverAmount1}
                </p>
            </span>
            <span class="left_valid">
                <p class="valid_title">
                    Premium/month
                </p>
                <p class="valid_thru">
                    Rs. ${el.premium1}
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
        localStorage.setItem("PolicySelected", JSON.stringify(el));
        window.location = "explore_maxBupa.html";
    }
        
    cardStore.appendChild(div);

    }
    
}

loadInsurances();