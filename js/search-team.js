// ====================================
// Football World - Search Team V2
// ====================================

const searchBtn = document.getElementById("searchBtn");
const teamSearch = document.getElementById("teamSearch");
const teamResult = document.getElementById("teamResult");

let selectedTeam = null;

searchBtn.addEventListener("click", async () => {

    const keyword = teamSearch.value.trim();

    if (!keyword) {

        teamResult.innerHTML = `
        <div class="card" style="text-align:center;">
            <h3>⚠️ Please enter a team name</h3>
        </div>
        `;

        return;

    }

    teamResult.innerHTML = `
    <div class="card" style="text-align:center;">
        🔍 Searching Team...
    </div>
    `;

    const result = await searchTeam(keyword);

    if (!result.success) {

        if (result.error === "LIMIT") {

            teamResult.innerHTML = `
            <div class="card" style="text-align:center;">
            <h2>⚠️ API Daily Limit Reached</h2>
            </div>
            `;

        } else {

            teamResult.innerHTML = `
            <div class="card" style="text-align:center;">
            <h2>📡 Connection Failed</h2>
            </div>
            `;

        }

        return;

    }

    const data = result.data;
        if (!data.response || data.response.length === 0) {

        teamResult.innerHTML = `
        <div class="card" style="text-align:center;">
            <h2>❌ Team Not Found</h2>
            <p>Please check the spelling.</p>
        </div>
        `;

        return;

    }

    const team = data.response[0].team;

    selectedTeam = team;

    teamResult.innerHTML = `

    <div class="match">

        <div style="text-align:center;">

            <img src="${team.logo}" width="90">

            <h2>${team.name}</h2>

            <p>🌍 ${team.country}</p>

            <br>

            <button id="saveTeamBtn">

                ⭐ Set Favorite Team

            </button>

        </div>

    </div>

    `;

    document
        .getElementById("saveTeamBtn")
        .addEventListener("click", saveFavoriteTeam);

});

function saveFavoriteTeam() {

    if (!selectedTeam) return;

    localStorage.setItem("favoriteTeam", selectedTeam.name);
    localStorage.setItem("favoriteTeamId", selectedTeam.id);
    localStorage.setItem("favoriteTeamLogo", selectedTeam.logo);
    localStorage.setItem("favoriteCountry", selectedTeam.country);

    alert("✅ Favorite Team Saved");

    location.reload();

}