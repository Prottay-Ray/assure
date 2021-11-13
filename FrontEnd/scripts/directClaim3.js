document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    if(document.activeElement.classList.value=="next"){
        window.location = "./directClaim3i.html";
    }
    else{
        window.location = "./directClaim2.html";
    }
});