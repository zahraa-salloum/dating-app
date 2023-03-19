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

workshop_pages.load_find = async () => {
    const container = document.getElementById('container');
    const user_id = window.localStorage.getItem('user_id');
    const token = window.localStorage.getItem('token');

    const get_users = workshop_pages.base_url + "users_actions/opposite_gender/"+user_id;
    const response_users = await workshop_pages.getAPI(get_users,token);

    for(let i=0 ; i < response_users.data['opposite_users'].length; i++){
        const name_div = document.createElement('div');
        name_div.textContent = response_users.data['opposite_users'][i]['name'];
        name_div.classList = 'container_name'

        const id_button = document.createElement('button');
        id_button.textContent = "chat";
        id_button.id = "chat";
        id_button.name = response_users.data['opposite_users'][i]['user_id'];
        id_button.classList='btngreen'

        const id_block = document.createElement('button');
        id_block.textContent = "block";
        id_block.id = "block";
        id_block.name = response_users.data['opposite_users'][i]['user_id'];
        id_block.classList='btn'

        const id_favorite = document.createElement('button');
        id_favorite.textContent = "favorite";
        id_favorite.id = "favorite";
        id_favorite.name = response_users.data['opposite_users'][i]['user_id'];
        id_favorite.classList='btnyellow';

        const line = document.createElement('hr');

        container.appendChild(name_div);
        name_div.appendChild(id_button);
        name_div.appendChild(id_block);
        name_div.appendChild(id_favorite);
        container.appendChild(line);

        id_button.addEventListener('click',()=>{
            window.localStorage.setItem('user_id_received', id_button.name
        )});
        id_block.addEventListener('click',async ()=>{
            const get_block = workshop_pages.base_url + "users_actions/block_user/"+user_id;
            const response_block = await workshop_pages.getAPI(get_block+"?user_id_blocked="+id_block.name,token);
            console.log(response_block.data)
        });
        id_favorite.addEventListener('click',async ()=>{
            const get_favorite = workshop_pages.base_url + "users_actions/favorite_user/"+user_id;
            const response_favorite = await workshop_pages.getAPI(get_favorite+"?user_id_favorite="+id_favorite.name,token);
            console.log(response_favorite.data)
        });



    }
   
}

workshop_pages.load_favorites = async () => {
    const container = document.getElementById('container');
    const container_two = document.getElementById('container_two');
    const user_id = window.localStorage.getItem('user_id');
    const token = window.localStorage.getItem('token');

    const get_favorites = workshop_pages.base_url + "users_actions/my_favorites/"+user_id;
    const response_favorites = await workshop_pages.getAPI(get_favorites,token);

    for(let i=0 ; i < response_favorites.data['my_favorites'].length; i++){
        const name_div = document.createElement('div');
        name_div.textContent = response_favorites.data['my_favorites'][i]['name'];

        const line = document.createElement('hr');

        container.appendChild(name_div);
        container.appendChild(line);
    }

    const get_blocks = workshop_pages.base_url + "users_actions/my_blocked/"+user_id;
    const response_blocks = await workshop_pages.getAPI(get_blocks,token);

    for(let i=0 ; i < response_blocks.data['my_blocked'].length; i++){
        const name_div = document.createElement('div');
        name_div.textContent = response_blocks.data['my_blocked'][i]['name'];

        const line = document.createElement('hr');

        container_two.appendChild(name_div);
        container_two.appendChild(line);
    }
}

workshop_pages.load_notifications = async () => {
    const container = document.getElementById('container');
    const container_two = document.getElementById('container_two');
    const user_id = window.localStorage.getItem('user_id');
    const token = window.localStorage.getItem('token');

    const get_favorites = workshop_pages.base_url + "users_actions/who_favorite/"+user_id;
    const response_favorites = await workshop_pages.getAPI(get_favorites,token);

    for(let i=0 ; i < response_favorites.data['who_favorite'].length; i++){
        const name_div = document.createElement('div');
        name_div.textContent = response_favorites.data['who_favorite'][i]['name'];

        const line = document.createElement('hr');

        container.appendChild(name_div);
        container.appendChild(line);
    }

    const get_blocks = workshop_pages.base_url + "users_actions/who_blocked/"+user_id;
    const response_blocks = await workshop_pages.getAPI(get_blocks,token);

    for(let i=0 ; i < response_blocks.data['who_blocked'].length; i++){
        const name_div = document.createElement('div');
        name_div.textContent = response_blocks.data['who_blocked'][i]['name'];

        const line = document.createElement('hr');

        container_two.appendChild(name_div);
        container_two.appendChild(line);
    }
}

workshop_pages.load_filter = async () => {
    const container_age = document.getElementById('container_age');
    const container_location = document.getElementById('container_location');
    const container_name = document.getElementById('container_name');
    const year = document.getElementById('year');
    const country = document.getElementById('country');
    const name = window.localStorage.getItem('name');

    const token = window.localStorage.getItem('token');
    
    const submit_age = document.getElementById('submit_age');
    const submit_location = document.getElementById('submit_location');
    const submit_name = document.getElementById('submit_name');

    submit_age.addEventListener('click',async function(){
        let year_value = year.value;

        const get_year = workshop_pages.base_url + "users_actions/filter_age/"+year_value;
        const response_year = await workshop_pages.getAPI(get_year,token);

        for(let i=0 ; i < response_year.data['users'].length; i++){
            const name_div = document.createElement('div');
            name_div.textContent = response_year.data['users'][i]['name'];

            const line = document.createElement('hr');

            container_age.appendChild(name_div);
            container_age.appendChild(line);
    }
    })
}






