
const activityForm = document.getElementById("activityForm");
const activityList = document.getElementById('activityList');

activityForm.onsubmit = async function()
{
    event.preventDefault();

    const payload =
    {
        "title":       document.getElementById("a-name" ).value,
        "description": document.getElementById("a-desc" ).value,
        "price":       document.getElementById("a-price").value,
        "ageLimit":    document.getElementById("a-age"  ).value,
        "capacity":    document.getElementById("a-cap"  ).value,
        "fixedTime":   document.getElementById("a-time" ).value,
        "minimumMinutes": 0,
        "equipmentUseSet": []
    }

    await postBackend(payload,  "activity");
}

const fillActivityList = async function()
{
    const list = await getBackend("activity");

    list.forEach((act) =>
    {
        let row = document.createElement("li");
        row.className = "activity-row";

        row.innerHTML = "<div><h3>" + act.title + "</h3>" +
            "<p>" + act.description + "</p></div>" +
            "<div><p>max " + act.capacity + " personer</p>" +
            "<p>" + act.ageLimit + " år minimum</p></div>" +
            "<div><p>" + act.price + "kr</p>" +
            "<p>" + act.fixedTime + "minutter</p></div>";

        row.appendChild(listItemBtn(act.id));
        activityList.appendChild(row);
    });
}

const listItemBtn = function (id) {

    let pos = document.createElement("div");
    pos.className = "row-actions";

    let btn = document.createElement("a");
    btn.className = "btn"; btn.innerText ="Redigér";

    // todo: logic deferring to specified activity

    return btn;
}

// todo: fetch single

// todo: fetch list

// todo: update entry

// todo: delete entry