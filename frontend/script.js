const workshop_pages = {};

workshop_pages.base_url = "http://127.0.0.1:8000/api/v0.0.1/";

workshop_pages.getAPI = async (api_url,api_token) => {
    try{
        return await axios(
            api_url,
            {
                headers:{
                    'Authorization' : "Bearer " + api_token
                }
            }
            );
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
                    'Authorization' : "Bearer " + api_token
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


workshop_pages.load_login = async () => {
    let submit = document.getElementById('submit')
    submit.addEventListener('click', logIn);

    async function logIn() {
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;

        let data = new FormData();
        data.append('email', email);
        data.append('password', password);

        const post_user_login = workshop_pages.base_url + "authentication/login";
        const response = await workshop_pages.postAPI(post_user_login,data);
        if(response.data['status']=='success'){
            window.localStorage.setItem('user_id', response.data['user']['id']);
            window.localStorage.setItem('token', response.data['authorisation']['token']);
            window.localStorage.setItem('name', response.data['user']['name']);
            location.replace("user.html")
            console.log(response.data)

        
            
        

        }
    }
}

workshop_pages.load_out = async () => {
    let out = document.getElementById('out');
    out.addEventListener("click", function(){
        localStorage.clear();
        location.replace("main.html")
    })
}

workshop_pages.load_profile = async () => {
    const bio = document.getElementById('bio'); 
    const status = document.getElementById('status');
    const gender = document.getElementById('gender');
    const country = document.getElementById('country');
    const job = document.getElementById('job');
    const education = document.getElementById('education');
    const dob = document.getElementById('dob');
    const picture = document.getElementById('picture');
    const picture_optional = document.getElementById('picture_optional');
    

    const submit = document.getElementById('submit');
    const add = document.getElementById('add');
    const user_id = window.localStorage.getItem('user_id');
    const token = window.localStorage.getItem('token');

    submit.addEventListener("click", async function(){
        let bio_value = bio.value;
        let status_value = status.value;
        let gender_value = gender.value;
        let country_value = country.value;
        let job_value = job.value;
        let education_value = education.value;
        let dob_value = dob.value; 
        let picture_value = picture.value;

        const get_user_info = workshop_pages.base_url + "users_actions/users_info/"+user_id;
        const response_user_info = await workshop_pages.getAPI(get_user_info+'?bio='+bio_value+'&status='+status_value+'&gender='+gender_value+'&user_id='+user_id+'&country='+country_value+'&job='+job_value+'&education='+education_value+'&dob='+dob_value+'&profile_picture='+picture_value,token);
        console.log(response_user_info.data)
        
    })
    add.addEventListener("click", async function(){
        let picture_optional_value = picture_optional.value;
        const get_picture_optional = workshop_pages.base_url + "users_actions/upload_picture/"+user_id;
        const response_picture_optional = await workshop_pages.getAPI(get_picture_optional+'?picture='+picture_optional_value,token);
        console.log(response_picture_optional.data)
    })
}
