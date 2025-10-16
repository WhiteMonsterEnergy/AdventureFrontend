
const activityForm = document.getElementById("activityForm");

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

// todo: fetch single

// todo: fetch list

// todo: update entry

// todo: delete entry