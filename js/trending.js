const trendingContainer = document.getElementById("trendingMatches");

async function loadTrendingMatches(){

    trendingContainer.innerHTML =
    `<div class="loading-card">Loading...</div>`;

    try{

        const response = await fetch(
        "https://v3.football.api-sports.io/fixtures?next=2",
        {
            headers:{
                "x-apisports-key":API_KEY
            }
        });

        const data = await response.json();

        trendingContainer.innerHTML="";

        data.response.forEach(match=>{

            trendingContainer.innerHTML += `

<div class="match"
onclick="openMatch('${match.fixture.id}')">

<div style="display:flex;
justify-content:space-between;
align-items:center;">

<div style="text-align:center;flex:1;">

<img src="${match.teams.home.logo}" width="55">

<p>${match.teams.home.name}</p>

</div>

<div style="text-align:center;flex:1;">

<img src="${match.league.logo}"
width="30">

<h3>VS</h3>

<div style="
margin-top:8px;
font-size:14px;
color:#facc15;
font-weight:bold;
">

📅 ${new Date(match.fixture.date).toLocaleDateString()}

</div>

<div style="
font-size:13px;
color:#cbd5e1;
">

🕒 ${new Date(match.fixture.date).toLocaleTimeString([],{
hour:'2-digit',
minute:'2-digit'
})}

</div>

<div style="
font-size:12px;
color:#94a3b8;
margin-top:6px;
">

🏆 ${match.league.name}

<div style="
margin-top:10px;
text-align:center;
font-size:12px;
color:#94a3b8;
">

🏟 ${match.fixture.venue.name ?? "Unknown Stadium"}

<div style="
margin-top:6px;
text-align:center;
font-size:12px;
color:#22c55e;
font-weight:bold;
">

🌍 ${match.league.country}

</div>

</div>

</div>

</div>

<div style="text-align:center;flex:1;">

<img src="${match.teams.away.logo}" width="55">

<p>${match.teams.away.name}</p>

</div>

</div>

</div>

`;

        });

    }catch(e){

        trendingContainer.innerHTML =
        `<div class="loading-card">
        Failed To Load
        </div>`;

        console.log(e);

    }

}

loadTrendingMatches();
