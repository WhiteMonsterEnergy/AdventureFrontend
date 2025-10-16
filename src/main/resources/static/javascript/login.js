
var loginForm = document.getElementById("loginForm");

var profile;
loginForm.onsubmit = async function (){

    event.preventDefault();

    const obj = {
        "name":     document.getElementById("usernameInp").value,
        "password": document.getElementById("passwordInp").value
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

// Import the pure login function from the DOM-free module
import { login } from './login.api.js';

// Get the login form element by its id
// (If the page doesn't include the form, nothing is attached)
const loginForm = document.getElementById('loginForm');

// Attach a submit handler only when the form exists
if (loginForm) {
    // Set an async submit handler that receives the event parameter
    loginForm.onsubmit = async function (event) {
        // Prevent the browser's default form submission/navigation
        event.preventDefault();

        // Read the username value from the input with id 'usernameInp'
        const username = document.getElementById('usernameInp').value;
        // Read the password value from the input with id 'passwordInp'
        const password = document.getElementById('passwordInp').value;

        // Call the pure login function and await the resolved profile
        try {
            const profile = await login(username, password);
            // Keep profile on window for compatibility with other scripts
            window.profile = profile;
        } catch (err) {
            // Log network, parsing, or application errors
            console.error('Login failed:', err);
            // UI error display can be added here if desired
        }
    };
}