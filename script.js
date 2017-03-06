

function getAccessToken(){
    const clientId = `14a973416657e234da0a`;
    var code = window.location.search;
    code = code.replace("?code=", '');
    console.log('Got the code',code);

    fetch(`http://localhost:5000/${clientId}/${code}`)
    .then(function(data) {
        return data.json;
    })
    .then(function(data){
        console.log(data);

    })
}
querySelectorAll('button').addEventListener('click', getAccessToken)
