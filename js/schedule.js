// ===============================
// Football World Schedule
// ===============================

const scheduleContainer = document.getElementById("scheduleMatches");

async function getMatches() {

    showLoading(scheduleContainer, "Loading Schedule...");

    try {

const result = await fetchApiFootball("fixtures?next=20");

scheduleContainer.innerHTML = "";

if (!result.success) {
    showError(scheduleContainer, "Failed to load schedule.");
    return;
}

const data = result.data;

if (!data.response || data.response.length === 0) {

            scheduleContainer.innerHTML = `
            <div class="card" style="text-align:center;padding:30px;">
                <h2>📅 No Upcoming Matches</h2>
                <p>No matches found.</p>
            </div>
            `;

            return;

        }

        data.response.forEach(match => {

            const matchDate = new Date(match.fixture.date);

            scheduleContainer.innerHTML += `

<div class="match" onclick="openMatch('${match.fixture.id}')">

<div style="display:flex;justify-content:space-between;align-items:center;">

<div style="width:40%;text-align:center;">

<img src="${match.teams.home.logo}" width="50">

<br>

<b>${match.teams.home.name}</b>

</div>

<div style="width:20%;text-align:center;">

<h2>VS</h2>

</div>

<div style="width:40%;text-align:center;">

<img src="${match.teams.away.logo}" width="50">

<br>

<b>${match.teams.away.name}</b>

</div>

</div>

<hr>

<div class="time">

📅 ${matchDate.toLocaleDateString("en-GB",{
day:"2-digit",
month:"short",
year:"numeric"
})}

</div>

<div class="time">

🕒 ${matchDate.toLocaleTimeString([],{
hour:"2-digit",
minute:"2-digit"
})}

</div>

<div class="league">

🏆 ${match.league.name}

</div>

<div class="league">

🏟️ ${match.fixture.venue?.name || "Unknown Stadium"}

</div>

<div class="league">

🌍 ${match.fixture.venue?.city || match.league.country}

</div>

</div>

`;

        });

    } catch(error){

        console.log(error);

        showError(scheduleContainer,"Failed to load schedule.");

    }

}

getMatches();

function openMatch(matchId){

    localStorage.setItem("matchId",matchId);

    location.href="match.html";

}