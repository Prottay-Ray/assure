let input_medi_1 = document.getElementById("input_medi_1");

let input_medi_2 = document.getElementById("input_medi_2");



input_medi_1.addEventListener('click', () =>{
    let user_d = JSON.parse(localStorage.getItem("userDetails"));

    input_medi_1.style.borderColor = "#118592";
    document.getElementById("yes").style.color = "#118592";

    input_medi_2.style.borderColor = "#7B7E84";
    document.getElementById("no").style.color = "#7B8384";

    Object.assign(user_d,{"is_taking_medicines" : true});

    localStorage.setItem("userDetails", JSON.stringify(user_d));

    localStorage.setItem("medicine", JSON.stringify(true));
})

input_medi_2.addEventListener('click', () =>{
    let user_d = JSON.parse(localStorage.getItem("userDetails"));

    input_medi_2.style.borderColor = "#118592";
    document.getElementById("no").style.color = "#118592";

    input_medi_1.style.borderColor = "#7B7E84";
    document.getElementById("yes").style.color = "#7B8384";

    Object.assign(user_d,{"is_taking_medicines" : false});

    localStorage.setItem("userDetails", JSON.stringify(user_d));

    localStorage.setItem("medicine", JSON.stringify(false));
})

document.getElementById("btn_4").addEventListener('click', () =>{
    window.location = "catalog.htm"
});