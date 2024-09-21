// shär skapar jag spelkort
const card = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H' ]

let flippedCards = [];
let matchedCards = [];

//blandar

function shuffle(array) {
  return array.sort(() => 0.5 - Math.random());
}

function createBoard() {
  const board = document.getElementsById('game-board');
  const shuffledCards = shuffle(cards);


shuffledCards.forEach(cardValue => {
  const cardElement = document.createElement('div');
  cardElement.classList.add('card')
  cardElement.dataset.value = cardValue;
  cardElement.addEventListener('click', flipcard);
  board.appendChild(cardElement);
});
}

function flipCard() {
  const card = this;
  card.classList.add('flipped');
  card.innerText = card.dataset.value;
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    checkMatch();
  }
}

