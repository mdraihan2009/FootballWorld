// ===============================
// Football World Team Details
// Part 1
// ===============================

const teamInfo = document.getElementById("teamInfo");
const playerList = document.getElementById("playerList");

let squadPlayers = [];

const teamId = localStorage.getItem("favoriteTeamId");

if (!teamId) {

    teamInfo.innerHTML = `
    <div class="loading-card">
        <h2>⚽ No Favorite Team</h2>
        <p>Please select your favorite team first.</p>
    </div>
    `;

} else {

    loadTeamDetails();

}
// ===============================
// Load Team Details
// Part 2
// ===============================

async function loadTeamDetails() {

    teamInfo.innerHTML = `
    <div class="loading-card">
        <p>🏆 Loading Team Details...</p>
    </div>
    `;

    try {

        const response = await fetch(
            `https://v3.football.api-sports.io/teams?id=${teamId}`,
            {
                headers: {
                    "x-apisports-key": API_KEY
                }
            }
        );

        const data = await response.json();

        if (!data.response || data.response.length === 0) {

            teamInfo.innerHTML = `
            <div class="loading-card">
                <h2>❌ Team Not Found</h2>
            </div>
            `;

            return;
        }

        const team = data.response[0].team;
        const venue = data.response[0].venue;

// ===============================
// TEAM HERO UPDATE
// ===============================

document.getElementById("teamLogoHero").src = team.logo;

document.getElementById("teamNameHero").innerText = team.name;

document.getElementById("teamCountryHero").innerHTML =
`🌍 ${team.country} • Founded ${team.founded}`;

        teamInfo.innerHTML = `
        <div class="match">

            <div style="
            height:180px;
            border-radius:16px;
            background:linear-gradient(135deg,#16a34a,#14532d);
            display:flex;
            justify-content:center;
            align-items:center;
            margin-bottom:20px;
            ">

                <img src="${team.logo}" width="120">

            </div>

            <div style="text-align:center;">

                <h2>${team.name}</h2>

<div class="stats-grid">

<div class="stat-box">
🌍
<br><b>Country</b>
<br>${team.country}
</div>

<div class="stat-box">
🏟
<br><b>Stadium</b>
<br>${venue.name}
</div>

<div class="stat-box">
📍
<br><b>City</b>
<br>${venue.city}
</div>

<div class="stat-box">
👥
<br><b>Capacity</b>
<br>${venue.capacity ?? "Unknown"}
</div>

</div>

            </div>

        </div>
        `;

        loadPlayers(team.id);

    } catch (error) {

        console.log(error);

        teamInfo.innerHTML = `
        <div class="loading-card">
            <h2>📡 Failed to Load Team</h2>
        </div>
        `;
    }

}
// ===============================
// Load Squad
// Part 3
// ===============================

async function loadPlayers(teamId) {

playerList.innerHTML = `
<div class="skeleton"></div>
<div class="skeleton"></div>
<div class="skeleton"></div>
`;

    try {

const result = await fetchApiFootball(`players/squads?team=${teamId}`);

if (!result.success) {
    playerList.innerHTML = `
    <div class="loading-card">
        <h2>📡 Failed to Load Players</h2>
    </div>
    `;
    return;
}

const data = result.data;

        if (!data.response || data.response.length === 0) {

            playerList.innerHTML = `
            <div class="loading-card">
                <h2>⚠️ Squad Not Available</h2>
            </div>
            `;

            return;
        }

        const players = data.response[0].players;
squadPlayers = players;

        playerList.innerHTML = "";

        players.forEach(player => {

            playerList.innerHTML += `

            <div class="match" onclick="openPlayer('${player.id}')">

                <div style="text-align:center;">

                    <img src="${player.photo}"
                    style="
                    width:80px;
                    height:80px;
                    border-radius:50%;
                    border:3px solid #22c55e;
                    object-fit:cover;
                    ">

                    <h3 style="margin-top:10px;">
                        ${player.name}
                    </h3>

                    <p>⚽ ${player.position}</p>

                </div>

            </div>

            `;

        });

    } catch (error) {

        console.log(error);

        playerList.innerHTML = `
        <div class="loading-card">
            <h2>📡 Failed to Load Players</h2>
        </div>
        `;

    }

}

// ===============================
// Open Player (Save Squad Data)
// ===============================

function openPlayer(playerId) {

    const selectedPlayer = squadPlayers.find(
        p => p.id == playerId
    );

    if (selectedPlayer) {

        localStorage.setItem(
            "playerSquad",
            JSON.stringify(selectedPlayer)
        );

    }

    localStorage.setItem("playerId", playerId);

    location.href = "player.html";

}