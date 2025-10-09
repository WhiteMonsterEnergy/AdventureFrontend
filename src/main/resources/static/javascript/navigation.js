

const bookingTab = document.getElementById("bookingTab");
const bookingPg = document.getElementById("bookingPg");
bookingTab.onclick = function ()
{
    closeAll();
    bookingPg.style.display = "block";
}

const activityTab = document.getElementById("activityTab");
const activityPg = document.getElementById("activityPg");
activityTab.onclick = function ()
{
    closeAll();
    activityPg.style.display = "block";
}





function closeAll()
{
    bookingPg.style.display = "none";
    activityPg.style.display = "none";
}

// ====== LOGIN PROMPT ====== //

var loginBtn = document.getElementById("loginBtn");
var loginForm = document.getElementById("loginForm");
var loginPrompt = document.getElementById("loginPrompt");
var span = document.getElementsByClassName("close")[0];
loginBtn.onclick = function()
{
    loginPrompt.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function()
{
    loginPrompt.style.display = "none";
}

// When the user clicks anywhere outside the modal, close it
window.onclick = function(event)
{
    if (event.target === loginPrompt) {
        loginPrompt.style.display = "none";
    }
}
