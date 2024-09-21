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
}