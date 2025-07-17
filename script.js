'use strict';

const messageEl = document.querySelector('.message');
const scoreEl = document.querySelector('.score');
const highScoreEl = document.querySelector('.highscore');
const numberEl = document.querySelector('.number');
const bodyEl = document.querySelector('body');
const guessInputEl = document.querySelector('.guess');
const checkBtn = document.querySelector('.check');
const againBtn = document.querySelector('.again');

let secretNumber = generateSecretNumber();
let score = 20;
let highScore = 0;

updateScore(score);
updateHighScore(highScore);

function generateSecretNumber() {
  return Math.trunc(Math.random() * 20) + 1;
}

function updateMessage(message) {
  messageEl.textContent = message;
}

function updateScore(newScore) {
  scoreEl.textContent = newScore;
}

function updateHighScore(newHighScore) {
  highScoreEl.textContent = newHighScore;
}

function setWinningStyles() {
  bodyEl.style.backgroundColor = '#60b347';
  bodyEl.style.color = '#ffffff';
  numberEl.style.width = '30rem';
}

function resetStyles() {
  bodyEl.style.backgroundColor = '#222';
  bodyEl.style.color = '';
  numberEl.style.width = '15rem';
}

function handleCorrectGuess() {
  updateMessage('🎉 Correct Number!');
  numberEl.textContent = secretNumber;
  setWinningStyles();

  if (score > highScore) {
    highScore = score;
    updateHighScore(highScore);
  }
}

function handleWrongGuess(guess) {
  if (score > 1) {
    updateMessage(guess > secretNumber ? '📈 Too High!' : '📉 Too Low!');
    score--;
    updateScore(score);
  } else {
    updateMessage('💥 You Lose!');
    updateScore(0);
  }
}

function resetGame() {
  score = 20;
  secretNumber = generateSecretNumber();

  updateScore(score);
  updateMessage('Start guessing...');
  numberEl.textContent = '?';
  guessInputEl.value = '';
  resetStyles();
}

checkBtn.addEventListener('click', () => {
  const guess = Number(guessInputEl.value);

  if (!guess) {
    updateMessage('⛔️ No number!');
    return;
  }

  if (guess === secretNumber) {
    handleCorrectGuess();
  } else {
    handleWrongGuess(guess);
  }
});

againBtn.addEventListener('click', resetGame);
