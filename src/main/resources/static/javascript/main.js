// vis/skjul sider
function hideAll() {
    document.querySelectorAll('.page').forEach(el => el.style.display = 'none');
}
function show(id) {
    hideAll();
    var el = document.getElementById(id);
    if (el) el.style.display = 'block';
    window.scrollTo(0, 0);
}

// NAV
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

// Åbn booking fra employee-listen
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

// Tilbage fra detail
document.addEventListener('click', function(e){
    if (e.target && e.target.id === 'employee-back') {
        e.preventDefault();
        show('employee-bookings-page');
    }
});

// LOGIN-modal
document.addEventListener('DOMContentLoaded', function(){
    var loginPrompt = document.getElementById("loginPrompt");
    var closeBtn = document.querySelector("#loginPrompt .close");
    if (b5 && loginPrompt) {
        b5.onclick = function(e){ e.preventDefault(); loginPrompt.style.display = "block"; };
    }
    if (closeBtn && loginPrompt) {
        closeBtn.onclick = function(){ loginPrompt.style.display = "none"; };
    }
    window.addEventListener('click', function(event){
        if (event.target === loginPrompt) loginPrompt.style.display = "none";
    });
});

// BOOKING FORM → POST til backend
document.addEventListener('DOMContentLoaded', function(){
    const form = document.getElementById('booking-form-el');
    if (!form) return;

    form.addEventListener('submit', async function(e){
        e.preventDefault();

        const activity     = document.getElementById('activity').value;
        const date         = document.getElementById('date').value;      // YYYY-MM-DD
        const timeslot     = document.getElementById('timeslot').value;  // HH:mm
        const participants = Number(document.getElementById('participants').value);
        const groupType    = document.getElementById('groupType').value;
        const name         = document.getElementById('name').value;
        const email        = document.getElementById('email').value;

        const pad = n => String(n).padStart(2,'0');
        const startTime = `${date}T${timeslot}:00`;
        let endTime = (() => {
            const d = new Date(`${date}T${timeslot}:00`);
            d.setMinutes(d.getMinutes() + 120);
            return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:00`;
        })();

        const payload = {
            participants: participants,
            notes: `Kontakt: ${name} <${email}>, Gruppe: ${groupType}`,
            type: activity,
            startTime: startTime,
            endTime: endTime,
            totalPrice: 110.17,
            holdExpiresAt: endTime,
            visitorId: Math.floor(Math.random() * 100),
        };
        console.log('Booking payload:', payload);

        try {
            const res = await fetch('http://localhost:8081/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!res.ok) {
                const text = await res.text();
                alert('Fejl ved booking: ' + text);
                return;
            }

            const data = await res.json();

            show('employee-booking-detail-page');
            const set=(i,v)=>{ var el=document.getElementById(i); if(el) el.textContent=v; };
            set('detail-id', data.id || '—');
            set('detail-activity', activity);
            set('detail-date', date);
            set('detail-time', timeslot);
            set('detail-participants', participants);
            set('detail-contact', email);

            form.reset();
        } catch (err) {
            alert('Uventet fejl: ' + err.message);
        }
    });
});
