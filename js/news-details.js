const newsDetails = document.getElementById("newsDetails");

const newsData = JSON.parse(localStorage.getItem("newsData"));
const newsIndex = localStorage.getItem("newsIndex");

if (!newsData || newsIndex === null) {

    newsDetails.innerHTML = `
    <div class="loading-card">
        <h2>❌ No News Selected</h2>
        <p>Please go back and select a news article.</p>
    </div>
    `;

} else {

    const article = newsData[newsIndex];

    newsDetails.innerHTML = `

    <div class="match">

        <img src="${article.image || 'https://via.placeholder.com/800x450'}"
        style="
        width:100%;
        height:250px;
        object-fit:cover;
        border-radius:15px;
        margin-bottom:18px;
        ">

        <span style="
        background:#dc2626;
        color:#fff;
        padding:6px 12px;
        border-radius:20px;
        font-size:12px;
        font-weight:bold;
        ">
        🔥 BREAKING NEWS
        </span>

        <h2 style="margin-top:15px;">
        ${article.title}
        </h2>

        <div style="
        display:flex;
        justify-content:space-between;
        color:#94a3b8;
        margin:15px 0;
        font-size:14px;
        ">

        <span>📰 ${article.source.name}</span>

        <span>📅 ${article.publishedAt.substring(0,10)}</span>

        </div>

        <hr>

        <p style="
        line-height:1.8;
        color:#e5e7eb;
        margin-top:18px;
        ">

        ${article.description ?? "No description available."}

        </p>

        <br>

        <a href="${article.url}" target="_blank">

            <button class="hero-btn" style="width:100%;">

                🌐 Read Original News

            </button>

        </a>

    </div>

    `;

}