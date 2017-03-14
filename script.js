function showProfile(data){
    const profile_data = JSON.stringify(data);
    document.querySelector('body').innerHTML = profile_data;
}

function getProfile(data) {

    const access_token = data;

    
    localStorage.setItem('access_token',access_token);

    fetch(`https://api.github.com/user?access_token=${access_token}`)
    .then(data => data.json())
    .then(data => showProfile(data))
    .catch(err => console.error(err));
}

function getAccessToken() {

    if(access_token = localStorage.getItem('access_token'))
        getProfile(access_token);

    const clientId = `14a973416657e234da0a`;
    let code = window.location.search;
    code = code.replace("?code=", '');
    console.log('Got the code', code);

    fetch(`http://localhost:5000/${clientId}/${code}`)
    .then(data => data.json())
    .then(data => getProfile(data.access_token))
    .catch(err => console.error(err));
}

function doWeHaveAccessToken(){
    if(access_token = localStorage.getItem('access_token')){
        getProfile(access_token);
    }
}
document.querySelector('button').addEventListener('click', getAccessToken)
document.addEventListener('DOMContentLoaded', doWeHaveAccessToken);
