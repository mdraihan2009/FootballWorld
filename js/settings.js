// ===============================
// Football World Settings
// ===============================

// ===============================
// Save Favorite
// ===============================

function saveFavorite(){

if(!selectedTeam) return;

localStorage.setItem("favoriteTeam",selectedTeam.name);
localStorage.setItem("favoriteTeamId",selectedTeam.id);
localStorage.setItem("favoriteTeamLogo",selectedTeam.logo);
localStorage.setItem("favoriteCountry",selectedTeam.country);

alert(selectedTeam.name+" saved successfully!");

location.href="index.html";

}

// ===============================
// Cache
// ===============================

function clearAppCache(){

localStorage.clear();

alert("✅ Cache Cleared");

}

// ===============================
// Share
// ===============================

function shareApp(){

if(navigator.share){

navigator.share({

title:"Football World",

text:"Check out Football World!",

url:window.location.href

});

}else{

alert("Share not supported.");

}

}

// ===============================
// Rate
// ===============================

function rateApp(){

alert("⭐ Play Store Link Coming Soon");

}

// ===============================
// Theme
// ===============================

function toggleTheme(){

document.body.classList.toggle("light-mode");

const themeText=document.getElementById("themeText");

if(document.body.classList.contains("light-mode")){

localStorage.setItem("theme","light");

if(themeText) themeText.innerText="Light";

}else{

localStorage.setItem("theme","dark");

if(themeText) themeText.innerText="Dark";

}

}

// ===============================
// Language
// ===============================

function toggleLanguage(){

const text=document.getElementById("languageText");

if(!text) return;

if(text.innerText==="English"){

text.innerText="বাংলা";

localStorage.setItem("language","bn");

}else{

text.innerText="English";

localStorage.setItem("language","en");

}

}

// ===============================
// Notification
// ===============================

function toggleNotification(){

const notify=document.getElementById("notifyText");

if(!notify) return;

if(notify.innerText==="ON"){

notify.innerText="OFF";

localStorage.setItem("notify","off");

}else{

notify.innerText="ON";

localStorage.setItem("notify","on");

}

}

// ===============================
// Load Settings
// ===============================

window.onload=()=>{

const theme=localStorage.getItem("theme");

const themeText=document.getElementById("themeText");

if(theme==="light"){

document.body.classList.add("light-mode");

if(themeText) themeText.innerText="Light";

}else{

document.body.classList.remove("light-mode");

if(themeText) themeText.innerText="Dark";

}

};