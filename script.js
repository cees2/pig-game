"use strict";
const sections = document.querySelectorAll("section");
const totalScores = document.querySelectorAll(".player-total-score");
const currentScores = document.querySelectorAll(".current-score");
const newGameButton = document.querySelector(".new-game");
const rollDiceButton = document.querySelector(".roll-dice");
const holdButton = document.querySelector(".hold");
const diceImage = document.querySelector(".dice-image");
const winnerHeader = document.querySelector(".winner");
const diceImages = [
  "dice1.png",
  "dice2.png",
  "dice3.png",
  "dice4.png",
  "dice5.png",
  "dice6.png",
];

let currentPlayer = -1;
let diceValue = -1;
let currentPoints = 0;
let p1TotalPoints = 0;
let p2TotalPoints = 0;
let gameIsStarted = false;

const changePlayer = () => {
  currentPoints = 0;
  sections[currentPlayer - 1].classList.remove("player-active");
  currentScores[currentPlayer - 1].textContent = "0";
  currentPlayer = currentPlayer === 1 ? 2 : 1;
  sections[currentPlayer - 1].classList.add("player-active");
};

const endGame = function (winner) {
  gameIsStarted = false;
  winnerHeader.textContent = `${winner} won! Congratulations.`;
};

const checkWinner = function () {
  if (p1TotalPoints >= 50 || p2TotalPoints >= 50)
    endGame(p1TotalPoints > p2TotalPoints ? "Player 1" : "Player 2");
};

const startGame = function () {
  diceImage.classList.add("hidden");
  gameIsStarted = true;
  currentPlayer = 2; // dramat xD
  p1TotalPoints = 0;
  p2TotalPoints = 0;
  currentPoints = 0;
  totalScores.forEach((score) => (score.textContent = "0"));
  currentScores.forEach((score) => (score.textContent = "0"));
  winnerHeader.textContent = "";
  changePlayer();
  rollDiceButton.classList.add("blink-button");
  setTimeout(() => {
    rollDiceButton.classList.remove("blink-button");
  }, 500);
};

const rollDice = function () {
  if (gameIsStarted) {
    diceImage.classList.remove("hidden");
    const generatedValue = Math.trunc(Math.random() * 6 + 1);
    diceImage.setAttribute("src", diceImages[generatedValue - 1]);
    if (generatedValue === 1) {
      currentPoints = 0;
      changePlayer();
    } else {
      currentPoints += generatedValue;
      currentScores[currentPlayer - 1].textContent = currentPoints;
    }
  }
};

const holdPoints = function () {
  if (gameIsStarted) {
    if (currentPlayer === 1) {
      p1TotalPoints += currentPoints;
      totalScores[0].textContent = p1TotalPoints + "";
    } else {
      p2TotalPoints += currentPoints;
      totalScores[1].textContent = p2TotalPoints + "";
    }
    changePlayer();
    checkWinner();
  }
};

newGameButton.addEventListener("click", startGame);
rollDiceButton.addEventListener("click", rollDice);
holdButton.addEventListener("click", holdPoints);
