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
      isChecking = false;
    }
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

// När sidan laddas, skapa spelbordet
document.addEventListener('DOMContentLoaded', createBoard);

const mainMenuButton = document.getElementById('main-menu');
mainMenuButton.addEventListener('click', () => {window.location.href = '../gamemenu/gamemenu.html'});
const resetButton = document.getElementById('reset');
resetButton.addEventListener('click', () => {location.reload()});