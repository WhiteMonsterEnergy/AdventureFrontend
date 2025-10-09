function hideAll() {
    document.querySelectorAll('.page').forEach(el => el.style.display = 'none');
}

function show(id) {
    hideAll();
    var el = document.getElementById(id);
    if (el) el.style.display = 'block';
    window.scrollTo(0, 0);
}

var b1 = document.getElementById("nav-booking");
if (b1) b1.onclick = function(e){ e.preventDefault(); show("booking-page"); };

var b2 = document.getElementById("nav-activities");
if (b2) b2.onclick = function(e){ e.preventDefault(); show("activities-page"); };

var b3 = document.getElementById("nav-prices");
if (b3) b3.onclick = function(e){ e.preventDefault(); show("prices-page"); };

var b4 = document.getElementById("nav-contact");
if (b4) b4.onclick = function(e){ e.preventDefault(); show("contact-page"); };

var b5 = document.getElementById("nav-login");

var b6 = document.getElementById("nav-employee");
if (b6) b6.onclick = function(e){ e.preventDefault(); show("employee-bookings-page"); };

var b7 = document.getElementById("nav-admin");
if (b7) b7.onclick = function(e){ e.preventDefault(); show("admin-page"); };

document.addEventListener('click', function(e){
    if (e.target && e.target.classList.contains('open-booking')) {
        e.preventDefault();
        var id = e.target.getAttribute('data-booking-id') || '—';
        var act = e.target.getAttribute('data-activity') || '—';
        var d = e.target.getAttribute('data-date') || '—';
        var t = e.target.getAttribute('data-time') || '—';
        var p = e.target.getAttribute('data-participants') || '—';
        var c = e.target.getAttribute('data-contact') || '—';
        show('employee-booking-detail-page');
        var set = (i,v)=>{ var el=document.getElementById(i); if(el) el.textContent=v; };
        set('detail-id', id);
        set('detail-activity', act);
        set('detail-date', d);
        set('detail-time', t);
        set('detail-participants', p);
        set('detail-contact', c);
    }
});

document.addEventListener('click', function(e){
    if (e.target && e.target.id === 'employee-back') {
        e.preventDefault();
        show('employee-bookings-page');
    }
});


// ====== LOGIN PROMPT ====== //

var loginPrompt = document.getElementById("loginPrompt");
var span = document.getElementsByClassName("close")[0];
b5.onclick = function()
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
