let input_regis_log = document.querySelectorAll(".input_regis_log");

input_regis_log.forEach((input) => {
    input.addEventListener('click', (e) => {
        e.target.style.borderBottom = "1px solid #063035";
        input_regis_log.forEach((i) =>{
            if(i != e.target && i.value.length <= 0){
                i.style.borderBottom = "1px solid #C4C4C4";
            }
        })
    });
});

let email_symb = document.getElementById("email_symb");
let email_error = document.getElementById("email_error");
let pass_symb = document.getElementById("pass_symb");
let pass_error = document.getElementById("pass_error");

let log_btn = document.getElementById("log_btn");

log_btn.addEventListener('click', async(e) =>{

    let email_input = document.getElementById("email_input").value;
    let pass_input = document.getElementById("pass_input").value;

    e.preventDefault();

    clearAllErrors();

    const loginData = {
        email : email_input,
        pass : pass_input,
    };

    fetch("http://localhost:8070/user/getUser", {
        method:"POST",
        body: JSON.stringify(loginData),
        mode: 'cors',
        headers:{
            "Content-Type":"application/json; charset=UTF-8"
        },
    })
    .then((res) => {
       if(res.status == 200){
            res.json().then((r) => {
                localStorage.setItem("UserID", JSON.stringify(r));
                window.location = "./home_navigation.htm";
            })
       }
       else{
            res.json().then((r) =>{
                if(r.message == "Enter email"){
                    email_symb.style.visibility = "visible";
                    email_error.style.visibility = "visible";
                    email_error.innerText = "Enter email";
                }
                else if(r.message == "Enter correct email"){
                    email_symb.style.visibility = "visible";
                    email_error.style.visibility = "visible";
                    email_error.innerText = "Enter correct email";
                }
                else if(r.message == "Email Already Registered"){
                    email_symb.style.visibility = "visible";
                    email_error.style.visibility = "visible";
                    email_error.innerText = "Email Already Registered";
                }
                else if(r.message == "Enter pass"){
                    pass_symb.style.visibility = "visible";
                    pass_error.style.visibility = "visible";
                    pass_error.innerText = "Enter password";
                }
                else if(r.message == "Password should be more that 4 characters"){
                    pass_symb.style.visibility = "visible";
                    pass_error.style.visibility = "visible";
                    pass_error.innerText = "Password should be more that 4 characters";
                }
                else if(r.message == "Email or password is incorrect"){
                    email_symb.style.visibility = "visible";
                    email_error.style.visibility = "visible";
                    email_error.innerText = "Email or password is incorrect";
                    pass_symb.style.visibility = "visible";
                    pass_error.style.visibility = "visible";
                    pass_error.innerText = "Email or password is incorrect";
                }
                else if(r.message == "Email not registered"){
                    email_symb.style.visibility = "visible";
                    email_error.style.visibility = "visible";
                    email_error.innerText = "Email not registered";
                }
            })
        }
    })
})

let clearAllErrors = () =>{
    let vanish = document.querySelectorAll(".vanish");
    vanish.forEach((e) => {
        e.style.visibility = "hidden";
    })
}