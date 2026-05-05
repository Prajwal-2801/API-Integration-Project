const button = document.getElementById("searchBtn");

button.addEventListener("click", searchUser);

async function searchUser(){

const username = document.getElementById("username").value.trim();
const result = document.getElementById("result");
const status = document.getElementById("status");

if(username === ""){
status.innerHTML = "<p class='error'>Please enter a username</p>";
return;
}

result.innerHTML="";
status.innerHTML="<p class='loading'>Loading...</p>";

try{

const response = await fetch(`https://api.github.com/users/${username}`);

if(!response.ok){
throw new Error("User not found");
}

const data = await response.json();

status.innerHTML="";

result.innerHTML = `
<div class="user-card">
<img src="${data.avatar_url}">
<h3>${data.name || data.login}</h3>
<p>Followers: ${data.followers}</p>
<p>Public Repos: ${data.public_repos}</p>
<a href="${data.html_url}" target="_blank">View Profile</a>
</div>
`;

}

catch(error){

status.innerHTML="";
result.innerHTML=`<p class="error">${error.message}</p>`;

}

}