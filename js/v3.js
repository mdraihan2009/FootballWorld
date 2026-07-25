// ==========================================
// Football World V3
// PART 1 - Live Match
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    loadHomeLiveMatch();

});

async function loadHomeLiveMatch() {

    const homeLogo = document.getElementById("homeLogo");
    const awayLogo = document.getElementById("awayLogo");
    const homeName = document.getElementById("homeName");
    const awayName = document.getElementById("awayName");
    const liveScore = document.getElementById("liveScore");
    const liveStatus = document.getElementById("liveStatus");
    const liveLeague = document.getElementById("liveLeague");

    if (!liveStatus) return;

    liveStatus.innerText = "⏳ Loading Live Match...";

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

            liveStatus.innerText = "⚪ No Live Match";

            if (liveLeague) {
                liveLeague.innerText = "No Live Fixtures";
            }

            return;

        }

        const match = data.response[0];

        if (homeLogo) homeLogo.src = match.teams.home.logo;
        if (awayLogo) awayLogo.src = match.teams.away.logo;

        if (homeName) homeName.innerText = match.teams.home.name;
        if (awayName) awayName.innerText = match.teams.away.name;

        if (liveScore)
            liveScore.innerText =
                `${match.goals.home} - ${match.goals.away}`;

        liveStatus.innerText =
            `🔴 ${match.fixture.status.elapsed}' LIVE`;

        if (liveLeague)
            liveLeague.innerText =
                `${match.league.name} • ${match.fixture.venue.name}`;

    } catch (error) {

        console.log(error);

        liveStatus.innerText = "❌ Failed to Load";

        if (liveLeague) {
            liveLeague.innerText = "Check Internet Connection";
        }

    }

}

// ==========================================
// PART 2 - Top Players
// ==========================================

async function loadTopPlayers() {

    const container = document.getElementById("topPlayers");

    if (!container) return;

    container.innerHTML = `
    <p style="text-align:center;color:white;">
    ⏳ Loading Top Players...
    </p>
    `;

    try {

        const response = await fetch(
            "https://v3.football.api-sports.io/players/topscorers?league=39&season=2024",
            {
                headers:{
                    "x-apisports-key":API_KEY
                }
            }
        );

        const data = await response.json();

        container.innerHTML = "";

        if(!data.response || data.response.length===0){

            container.innerHTML = `
            <p style="text-align:center;">
            No Player Found
            </p>
            `;

            return;

        }

        data.response.slice(0,4).forEach(item=>{

            const player = item.player;
            const stat = item.statistics[0];

            container.innerHTML += `

<div class="quick-card" onclick="openTopPlayer(${player.id})">

<img src="${player.photo}" alt="${player.name}">

<h3>${player.name}</h3>

<p>${stat.team.name}</p>

<small>⚽ ${stat.goals.total || 0} Goals</small>

</div>

`;

        });

    }catch(error){

        console.log(error);

        container.innerHTML = `
        <p style="text-align:center;color:red;">
        Failed To Load Players
        </p>
        `;

    }

}

function openTopPlayer(id){

    localStorage.setItem("playerId",id);

    location.href="player.html";

}

loadTopPlayers();

// ==========================================
// PART 3 - Favorite Team Card
// ==========================================

function loadFavoriteTeam(){

    const teamName = localStorage.getItem("favoriteTeam");
    const teamLogo = localStorage.getItem("favoriteTeamLogo");

    const favName = document.getElementById("favoriteTeamName");
    const favLogo = document.getElementById("favoriteTeamLogo");

    if(!favName || !favLogo) return;

    if(teamName){

        favName.innerText = teamName;

        favLogo.src = teamLogo;

    }else{

        favName.innerText = "No Favorite Team";