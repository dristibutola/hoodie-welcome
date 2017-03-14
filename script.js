function showProfile(data){

    // I am converting the JSON object to a string and inserting in the body.. too clumsy :p
    // you should properly get the values and use them beautifuly
    const profile_data = JSON.stringify(data);
    document.querySelector('body').innerHTML = profile_data;
}

function getProfile(data) {

    const access_token = data;

    //the browser localStorage api
    localStorage.setItem('access_token',access_token);

    // the browsers fetch api... is similiar to getJson but is complex..

    fetch('http://api.github.com/user?access_token=${access_token}')
    .then(data => data.json())
    .then(data => showProfile(data))
    .catch(err => console.error(err));

    //Using arrow functions

    // function(data){ return data.json() }
    // is same as
    // data => data.json()
}

function getAccessToken() {

    // why to fetch, if we have it already
    if(access_token == localStorage.getItem('access_token'))
        getProfile(access_token);

    const clientId = '14a973416657e234da0a' ;
    let code = window.location.search;
    code = code.replace("?code=", '');
    console.log('Got the code', code);

    // using javascript es6 template literals. they are encloses inside back ticks, the key under escape
    fetch('http://localhost:5000/${clientId}/${code}')
    .then(data => data.json())
    .then(data => getProfile(data.access_token))
    .catch(err => console.error(err));
}

function doWeHaveAccessToken(){
    // this will fail if localStorage is empty.
    if(access_token ==localStorage.getItem('access_token')){
        getProfile(access_token);
    }
    // nope we don't have it
    else{
        // do something ?
    }
}
// querySelector('just put your css selector here')
document.querySelector('button').addEventListener('click', getAccessToken)
document.addEventListener('DOMContentLoaded', doWeHaveAccessToken);
