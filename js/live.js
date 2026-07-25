const liveContainer = document.getElementById("liveMatches");

async function loadLiveMatches() {

    liveContainer.innerHTML = `
    <p style="text-align:center;color:white;padding:20px;">
        ⏳ Loading live matches...
    </p>
    `;

    try {

        const response = await fetch(
            "https://v3.football.api-sports.io/fixtures?live=all",
            {
                headers: {
                    "x-apisports-key": API_KEY
                }
            }
        );

        const data = await response.json();

        console.log(data);

        if (!data.response || data.response.length === 0) {

            liveContainer.innerHTML = `
            <h3 style="text-align:center;color:#facc15;">
                No Live Match Now
            </h3>
            `;

            return;
        }

        liveContainer.innerHTML = "";

        data.response.forEach(match => {

            liveContainer.innerHTML += `

<div class="live-scoreboard" onclick="openMatch('${match.fixture.id}')">

    <div class="live-header">
        🔴 LIVE • ${match.fixture.status.elapsed}'
    </div>

    <div style="display:flex;justify-content:center;align-items:center;gap:10px;margin-bottom:18px;">

        <img src="${match.league.logo}" style="width:28px;height:28px;">

        <span style="color:#facc15;font-weight:bold;">
            ${match.league.name}
        </span>

    </div>

    <div class="live-teams">

        <div class="club">
            <img src="${match.teams.home.logo}">
            <p>${match.teams.home.name}</p>
        </div>

        <div class="score-box">
            ${match.goals.home} - ${match.goals.away}
        </div>

        <div class="club">
            <img src="${match.teams.away.logo}">
            <p>${match.teams.away.name}</p>
        </div>

    </div>

    <div style="margin-top:18px;text-align:center;color:#cbd5e1;font-size:14px;">
        🏟️ ${match.fixture.venue.name}
    </div>

    <div style="text-align:center;color:#94a3b8;font-size:13px;margin-top:6px;">
        🌍 ${match.league.country}
    </div>

</div>

`;

        });

    } catch (error) {

        console.error(error);

        liveContainer.innerHTML = `
        <h3 style="text-align:center;color:red;">
            API Error
        </h3>
        `;

    }

}

loadLiveMatches();

function openMatch(matchId) {

    localStorage.setItem("matchId", matchId);

    location.href = "match.html";

}