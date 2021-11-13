
let self_div = document.getElementById("self");
let spouse_div = document.getElementById("spouse");
let son_div = document.getElementById("son");
let daughter_div = document.getElementById("daughter");
let father_div = document.getElementById("father");
let mother_div = document.getElementById("mother");

localStorage.setItem("members",JSON.stringify({}));

localStorage.setItem("memberCount",JSON.stringify(0));

self_div.addEventListener('click', () =>{
    let mem = JSON.parse(localStorage.getItem("members"));

    if(Object.keys(mem).some(v => v == "ageOfSelf")){
        self_div.style.borderColor = "#7B7E84";
        document.getElementById("self_text").style.color = "#7B8384";

        delete mem["ageOfSelf"];
        localStorage.setItem("members",JSON.stringify(mem));
    }
    else{
        self_div.style.borderColor = "#118592";
        document.getElementById("self_text").style.color = "#118592";

        Object.assign(mem,{"ageOfSelf" : 0});
        localStorage.setItem("members",JSON.stringify(mem));
    }

})

spouse_div.addEventListener('click', () =>{
    let mem = JSON.parse(localStorage.getItem("members"));
    let memCount = JSON.parse(localStorage.getItem("memberCount"));

    if(Object.keys(mem).some(v => v == "ageOfSpouse")){
        spouse_div.style.borderColor = "#7B7E84";
        document.getElementById("spouse_text").style.color = "#7B8384";

        delete mem["ageOfSpouse"];
        localStorage.setItem("members",JSON.stringify(mem));

        memCount--;

        localStorage.setItem("memberCount",JSON.stringify(memCount));
    }
    else{
        spouse_div.style.borderColor = "#118592";
        document.getElementById("spouse_text").style.color = "#118592";
    
        Object.assign(mem,{"ageOfSpouse" : 0});
        localStorage.setItem("members",JSON.stringify(mem));
    
        memCount++;
    
        localStorage.setItem("memberCount",JSON.stringify(memCount));
    }
})

son_div.addEventListener('click', () =>{
    let mem = JSON.parse(localStorage.getItem("members"));
    let memCount = JSON.parse(localStorage.getItem("memberCount"));

    if(Object.keys(mem).some(v => v == "ageOfSon")){
        son_div.style.borderColor = "#7B7E84";
        document.getElementById("son_text").style.color = "#7B8384";

        delete mem["ageOfSon"];
        localStorage.setItem("members",JSON.stringify(mem));

        memCount--;

        localStorage.setItem("memberCount",JSON.stringify(memCount));
    }
    else{
        son_div.style.borderColor = "#118592";
        document.getElementById("son_text").style.color = "#118592";
    
        Object.assign(mem,{"ageOfSon" : 0});
        localStorage.setItem("members",JSON.stringify(mem));
    
        memCount++;
    
        localStorage.setItem("memberCount",JSON.stringify(memCount));
    }
    
})

daughter_div.addEventListener('click', () =>{
    let mem = JSON.parse(localStorage.getItem("members"));
    let memCount = JSON.parse(localStorage.getItem("memberCount"));

    if(Object.keys(mem).some(v => v == "ageOfDaughter")){
        daughter_div.style.borderColor = "#7B7E84";
        document.getElementById("daughter_text").style.color = "#7B8384";

        delete mem["ageOfDaughter"];
        localStorage.setItem("members",JSON.stringify(mem));

        memCount--;

        localStorage.setItem("memberCount",JSON.stringify(memCount));
    }
    else{
        daughter_div.style.borderColor = "#118592";
        document.getElementById("daughter_text").style.color = "#118592";
    
        Object.assign(mem,{"ageOfDaughter" : 0});
        localStorage.setItem("members",JSON.stringify(mem));
    
        memCount++;
    
        localStorage.setItem("memberCount",JSON.stringify(memCount));
    }
    
})

father_div.addEventListener('click', () =>{
    let mem = JSON.parse(localStorage.getItem("members"));
    let memCount = JSON.parse(localStorage.getItem("memberCount"));

    if(Object.keys(mem).some(v => v == "ageOfFather")){
        father_div.style.borderColor = "#7B7E84";
        document.getElementById("father_text").style.color = "#7B8384";

        delete mem["ageOfFather"];
        localStorage.setItem("members",JSON.stringify(mem));

        memCount--;

        localStorage.setItem("memberCount",JSON.stringify(memCount));
    }
    else{
        father_div.style.borderColor = "#118592";
        document.getElementById("father_text").style.color = "#118592";
    
        Object.assign(mem,{"ageOfFather" : 0});
        localStorage.setItem("members",JSON.stringify(mem));
    
        memCount++;
    
        localStorage.setItem("memberCount",JSON.stringify(memCount));
    }

})

mother_div.addEventListener('click', () =>{
    let mem = JSON.parse(localStorage.getItem("members"));
    let memCount = JSON.parse(localStorage.getItem("memberCount"));

    if(Object.keys(mem).some(v => v == "ageOfMother")){
        mother_div.style.borderColor = "#7B7E84";
        document.getElementById("mother_text").style.color = "#7B8384";

        delete mem["ageOfMother"];
        localStorage.setItem("members",JSON.stringify(mem));

        memCount--;

        localStorage.setItem("memberCount",JSON.stringify(memCount));
    }
    else{
        mother_div.style.borderColor = "#118592";
        document.getElementById("mother_text").style.color = "#118592";
    
        Object.assign(mem,{"ageOfMother" : 0});
        localStorage.setItem("members",JSON.stringify(mem));
    
        memCount++;
    
        localStorage.setItem("memberCount",JSON.stringify(memCount));
    }
})


document.getElementById("btn_1").addEventListener('click', () =>{
    let mem = JSON.parse(localStorage.getItem("members"));

    if(Object.keys(mem).length === 0){
        document.getElementById("atleast").style.visibility = "visible";
    }
    else{   
        window.location = "health_insurance_step2.html"
    }
})




