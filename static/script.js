import { postPlayers, postMove } from "./post.js";

const nameForm = document.querySelector("#name-form");
const moveForm = document.querySelector("#move-form");
const titleHeader = document.querySelector("#title-header");

const nameSubmit = async (event) => {
  event.preventDefault();
  const whitePlayer = document.querySelector("#white-player").value;
  const blackPlayer = document.querySelector("#black-player").value;

  if (!whitePlayer || !blackPlayer) {
    // toon spelers error
    return;
  }

  const { whitePlayer: player1, blackPlayer: player2 } = await postPlayers(
    whitePlayer,
    blackPlayer
  );

  nameForm.hidden = true;
  showGame(player1, player2);
};

const moveSubmit = async (event) => {
  event.preventDefault();
  const move = document.querySelector("#move-input").value;
  console.log(move);
  await postMove(move);
  //  fetch current position
  await fetch("http://localhost:3000/position")
    .then((response) => response.json())
    .then((data) => {
      console.log("data: ", data);
      const board = document.querySelector("#board");
      // add updated piecespositionto board here!!
    });
};

const showGame = (whitePlayer, blackPlayer) => {
  moveForm.hidden = false;
  document.querySelector(
    "#title-header"
  ).innerText = `Spel tussen ${whitePlayer} en ${blackPlayer}`;
};

nameForm.addEventListener("submit", nameSubmit);
moveForm.addEventListener("submit", moveSubmit);
