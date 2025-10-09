
var loginForm = document.getElementById("loginForm");

var profile;
loginForm.onsubmit = async function (){

    event.preventDefault();

    const obj = {
        "name": "simon",
        "password": "1234"
    }

    const objectAsJsonString = JSON.stringify(obj);

    const fetchOptions =
    {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: objectAsJsonString
    };

    const response = await fetch("http://localhost:8081/login",fetchOptions);



    if (!response.ok)
    {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }

    profile = response.json();

    return profile;
}