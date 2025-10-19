// --------- DOM refs (may be missing on some pages, so we guard) ----------
const activityForm = document.getElementById("activityForm");
const activityList = document.getElementById("activityList");
const activityGrid = document.getElementById("activityGrid");

// ----------------------- Helpers ----------------------------------------
const safe = (v) =>
    (v ?? "").toString().replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c]));
const setTxt = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val ?? "—";
};

// --------------------- Create: admin form -------------------------------
if (activityForm) {
    activityForm.onsubmit = async function (event) {
        event.preventDefault();

        const activity = {
            title:       document.getElementById("a-name").value,
            description: document.getElementById("a-desc").value,
            price:       Number(document.getElementById("a-price").value),
            ageLimit:    document.getElementById("a-age").value || null,
            capacity:    Number(document.getElementById("a-cap").value),
            fixedTime:   Number(document.getElementById("a-time").value), // minutes
            minimumMinutes: 0,
            equipmentUseSet: []
        };

        await postBackend("activity", activity);

        if (activityList) {
            activityList.innerHTML = "";
            await fillActivityList();
        }
        if (activityGrid) {
            activityGrid.innerHTML = "";
            await buildActivityGrid();
        }

        activityForm.reset();
    };
}

// ---------------------- Admin list --------------------------------------
async function fillActivityList() {
    if (!activityList) return;
    const list = await getBackend("activity");

    activityList.innerHTML = "";
    (list || []).forEach((act) => {
        const row = document.createElement("li");
        row.className = "activity-row";

        row.innerHTML =
            `<div>
        <h3>${safe(act.title)}</h3>
        <p>${safe(act.description ?? "")}</p>
      </div>
      <div>
        <p>Max ${safe(act.capacity)} participants</p>
        <p>Min age ${safe(act.ageLimit ?? "None")}</p>
      </div>
      <div>
        <p>${safe(act.price)} kr</p>
        <p>${safe(act.fixedTime)} minutes</p>
      </div>`;

        row.appendChild(listItemBtn(act.id));
        activityList.appendChild(row);
    });
}

function listItemBtn(id) {
    const pos = document.createElement("div");
    pos.className = "row-actions";

    const btn = document.createElement("a");
    btn.className = "btn";
    btn.innerText = "Edit";
    btn.href = "#";
    pos.appendChild(btn);

    return pos;
}

// ---------------------- Front page grid ---------------------------------
async function buildActivityGrid() {
    if (!activityGrid) return;

    const list = await getBackend("activity");
    activityGrid.innerHTML = "";

    (list || []).forEach((act) => {
        const li = document.createElement("li");
        li.className = "activity-card";
        li.setAttribute("data-activity-id", act.id);

        li.innerHTML = `
      <article class="card">
        <h3 class="title">${safe(act.title)}</h3>
        <p class="muted">${safe(act.description ?? "")}</p>
        <span class="price-pill">${act.price != null ? act.price : 0}KR</span>
      </article>
    `;

        li.addEventListener("click", () => openActivityDetail(act.id));
        activityGrid.appendChild(li);
    });
}

// ---------------------- Detail view -------------------------------------
async function openActivityDetail(id) {
    const a = await getBackend("activity/" + id);
    if (!a) return;

    setTxt("act-title", a.title);
    setTxt("act-description", a.description ?? "");
    setTxt("act-price", a.price != null ? `${a.price} KR` : "—");
    setTxt("act-duration", a.fixedTime != null ? `${a.fixedTime} min` : "—");
    setTxt("act-minAge", a.ageLimit ?? "None");

    show("activity-detail-page");
}

// Back button inside the detail view
document.addEventListener("click", (e) => {
    if (e.target && e.target.id === "backToActivities") {
        e.preventDefault();
        show("activities-page");
        document.querySelectorAll(".hero").forEach((el) => (el.style.display = "block"));
    }
});

// ---------------------- Initialization ----------------------------------
document.addEventListener("DOMContentLoaded", async () => {
    if (activityGrid) await buildActivityGrid();
    if (activityList) await fillActivityList();
});
