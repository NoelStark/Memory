// Korten som ska visas på spelbordet
const cards = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

// Håller reda på de kort som har vänds
let flippedCards = [];
let matchedCards = [];

// Funktion för att blanda korten
function shuffle(array) {
  return array.sort(() => 0.5 - Math.random());
}

// Funktion för att skapa spelbordet
function createBoard() {
  const board = document.getElementById('game-board');
  const shuffledCards = shuffle(cards);

  // Skapa och lägg till korten dynamiskt
  shuffledCards.forEach(cardValue => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.dataset.value = cardValue;
    cardElement.addEventListener('click', flipCard);
    board.appendChild(cardElement);  // Lägg till kortet på spelbordet
  });
}

// Funktion för att vända kortet
function flipCard() {
  const card = this;
  card.classList.add('flipped');
  card.innerText = card.dataset.value;
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    checkMatch();
  }
}

// Funktion för att kontrollera om korten matchar
function checkMatch() {
  const [card1, card2] = flippedCards;
  if (card1.dataset.value === card2.dataset.value) {
    matchedCards.push(card1, card2);
    flippedCards = [];
    if (matchedCards.length === cards.length) {
      setTimeout(() => alert('You won!'), 500);
    }
  } else {
    setTimeout(() => {
      card1.classList.remove('flipped');
      card1.innerText = '';
      card2.classList.remove('flipped');
      card2.innerText = '';
      flippedCards = [];
    }, 1000);
  }
}

// När sidan laddas, skapa spelbordet
document.addEventListener('DOMContentLoaded', createBoard);
