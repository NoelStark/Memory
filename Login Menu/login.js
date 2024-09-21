const validUsername = "player"
const validPassword = "password"

document.getElementById('loginButton').addEventListener('click', function() {
  


const username = document.getElementById('username').value;
const password = document.getElementById('password').value;

if (username === validUsername && password === validPassword) {
  window.location.href = "../gamemenu/gamemenu.html";
} else {
  document.getElementById('error').style.display = 'block';
}
})