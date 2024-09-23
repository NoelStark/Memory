/*Switching view*/

// JavaScript to switch views between Game Menu and Settings Menu
const gameMenuContainer = document.getElementById('gameMenu-container');
const settingsMenuContainer = document.getElementById('settingsMenu-container');
const leaderboardMenuContainer = document.getElementById('leaderboard-container')
const gameContainer = document.getElementById('game-board');

const settingsBtn = document.getElementById('gameMenu-settingsBtn');
const exitSettingsBtn = document.getElementById('gameMenu-exitBtn');
const leaderboardBtn = document.getElementById('gameMenu-leaderboardBtn')


// Event listener for the Settings button to show the settings view
settingsBtn.addEventListener('click', () => {
    gameMenuContainer.style.display = 'none';
    leaderboardMenuContainer.style.display = 'none';
    settingsMenuContainer.style.display = 'block';
});
// Event listener for the Leaderboard button to show the leaderboard view
leaderboardBtn.addEventListener('click', () => {
    gameMenuContainer.style.display = 'none';
    settingsMenuContainer.style.display = 'none';
    leaderboardMenuContainer.style.display = 'block';

    table.innerHTML = '';

    animate_Header();
    setTimeout(1000);
    fill_leaderboard();

});

function animate_Header(){
    const tableHeader = document.querySelector("table thead");
    setTimeout(() => {
        tableHeader.classList.add('animated-headerRow');
    }, 100);
}


/* Försök att lägga till event för knapptryckningen blir konflikt någonstans med namn tror jag gameMenu-playBtn
const playBtn = document.getElementById('gameMenu-playBtn');
playBtn.addEventListener('click', () => {
    // Omdirigera till gameboard.html
    window.location.href = "../gameboard/gameboard.html";

});
*/

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

    resetBtn.addEventListener("click", () => {alert("Hello")})
    createBoard();
});

/* Game Functions*/

// Korten som ska visas på spelbordet
const cards = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

// Håller reda på de kort som har vänds
let flippedCards = [];
let matchedCards = [];
let isChecking = false;
// blanda korten
function shuffle(array) {
  return array.sort(() => 0.5 - Math.random());
}

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
    matchedCards.push(card1, card2);
    flippedCards = [];
    if (matchedCards.length === cards.length) {
      setTimeout(() => alert('You won!'), 500);
    }
    isChecking = false;

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

//The code that saves leaderboard data and creates rows
import scores from '../temp.js';
let score = {score:20, name:"Jöns",time:"1m 32s",date:"2024-10-20"}
let arr = [];
arr.push(...scores);
arr.push(score);
/*
var close = document.getElementsByClassName("closebtn");

close[0].onclick = function(){
    arr.push(score[0]);
    this.textContent = arr[0].score + " " + arr[0].name + " " + arr[0].time + " " + arr[0].date;
    }
   
let scores = [
    {name: 'Jöns',date: '2024-03-10', score:'25', time:'3m 31s' },
    {name: 'Jöns',date: '2024-03-10', score:'25', time:'3m 31s'},
    {name: 'Jöns',date: '2024-03-10', score:'25', time:'3m 31s'}
];*/

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
//Function to take time and convert it into seconds
function convert_toSeconds(time){
    let [minutes, seconds] = time.split(' ');
    let min = parseInt(minutes.replace('m', ''), 10);
    let sec = parseInt(seconds.replace('s', ''), 10);
    return (min*60) + sec;
}

arr.sort((a,b) => {
    //Check if the scores are the same or not
    if(b.score !== a.score) 
        return b.score - a.score;
    //If the scores are the same, compare the times
    let timeA = convert_toSeconds(a.time);
    let timeB = convert_toSeconds(b.time);
    return timeA -timeB;
});




