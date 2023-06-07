'use strict';

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
// = let = document.getElementById('score--0');
const score1El = document.querySelector('#score--1');
const currentScore0El = document.getElementById('current--0');
const currentScore1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Starting conditions

let scores;
let currentScore;
let activePlayer;
let playing;

const reset = function () {
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player1El.classList.remove('player--active');
  player0El.classList.add('player--active');

  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;

  score0El.textContent = 0;
  score1El.textContent = 0;

  scores = [0, 0];

  currentScore = 0;

  activePlayer = 0;

  playing = true;

  diceEl.classList.remove('hidden');
};

reset();

const switchPlayer = function () {
  currentScore = 0;

  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;

  activePlayer = activePlayer === 0 ? 1 : 0;

  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling the dice

btnRoll.addEventListener('click', function () {
  // 1. Generating a random dice roll

  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice

    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. Check for rolled 1: if true, switch to the next player

    if (dice !== 1) {
      // Add dice to the current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  // 1. add current score to the active player's score
  if (playing) {
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. check if score is >= 100

    if (scores[activePlayer] >= 100) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      playing = false;
      diceEl.classList.add('hidden');
    } else {
      // finish the game
      // switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', reset);
