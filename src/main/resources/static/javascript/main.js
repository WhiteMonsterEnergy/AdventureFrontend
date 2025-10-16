
// Hide all pages
function hideAll() {
    document.querySelectorAll('.page').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.nav').forEach(el => el.style.clear);
}

// show specified page
function show(id) {
    hideAll();
    var el = document.getElementById(id);
    if (el) el.style.display = 'block';
    window.scrollTo(0, 0);
}

// set up NAV buttons - each first hides any-and-all pages, then shows related page
const b1 = document.getElementById("nav-booking");
if (b1) b1.onclick = function(e){ e.preventDefault(); show("booking-page"); };
const b2 = document.getElementById("nav-activities");
if (b2) b2.onclick = function(e){ e.preventDefault(); show("activities-page"); };
const b3 = document.getElementById("nav-prices");
if (b3) b3.onclick = function(e){ e.preventDefault(); show("prices-page"); };
const b4 = document.getElementById("nav-contact");
if (b4) b4.onclick = function(e){ e.preventDefault(); show("contact-page"); };
const b5 = document.getElementById("nav-login");
// login provides own popup-logic
const b6 = document.getElementById("nav-employee");
if (b6) b6.onclick = function(e){ e.preventDefault(); show("employee-bookings-page"); };
const b7 = document.getElementById("nav-admin");
if (b7) b7.onclick = function(e){ e.preventDefault(); show("admin-page"); };

// "global" methods for communication with backend
const    getBackend = async function(payload, endpoint) {return await wireBackend(payload, endpoint,    "GET");}
const   postBackend = async function(payload, endpoint) {return await wireBackend(payload, endpoint,   "POST");}
const  patchBackend = async function(payload, endpoint) {return await wireBackend(payload, endpoint,  "PATCH");}
const deleteBackend = async function(payload, endpoint) {return await wireBackend(payload, endpoint, "DELETE");}
const wireBackend = async function(payload, endpoint, method)
{
    const objectAsJsonString = JSON.stringify(payload); // slightly easier debugging

    const fetchOptions =
    {
        method: method,
        headers: {"content-type": "application/json"},
        body: JSON.stringify(payload)
    };

    const url = "http://localhost:8081/api/" + endpoint;
    const response = await fetch(url, fetchOptions);

    if (!response.ok)
    {
        const errorMessage = await response.text();
        throw new Error(errorMessage); // todo: proper errorhandling (eg return null)
    }

    return response.json();
}