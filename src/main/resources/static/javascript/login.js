// Get the modal
var modal = document.getElementById("loginPrompt");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// Get the button that opens the modal
var btn = document.getElementById("loginBtn");

var form = document.getElementById("loginForm");

// When the user clicks on the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside the modal, close it
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

form.onsubmit = async function (){

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

    return response.json();
}