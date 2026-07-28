// ===============================
// Football World - Top Scorers
// ===============================

const leagueSelect = document.getElementById("leagueSelect");
const loadScorers = document.getElementById("loadScorers");
const scorersResult = document.getElementById("scorersResult");

loadScorers.addEventListener("click", loadTopScorers);

async function loadTopScorers() {

    const league = leagueSelect.value;

    scorersResult.innerHTML = `
    <div class="card" style="text-align:center;">
        <h3>⏳ Loading Top Scorers...</h3>
    </div>
    `;

    try {

const result = await getTopScorers(league, 2025);

if (!result.success) {
    scorersResult.innerHTML = `
    <div class="card" style="text-align:center;">
        <h2>📡 Failed to Load</h2>
    </div>
    `;
    return;
}

const data = result.data;

        if (!data.response || data.response.length === 0) {

            scorersResult.innerHTML = `
            <div class="card" style="text-align:center;">
                <h2>❌ No Data Available</h2>
            </div>
            `;

            return;
        }

        scorersResult.innerHTML = "";

        data.response.forEach((item, index) => {

            const player = item.player;
            const stats = item.statistics[0];

            scorersResult.innerHTML += `

            <div class="match" onclick="openPlayer(${player.id})">

                <div style="display:flex;align-items:center;gap:12px;">

                    <div style="
                    width:30px;
                    height:30px;
                    background:#22c55e;
                    border-radius:50%;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    color:white;
                    font-weight:bold;
                    ">
                    ${index + 1}
                    </div>

                    <img src="${player.photo}"
                    width="60"
                    style="border-radius:50%;">

                    <div>

                        <h3>${player.name}</h3>

                        <p>${stats.team.name}</p>

                    </div>

                </div>

                <div style="margin-top:10px;">

                    ⚽ Goals :
                    <b>${stats.goals.total ?? 0}</b>

                    <br>

                    🎯 Assists :
                    <b>${stats.goals.assists ?? 0}</b>

                </div>

            </div>

            `;

        });

    } catch (error) {

        console.log(error);

        scorersResult.innerHTML = `
        <div class="card" style="text-align:center;">
            <h2>📡 Failed to Load</h2>
        </div>
        `;

    }

}

function openPlayer(playerId){

    localStorage.setItem("playerId", playerId);

    location.href = "player.html";

}