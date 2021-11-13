

document.getElementById("btn_3").addEventListener('click', () =>{
    let age = JSON.parse(localStorage.getItem("members"));


    Object.assign(user_d,{"userAge" : age.ageOfSelf});

    Object.assign(user_d,{"city" : document.getElementById("input_live").value});

    Object.assign(user_d, {"is_taking_medicines" : null});


    localStorage.setItem("city", JSON.stringify(document.getElementById("input_live").value));
    
    
    window.location = "health_insurance_step4.html"
})