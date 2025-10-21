let activeProfile; // set by 'login.js' when logged in

// Hide all pages
function hideAll() {
    document.querySelectorAll('.page').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.hero').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.nav').forEach(el => el.style.clear);
}

// show specified page
const show = function (id) {
    hideAll();
    var el = document.getElementById(id);
    if (el) el.style.display = 'block'; // todo: light up current tab
    window.scrollTo(0, 0);
}

// set up NAV buttons
const bookingBtn = document.getElementById("nav-booking");
if (bookingBtn) bookingBtn.onclick = function(e){
    e.preventDefault();
    show("booking-page");
    if (typeof fillBookingOptions === "function") fillBookingOptions();
};

const activityBtn = document.getElementById("nav-activities");
if (activityBtn) activityBtn.onclick = function(e){
    e.preventDefault();
    show("activities-page");
    document.querySelectorAll('.hero').forEach(el => el.style.display = 'block');
    if (typeof buildActivityGrid === "function") buildActivityGrid(); // ensure grid is (re)built
};

const b3 = document.getElementById("nav-prices");
if (b3) b3.onclick = function(e){ e.preventDefault(); show("prices-page"); };

const contactBtn = document.getElementById("nav-contact");
if (contactBtn) contactBtn.onclick = function(e){ e.preventDefault(); show("contact-page"); };

const loginBtn = document.getElementById("nav-login"); // login provides own popup-logic

const employeeBtn = document.getElementById("nav-employee");
if (employeeBtn) employeeBtn.onclick = function(e){ e.preventDefault(); show("employee-bookings-page"); };

const adminBtn = document.getElementById("nav-admin");
if (adminBtn) adminBtn.onclick = function(e){
    e.preventDefault();
    show("admin-page");
    if (typeof fillActivityList === "function") fillActivityList();
};

const bookingListBtn = document.getElementById("nav-booked-activities");
if (bookingListBtn) bookingListBtn.onclick = function(e) { e.preventDefault(); show("booked-activities-page"); };

// HERO "Start booking" button → go directly to booking page and load activities
const startBookingBtn = document.getElementById("startBookingBtn");
if (startBookingBtn) {
    startBookingBtn.onclick = function(e) {
        e.preventDefault();
        show("booking-page");
        if (typeof fillBookingOptions === "function") fillBookingOptions();
    };
}

// "global" methods for communication with backend
const getBackend    = async function(endpoint)          { return await wireBackend(endpoint, null, "GET"); }
const postBackend   = async function(endpoint, payload) { return await wireBackend(endpoint, payload, "POST"); }
const patchBackend  = async function(endpoint, payload) { return await wireBackend(endpoint, payload, "PATCH"); }
const deleteBackend = async function(endpoint, payload) { return await wireBackend(endpoint, payload, "DELETE"); }

const wireBackend = async function(endpoint, payload, method) {
    const fetchOptions = { method: method };
    if (payload) {
        fetchOptions.headers = { "content-type": "application/json" };
        fetchOptions.body = JSON.stringify(payload);
    }

    const url = "http://localhost:8081/api/" + endpoint;
    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }
    return response.json();
}
