
let step = document.getElementById("step_2");

let mem = JSON.parse(localStorage.getItem("members"));

let allDetails = [];
    
for(const keys in mem){
    if(keys == "ageOfSelf"){
        let span1 = document.createElement("span");
        span1.style.position = "absolute";
        span1.style.top = "10%";
        span1.innerText = "How old are you?";
        span1.setAttribute("class","input_text");
        step.append(span1);

        let self_div = document.createElement("input");
        self_div.style.position = "absolute";
        self_div.style.top = "14%";
        self_div.setAttribute("class","input_box");
        self_div.setAttribute("id","self_d");
        step.appendChild(self_div);
        
    }
    if(keys == "ageOfSpouse"){
        let span1 = document.createElement("span");
        span1.style.position = "absolute";
        span1.style.top = "20%";
        span1.innerText = "How old is your spouse?";
        span1.setAttribute("class","input_text");
        step.append(span1);

        let spouse = document.createElement("input");
        spouse.style.position = "absolute";
        spouse.style.top = "24%";
        spouse.setAttribute("class","input_box");
        spouse.setAttribute("id","spouse_d");
        step.appendChild(spouse);
    }

    if(keys == "ageOfSon"){
        let span1 = document.createElement("span");
        span1.style.position = "absolute";
        span1.style.top = "30%";
        span1.innerText = "How old is your son?";
        span1.setAttribute("class","input_text");
        step.append(span1);

        let son = document.createElement("input");
        son.style.position = "absolute";
        son.style.top = "34%";
        son.setAttribute("class","input_box");
        son.setAttribute("id","son_d");
        step.appendChild(son);
    }

    if(keys == "ageOfDaughter"){
        let span1 = document.createElement("span");
        span1.style.position = "absolute";
        span1.style.top = "40%";
        span1.innerText = "How old is your daughter?";
        span1.setAttribute("class","input_text");
        step.append(span1);

        let daughter = document.createElement("input");
        daughter.style.position = "absolute";
        daughter.style.top = "44%";
        daughter.setAttribute("class","input_box");
        daughter.setAttribute("id","daughter_d");
        step.appendChild(daughter);
    }

    if(keys == "ageOfFather"){
        let span1 = document.createElement("span");
        span1.style.position = "absolute";
        span1.style.top = "50%";
        span1.innerText = "How old is your father?";
        span1.setAttribute("class","input_text");
        step.append(span1);

        let father = document.createElement("input");
        father.style.position = "absolute";
        father.style.top = "54%";
        father.setAttribute("class","input_box");
        father.setAttribute("id","father_d");
        step.appendChild(father);
    }

    if(keys == "ageOfMother"){
        let span1 = document.createElement("span");
        span1.style.position = "absolute";
        span1.style.top = "60%";
        span1.innerText = "How old is your mother?";
        span1.setAttribute("class","input_text");
        step.append(span1);

        let mother = document.createElement("input");
        mother.style.position = "absolute";
        mother.style.top = "64%";
        mother.setAttribute("class","input_box");
        mother.setAttribute("id","mother_d");
        step.appendChild(mother);
    }
}

document.getElementById("btn_2").addEventListener('click', () =>{
    let mem = JSON.parse(localStorage.getItem("members"));

    let self_d = document.getElementById("self_d");
    let spouse_d = document.getElementById("spouse_d");
    let son_d = document.getElementById("son_d");
    let daughter_d = document.getElementById("daughter_d");
    let father_d = document.getElementById("father_d");
    let mother_d = document.getElementById("mother_d");

    
    let self_age = document.getElementById("self_d").value;
    localStorage.setItem("self_age", JSON.stringify(self_age));

    
    let spouse_age = document.getElementById("spouse_d").value;
    localStorage.setItem("spouse_age", JSON.stringify(spouse_age));


    if(self_d.value != null){
        Object.assign(mem,{"ageOfSelf" : self_d.value});
        localStorage.setItem("members",JSON.stringify(mem));
    }
    if(spouse_d.value != null){
        Object.assign(mem,{"ageOfSpouse" : spouse_d.value});
        localStorage.setItem("members",JSON.stringify(mem));
    }
    if(son_d != null){
        Object.assign(mem,{"ageOfSon" : son_d.value});
        localStorage.setItem("members",JSON.stringify(mem));
    }
    if(daughter_d != null){
        Object.assign(mem,{"ageOfDaughter" : daughter_d.value});
        localStorage.setItem("members",JSON.stringify(mem));
    }
    if(father_d != null){
        Object.assign(mem,{"ageOfFather" : father_d.value});
        localStorage.setItem("members",JSON.stringify(mem));
    }
    if(mother_d != null){
        Object.assign(mem,{"ageOfMother" : mother_d.value});
        localStorage.setItem("members",JSON.stringify(mem));
    }

    window.location = "health_insurance_step3.html"
})