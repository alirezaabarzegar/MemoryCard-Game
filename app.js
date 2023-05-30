const cards = document.querySelectorAll(".memory-card");

let cardIsFlipped = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip");

  if (!cardIsFlipped) {
    // first click -> first card
    cardIsFlipped = true;
    firstCard = this;
    return;
  }
  // second click -> second card

  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  // checking whether the cards match
  let isMatched = firstCard.dataset.name === secondCard.dataset.name;
  isMatched ? disableCards() : unFlipCards();
}

function disableCards() {
  // is a match 
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
}

function unFlipCards() {
  lockBoard = true;
  // not a match 
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 1500);
}

function resetBoard() {
  [cardIsFlipped, lockBoard] = [false, false];
  ([firstCard, secondCard] = [null]), [null];
}

// IIFE 
(function shuffle() {
  cards.forEach(function (card) {
    let randomPositions = Math.floor(Math.random() * 12);
    card.style.order = randomPositions;
  });
})();

cards.forEach(function (card) {
  card.addEventListener("click", flipCard);
});
