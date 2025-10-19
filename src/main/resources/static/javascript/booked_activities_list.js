// wait until page is fully loaded before running anything
document.addEventListener('DOMContentLoaded', async () => {
    const bookedActivitiesContainer = document.getElementById('booked-activities-list');
    if (!bookedActivitiesContainer) return;

    // confirms that user is logged in
    if (!window.profile) {
        bookedActivitiesContainer.innerHTML = '<p>Du skal være logget ind for at se bookede aktiviteter</p>';
        return;
    }

    // get profile type and id from profile
    const {
        id: profileId, type } = window.profile;
    let url;

    // determine endpoint based on profile type
    if (type === 'ADMIN') {
        // admin can see all booked activities
        url = `http://localhost:8081/api/booked-activities/assigned/all?adminProfileId=${profileId}`;
    }
    else if (type === 'OPERATOR') {
        // operators can see booked activities assigned to them
        url = `http://localhost:8081/api/booked-activities/assigned/to-me/?operatorProfileId=${profileId}`;
    }
    else {
        // visitors cannot see booked activities
        bookedActivitiesContainer.innerHTML = '<p>Kun ansatte kan se bookede aktiviteter</p>'
        return;
    }
    try {
        // fetch booked activities from backend
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(await res.text());
        }
            const bookedActivitiesList = await res.json(); // expect array of booked activities

        // handle case with no booked activities
            if (bookedActivitiesList.length === 0) {
                bookedActivitiesContainer.innerHTML = '<p>Ingen bookede aktiviteter fundet.</p>';
                return;
            }

            // loop through booked activities and create article for each
            bookedActivitiesList.forEach(activityBooked => {
                const article = document.createElement('article');
                article.classList.add('booked-activity-item');

// extract details with fallbacks
                const activityName = activityBooked.activity?.name || 'Ukendt aktivitet';
                const bookingId = activityBooked.booking?.id || '—';
                const startTime = activityBooked.startTime ? new Date(activityBooked.startTime).toLocaleString() : '—';
                const participants = activityBooked.participantsForThisActivity ?? '—';
                const visitorEmail = activityBooked.booking?.visitor?.email || 'Ukendt';
                const operatorName = activityBooked.assignedOperator?.name || 'Ikke tildelt';

                // activity card layout
                article.innerHTML = `
                <div class="row-main">
                <h3>Booking #${bookingId}</h3>
                <p>${activityName}</p>
                <p>Starttid: ${startTime}</p>
                <p>Deltagere: ${participants}</p>
                <p>Besøgendes email: ${visitorEmail}</p>
                </div>
                <div class="row-actions">
                ${type === 'ADMIN'
                    ? `<a href="#" class="btn assign-operator" data-id="${activityBooked.id}">Tildel operatør</a>`
                  : `<span class="assignedOperator">Tildelt operatør: ${operatorName}</span>`
            }
                </div>
                `;
            bookedActivitiesContainer.appendChild(article);
            });
        } catch (err) {
        console.error('Fejl ved hentning af bookede aktiviteter:', err);
        bookedActivitiesContainer.innerHTML = `<p>Kunne ikke hente bookede aktiviteter: ${err.message}</p>`;
        }
    });
