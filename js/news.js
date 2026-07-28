const newsContainer = document.getElementById("newsContainer");

async function loadNews() {

newsContainer.innerHTML = `
<div class="loading-card">
<p>📰 Loading Football News...</p>
</div>
`;

try{

const response = await fetch(
`${GNEWS_API_URL}/search?q=football&lang=en&max=10&apikey=${GNEWS_API_KEY}`
);

const data = await response.json();

newsContainer.innerHTML = "";

if(!data.articles || data.articles.length===0){

newsContainer.innerHTML=`
<div class="loading-card">
<h3>📰 No News Available</h3>
<p>Please try again later.</p>
</div>
`;

return;

}

document.getElementById("newsCount").innerText =
data.articles.length + " News";

data.articles.forEach((article,index)=>{

newsContainer.innerHTML += `

<div class="match" onclick="openNews(${index})">

<div style="position:relative;">

<img src="${article.image || 'https://via.placeholder.com/600x350'}"
style="width:100%;height:220px;object-fit:cover;border-radius:14px;">

<span style="
position:absolute;
top:12px;
left:12px;
background:#dc2626;
color:#fff;
padding:5px 10px;
border-radius:20px;
font-size:12px;
font-weight:bold;
">
🔥 BREAKING
</span>

</div>

<h3 style="margin-top:15px;">
${article.title}
</h3>

<p style="color:#cbd5e1;">
${article.description ?? ""}
</p>

<hr>

<div style="display:flex;
justify-content:space-between;
font-size:13px;
color:#94a3b8;">

<span>📰 ${article.source.name}</span>

<span>📅 ${article.publishedAt.substring(0,10)}</span>

</div>

<div style="
margin-top:15px;
background:#22c55e;
padding:12px;
border-radius:12px;
text-align:center;
font-weight:bold;
color:#fff;
">
➡ Read Full News
</div>

</div>

`;

});

localStorage.setItem(
"newsData",
JSON.stringify(data.articles)
);

}catch(error){

console.log(error);

newsContainer.innerHTML=`
<div class="loading-card">
<h2>❌ Failed to Load News</h2>
<p>${error.message}</p>
</div>

}

function openNews(index) {
    localStorage.setItem("newsIndex", index);
    location.href = "news-details.html";
}

loadNews();