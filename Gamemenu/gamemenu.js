class Score{
  constructor(score, name, time = "-", date = new Date().toLocaleDateString()){
      this.score = score;
      this.name = name;
      this.time = time;
      this.date = date;
  }
}

/*Switching view*/

// JavaScript to switch views between Game Menu and Settings Menu

//const gameMenuContainer = document.getElementById('gameMenu-container');
const loginContainer = document.getElementById('login-container');
const gameContainer = document.getElementById('game-container');
const settingsMenuContainer = document.getElementById('settingsMenu-container');
const leaderboardMenuContainer = document.getElementById('leaderboard-container')

const playBtn = document.getElementById('gameMenu-playBtn');
const settingsBtn = document.getElementById('gameMenu-settingsBtn');
const leaderboardBtn = document.getElementById('gameMenu-leaderboardBtn')
const exitBtn = document.querySelectorAll('.gameMenu-exitBtn');




playBtn.addEventListener('click', () =>{
  gameContainer.style.display = 'flex';
  leaderboardMenuContainer.style.display = 'none';
  settingsMenuContainer.style.display = 'none';
});

// Event listener for the Settings button to show the settings view
settingsBtn.addEventListener('click', () => {
   // gameMenuContainer.style.display = 'none';
    gameContainer.style.display = 'none';
    leaderboardMenuContainer.style.display = 'none';
    settingsMenuContainer.style.display = 'block';

    settingsMenuContainer.classList.add('animated-settings');
});

// Event listener for the Leaderboard button to show the leaderboard view
leaderboardBtn.addEventListener('click', () => {
    //gameMenuContainer.style.display = 'none';
    gameContainer.style.display = 'none';
    settingsMenuContainer.classList.remove('animated-settings');
    settingsMenuContainer.style.display = 'none';
    leaderboardMenuContainer.style.display = 'block';

    table.innerHTML = '';

    animate_Header();
    setTimeout(1000);
    fill_leaderboard();

});

exitBtn.forEach(btn => {
    btn.addEventListener("click",() => {
        loginContainer.style.display = 'block';
        gameContainer.style.display = 'none';
        settingsMenuContainer.style.display = 'none';
        leaderboardMenuContainer.style.display = 'none';
        document.getElementById('hamburger-menu').style.display = 'none';
          document.getElementById('hamburger-icon').style.display = 'none';
      })
})




const validUsername = "hacker"
const validPassword = "123"
let username;

document.getElementById('loginButton').addEventListener('click', function() {
  login();
});

document.getElementById('loginForm').addEventListener('keydown', function(event) {
if (event.key === 'Enter') {
  event.preventDefault();
  login();
}
});

document.getElementById('editBtn').addEventListener('click', () => {
  let player1NewName = prompt("New name for Player 1: ")
  if(player1NewName){
    document.getElementById('player1').textContent = player1NewName;
  }
  let player2NewName = prompt("New name for Player 2: ");
  if(player2NewName){
    document.getElementById('player2').textContent = player2NewName;
  }
});
async function login() {
//createUser();

  username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  let credentials = await getUser(username, password);
  if (username === validUsername && password === validPassword || username === credentials['username'] && password === credentials['password']) {
    loginContainer.style.display = 'none';
    document.getElementById('hamburger-menu').style.display = 'inline';
    document.getElementById('hamburger-icon').style.display = 'inline';
    gameContainer.style.display = 'flex';
  } else {
    document.getElementById('error').style.display = 'block';
  }
}

function createUser(){
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  const targetUrl = 'http://www.kihlman.eu/formcheck.php';

  const formData = new URLSearchParams();
  formData.append('username', 'newuser');
  formData.append('password', 'password123');

  fetch(proxyUrl + targetUrl,{
    method: 'POST',
    headers:{
      'Content-Type':'application/x-www-form-urlencoded'
    },
    body:formData
  })
  .then(response => {
    if(!response.ok){
      throw new Error('Network status' + response.status)
    }
      
    return response.text();
  })
  .then(data =>{
    console.log(data)
  })
  .catch(error => console.log(error))
}

async function getUser(username, password){
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  const targetUrl = 'http://www.kihlman.eu/formcheck.php';

  const formData = new URLSearchParams();
  formData.append('username', username);
  formData.append('password', password);
  try{

    const response = await fetch(proxyUrl + targetUrl + '?' + formData.toString(),{
      method: 'GET',
      headers:{
        'Content-Type':'application/x-www-form-urlencoded'
      }
    });

    if(!response.ok){
      throw new Error('Network status' + response.status)
    }
    const data = await response.text();
    
    return extract_data(data)
  }
  catch(error){
    console.log(error);
    return null;
  }
}

function extract_data(data){
  var doc = new DOMParser().parseFromString(data, 'text/html');
  console.log(data);
  console.log(doc);
  var els = doc.querySelectorAll('tr td:nth-child(2)');
  let username = els[0].textContent;
  let password = els[1].textContent;
  //console.log("Username:" + username);
  //console.log("Password:" + password);
  /*
  els.forEach((el) =>{
    console.log(el.textContent);
  })
    */ 
   return { username, password}
}




/* Navbar interactions*/

//Interaction to open and close Hamburger menu

document.addEventListener('DOMContentLoaded', () => {
    const hamburgerIcon = document.getElementById('hamburger-icon');
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const resetBtn = document.getElementById('reset');

    hamburgerIcon.addEventListener("click", () =>{
        if(hamburgerMenu.classList.contains('open')){
            hamburgerMenu.classList.add('closing');
            hamburgerMenu.classList.remove('open');
        }
        else{
            hamburgerMenu.classList.remove('closing');
            hamburgerMenu.classList.add('open');

        }
        
    });
    
    resetBtn.addEventListener("click", () => {
      resetGameBoard();  // Anropa funktionen som återställer spelplanen
    
    });
createBoard();
});

/* Game Functions*/


function resetGameBoard() {
  const board = document.getElementById('game-board');
  board.innerHTML = '';  // Clear the game board
  flippedCards = [];
  matchedCards = [];
  card_score = 0;
  player1Time = 0;
  player2Time = 0;
  player1Score = 0;
  player2Score = 0;
  document.getElementById('player1-timer').textContent = "0m 00s";
  document.getElementById('player2-timer').textContent = "0m 00s";
  document.getElementById('player1-score').textContent = player1Score;
  document.getElementById('player2-score').textContent = player2Score;
  stopPlayerTimer(player1);
  stopPlayerTimer(player2);
  startPlayerTimer(player1);
  createBoard();
}


// Korten som ska visas på spelbordet
const cards = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

// Håller reda på de kort som har vänds
// blanda korten
function shuffle(array) {
    return array.sort(() => 0.5 - Math.random());
}
let flippedCards = [];
let matchedCards = [];
let isChecking = false;
let arr = [];
let card_score = 0;
let timer;
let seconds;
let timer_on = false;
const player1 = document.getElementById('player1');
const player2 = document.getElementById('player2');
let current_player = player1;
let player1Score = 0;
let player2Score = 0;
let player1Time = 0;
let player2Time = 0;
let player1Timer, player2Timer;
let isTimerStarted = false;

function switchPlayer() {
  if (current_player === player1) {
    player1.classList.remove("active");
    player2.classList.add("active");
    clearInterval(player1Timer); // Stop Player 1's timer
    startPlayerTimer(player2); // Start Player 2's timer
    current_player = player2;
  } else {
    player1.classList.add("active");
    player2.classList.remove("active");
    clearInterval(player2Timer); // Stop Player 2's timer
    startPlayerTimer(player1); // Start Player 1's timer
    current_player = player1;
  }
}


function startPlayerTimer(player) {
  if(timer_on){
    if (player === player1) {
      player1Timer = setInterval(() => {
        player1Time++;
        document.getElementById('player1-timer').textContent = convert_toMinutes(player1Time);
        console.log(document.getElementById('player1-timer').textContent)
      }, 1000);
    } else {
      player2Timer = setInterval(() => {
        player2Time++;
        document.getElementById('player2-timer').textContent = convert_toMinutes(player2Time);
        console.log(document.getElementById('player2-timer').textContent)
      }, 1000);
    }
  }
}

function stopPlayerTimer(player) {
  if (player === player1) {
    clearInterval(player1Timer);
  } else {
    clearInterval(player2Timer);
  }
}


//  skapa spelbordet
function createBoard() {
  player1.classList.add("active");
  const board = document.getElementById('game-board');
  const shuffledCards = shuffle(cards);
  // Skapa och lägg till korten dynamiskt
  shuffledCards.forEach(cardValue => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.dataset.value = cardValue;

    // Skapa img-tag för framsidan av kortet
    const frontImage = document.createElement('img');
    frontImage.src = `img/${cardValue}.jpg`;
    frontImage.style.display = 'none';  // Döljer framsidan tills kortet vänds

    // Lägg till framsidan (img) i kort-elementet
    cardElement.appendChild(frontImage);

    // Event listener för att vända kortet
    cardElement.addEventListener('click', flipCard);

    // Lägg till kortet på spelbordet
    board.appendChild(cardElement);
  });

  clearInterval(player1Timer);
  clearInterval(player2Timer);
  player1Time = 0;
  player2Time = 0;
  player1Score = 0;
  player2Score = 0;
  
}

// vända kortet
function flipCard() {

  if (isChecking) return;

  if(timer_on && !isTimerStarted){
    startPlayerTimer(player1);
    isTimerStarted = true;
  }

  const card = this;
  card.classList.add('flipped');
  const frontImage = card.querySelector('img');
  frontImage.style.display = 'block';

  flippedCards.push(card);

  if (flippedCards.length === 2) {
    isChecking = true;
    checkMatch();
  }
}

// kontrollera om korten matchar
function checkMatch() {
  const [card1, card2] = flippedCards;

  if (card1.dataset.value === card2.dataset.value) {
    card1.classList.add('match');
    card2.classList.add('match');
    card_score++;
    matchedCards.push(card1, card2);

    if (current_player === player1) {
      player1Score++;
      document.getElementById('player1-score').textContent = player1Score;
    } else {
      player2Score++;
      document.getElementById('player2-score').textContent = player2Score;
    }
    setTimeout(() => {
      card1.classList.remove('match');
      card2.classList.remove('match');
  }, 2000);
    flippedCards = [];
    isChecking = false;

    if (matchedCards.length === 16) {
      clearInterval(player1Timer);
      clearInterval(player2Timer);
      setTimeout(() => alert('Game Over!'), 500);

      let score1 = new Score(player1Score, player1.textContent, player1Time);
      let score2 = new Score(player2Score, player2.textContent, player2Time);
      arr.push(score1);
      arr.push(score2);
      addToLeaderboard();
    }
  } else {
    setTimeout(() => {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
      card1.querySelector('img').style.display = 'none';
      card2.querySelector('img').style.display = 'none';
      flippedCards = [];
      isChecking = false;
      switchPlayer(); // Switch the player after a wrong match
    }, 1000);
  }
}


/* Leaderboard interactions*/


let table = document.querySelector("table tbody");

//Creates the rows and fills with data
function fill_leaderboard(){
    arr.forEach((score, index) => {
        let row = document.createElement("tr");
        row.innerHTML = `
        <td>${index + 1}</td>
        <td>${score.name}</td>
        <td>${score.date}</td>
        <td>${convert_toMinutes(score.time)}</td>
        <td>${score.score}</td>`;

        table.appendChild(row);
        setTimeout(() => {
            row.classList.add('animated-Row');
        }, index * 100);
    });
}

//Function to take time and convert it into minutes
function convert_toMinutes(time){
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    if(time == 0) return '-';
    return `${minutes}m ${seconds < 10 ? '0' : ''}${seconds}s`; //
}
//Function to take time and convert it into seconds
function convert_toSeconds(time){
    let [minutes, seconds] = time.split(' ');
    let min = parseInt(minutes.replace('m', ''), 10);
    let sec = parseInt(seconds.replace('s', ''), 10);
    return (min*60) + sec;
}

function addToLeaderboard(){

  arr.sort((a,b) => {
    //Check if the scores are the same or not
    let timeA, timeB;
    if(b.score !== a.score) 
        return b.score - a.score;
    //If the scores are the same, compare the times
    
    timeA = a.time === '-' ? Infinity : convert_toSeconds(a.time);
    timeB = b.time === '-' ? Infinity : convert_toSeconds(b.time);
    return timeA -timeB;
  });

  fill_leaderboard();
}


function animate_Header(){
  const tableHeader = document.querySelector("table thead");
  setTimeout(() => {
      tableHeader.classList.add('animated-headerRow');
  }, 100);
}


/* Settings Section Interactions*/

const timerBtn = document.getElementById('settings-timerBtn');

timerBtn.addEventListener("click", () => {
    if(timerBtn.classList.contains('active')){
        timerBtn.classList.remove('active');
        timerBtn.textContent = 'Off';
        timer_on = false;
    }
    else{
        timerBtn.classList.add('active');
        timerBtn.textContent = 'On';
        timer_on = true;
    }
})

