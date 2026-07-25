function showLoading(element, text = "Loading...") {

element.innerHTML = `

<div class="loading-card">

<div class="skeleton"></div>

<div class="skeleton"></div>

<div class="skeleton"></div>

<p style="
margin-top:15px;
color:#94a3b8;
font-weight:bold;
">

${text}

</p>

</div>

`;

}

function showError(element, text = "Failed to load data") {

element.innerHTML = `

<div class="card" style="text-align:center;">

<h2>❌ Oops!</h2>

<p>${text}</p>

<p style="color:#94a3b8;">

Please check your internet connection.

</p>

</div>

`;

}
// ===============================
// Global Theme Manager
// ===============================

document.addEventListener("DOMContentLoaded", function () {

    const theme = localStorage.getItem("theme");

    if (theme === "light") {

        document.body.classList.add("light-mode");

    } else {

        document.body.classList.remove("light-mode");

    }

});