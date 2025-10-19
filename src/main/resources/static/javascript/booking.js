const activitySelector = document.getElementById("activityOptions");
const bookingForm      = document.getElementById("bookingForm");
const activityHelp     = document.getElementById("activityHelp");
const chosenWrap       = document.getElementById("chosenActivities");

let allActivities = [];
let chosen = []; // [{id, title}]

const renderChosen = () => {
    chosenWrap.innerHTML = "";
    chosen.forEach(a => {
        const chip = document.createElement("button");
        chip.type = "button";
        chip.className = "chip";
        chip.setAttribute("data-id", a.id);
        chip.textContent = a.title + " ×";
        chip.addEventListener("click", () => {
            chosen = chosen.filter(c => c.id !== a.id);
            renderChosen();
            renderOptions();
            updateCounter();
        });
        chosenWrap.appendChild(chip);
    });
};

const renderOptions = () => {
    activitySelector.innerHTML = "";
    const ph = document.createElement("option");
    ph.value = "";
    ph.disabled = true;
    ph.selected = true;
    ph.textContent = chosen.length === 0 ? "Vælg aktivitet" : "Tilføj en aktivitet";
    activitySelector.appendChild(ph);

    const chosenIds = new Set(chosen.map(c => String(c.id)));
    allActivities
        .filter(a => !chosenIds.has(String(a.id)))
        .forEach(a => {
            const opt = document.createElement("option");
            opt.value = a.id;
            opt.textContent = a.title;
            activitySelector.appendChild(opt);
        });

    activitySelector.disabled = chosen.length >= 10;
};

const updateCounter = () => {
    if (activityHelp) activityHelp.textContent = `${chosen.length}/10 valgt`;
};

const fillBookingOptions = async () => {
    const list = await getBackend("activity");
    allActivities = list || [];
    chosen = [];
    renderChosen();
    renderOptions();
    updateCounter();
};

activitySelector.addEventListener("change", () => {
    const val = activitySelector.value;
    if (!val) return;
    if (chosen.length >= 10) return;

    const act = allActivities.find(a => String(a.id) === String(val));
    if (!act) return;
    if (chosen.some(c => String(c.id) === String(act.id))) return;

    chosen.push({ id: act.id, title: act.title });
    renderChosen();
    renderOptions();
    updateCounter();
});

bookingForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (chosen.length === 0 || chosen.length > 10) {
        alert("Vælg mellem 1 og 10 aktiviteter.");
        return;
    }

    let visitor = {
        name: document.getElementById("bf_name").value,
        // contact: document.getElementById("bf_email").value
    };
    visitor = await postBackend("profile/id", visitor);

    const startTime = document.getElementById("bf_date").value
        + "T" + document.getElementById("bf_time").value;

    const bookedActivities = chosen.map(a => ({
        activity: { id: a.id }
    }));

    const booking = {
        visitorId:    visitor.visitorId,
        type:         document.getElementById("bf_groupType").value,
        startTime:    startTime,
        participants: Number(document.getElementById("participants").value),
        bookedActivities: bookedActivities
    };

    await postBackend("bookings", booking);
});

document.addEventListener("DOMContentLoaded", () => {
    fillBookingOptions();
});
