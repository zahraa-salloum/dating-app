const workshop_pages = {};

workshop_pages.base_url = "http://127.0.0.1:8000/api/v0.0.1/";

workshop_pages.getAPI = async (api_url) => {
    try{
        return await axios(api_url);
    }catch(error){
        console.log("Error from GET API");
    }
}

workshop_pages.postAPI = async (api_url, api_data, api_token = null) => {
    try{
        return await axios.post(
            api_url,
            api_data,
            {
                headers:{
                    'Authorization' : "token " + api_token
                }
            }
        );
    }catch(error){
        console.log("Error from POST API");
    }
}

workshop_pages.loadFor = (page) => {
    eval("workshop_pages.load_" + page + "();");
}

workshop_pages.load_signup = async () => {
    let name = document.getElementById('name');
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    
    
    function validateEmail() 
{
    email_value = email.value;
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email_value))
    {
        document.getElementById("emailmessage").innerText = "";
        return (true)
        
    }
    document.getElementById("emailmessage").innerText = "You have entered an invalid email address!";
    
    return (false)
}

function validateName(){
    name_value = name.value;
    if(name_value.length == 0){
        document.getElementById("namemessage").innerText = "Required field";
        return false;
    }
    document.getElementById("namemessage").innerText = "";
        return true;

}



function validatePassword() {
    password_value = password.value;
        errors = [];
    if (password_value.length < 8) {
        errors.push("Your password must be at least 8 characters..."); 
    }
    if (password_value.search(/[A-Z]/) < 0) {
        errors.push("Your password must contain at least one capital letter...");
    }
    if (password_value.search(/[0-9]/) < 0) {
        errors.push("Your password must contain at least one digit..."); 
    }
    if(password_value.search(/[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]/) < 0){
        errors.push("Your password must contain at least one special character..."); 
    }
    if (errors.length > 0) {
        let errors_string = errors.join("\n");
        document.getElementById("passwordmessage").innerHTML = errors_string;
        return false;
    }
    document.getElementById("passwordmessage").innerHTML = "";
    return true;
}

submit.addEventListener("click", async function(){
    validateName();
    validateEmail();
    validatePassword();
    

    const post_users_signup = workshop_pages.base_url + "authentication/register";
    
    let data = new FormData();
    data.append('name', name.value);
    data.append('email', email.value);
    data.append('password', password.value);
    

    const response = await workshop_pages.postAPI(post_users_signup,data);
    
    if(response.data['status'] == 'success'){
        document.getElementById("successmessage").innerHTML = "Sign up success. Please log in";
    }
  

    
})

    
}