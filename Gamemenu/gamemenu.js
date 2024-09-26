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
  gameContainer.style.display = 'block';
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




function animate_Header(){
    const tableHeader = document.querySelector("table thead");
    setTimeout(() => {
        tableHeader.classList.add('animated-headerRow');
    }, 100);
}

const validUsername = "hacker"
const validPassword = "123"

document.getElementById('loginButton').addEventListener('click', function() {
  login();
});

document.getElementById('loginForm').addEventListener('keydown', function(event) {
if (event.key === 'Enter') {
  event.preventDefault();
  login();
}
});
function login() {
//createUser();
getUser();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (username === validUsername && password === validPassword) {
    loginContainer.style.display = 'none';
    document.getElementById('hamburger-menu').style.display = 'inline';
    document.getElementById('hamburger-icon').style.display = 'inline';
    gameContainer.style.display = 'block';
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

function getUser(){
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  const targetUrl = 'http://www.kihlman.eu/formcheck.php';

  const formData = new URLSearchParams();
  formData.append('username', 'newuser');
  formData.append('password', 'password123');

  fetch(proxyUrl + targetUrl + '?' + formData.toString(),{
    method: 'GET',
    headers:{
      'Content-Type':'application/x-www-form-urlencoded'
    }
  })
  .then(response => {
    if(!response.ok){
      throw new Error('Network status' + response.status)
    }
    return response.text();
  })
  .then(data =>{
    extract_data(data)
  })
  .catch(error => console.log(error))
}

function extract_data(data){
  var doc = new DOMParser().parseFromString(data, 'text/html');
  console.log(data);
  console.log(doc);
  var els = doc.querySelectorAll('td');
  els.forEach((el) =>{
    console.log(el.textContent);
  })
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

function resetGameBoard() {
  const board = document.getElementById('game-board');
  board.innerHTML = '';  // Töm spelplanen
  flippedCards = [];
  matchedCards = [];
  seconds = 0;
  card_score = 0;
  createBoard();  // Skapa en ny spelplan
}

/* Game Functions*/

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
//  skapa spelbordet
function createBoard() {
    
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
  clearInterval(timer);
  seconds = 0;
  if(timer_on == true){
    timer = setInterval( () => {
        seconds++;
    }, 1000)
  }
}

// vända kortet
function flipCard() {
  if(isChecking) return;
  const card = this;
  card.classList.add('flipped');

  // Visa framsidan (bilden) när kortet vänds
  const frontImage = card.querySelector('img');
  frontImage.style.display = 'block';  // Visa bilden

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
    flippedCards = [];
    if (matchedCards.length === cards.length) {
        clearInterval(timer);
        setTimeout(() => alert('You won!'), 500);
        let time_played;
        if(seconds == 0){
            time_played = '-';
        }
        else{
          time_played = convert_toMinutes(seconds);
        }
        let score = new Score(card_score, "Jöns", time_played);
        arr.push(score);
        addToLeaderboard();
    }
    isChecking = false;
    setTimeout(() => {
        card1.classList.remove('match');
        card2.classList.remove('match');
    }, 2000);



  } else {
    setTimeout(() => {
      card1.classList.remove('flipped');
      card1.querySelector('img').style.display = 'none';  // Döljer bilden igen
      card2.classList.remove('flipped');
      card2.querySelector('img').style.display = 'none';  // Döljer bilden igen
      flippedCards = [];
      isChecking = false;

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
        <td>${score.time}</td>
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

/*
resetButton.addEventListener('click', () => {
  resetGameBoard();  // Återställ bara spelplanen
  
}); 
*/


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

