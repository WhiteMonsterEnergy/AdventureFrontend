
const loginForm = document.getElementById("loginForm");
const loginPrompt = document.getElementById("loginPrompt");
const closeBtn = document.querySelector("#loginPrompt .close");

var activeProfile;

loginForm.onsubmit = async function ()
{
    event.preventDefault();

    const payload = {
        "name":     document.getElementById("usernameInp").value,
        "password": document.getElementById("passwordInp").value
    }

    activeProfile = await getBackend(payload, "profile/login");
    loginPrompt.style.display = "none";
}

// todo: post entry

// todo: fetch single

// todo: fetch list

// todo: update entry

// todo: delete entry


// set up LOGIN-modal
document.addEventListener('DOMContentLoaded', function()
{
    if (b5 && loginPrompt)
    {
        b5.onclick = function(e){ e.preventDefault(); loginPrompt.style.display = "block"; };
    }
    if (closeBtn && loginPrompt)
    {
        closeBtn.onclick = function(){ loginPrompt.style.display = "none"; };
    }
    window.addEventListener('click', function(event){
        if (event.target === loginPrompt) loginPrompt.style.display = "none";
    });
});
