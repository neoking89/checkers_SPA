const nameForm = document.querySelector("#name-form");
const moveForm = document.querySelector("#move-form");

const whitePlayerInput = document.querySelector("#white-player");
const blackPlayerInput = document.querySelector("#black-player");

const titleHeader = document.querySelector("#title-header");
const game = document.querySelector("#game");

let playersList = [];
let moveList = [];
let currentPlayerToMove = "wit";

const nameSubmit = async (event) => {
  event.preventDefault();
  const whitePlayer = whitePlayerInput.value;
  const blackPlayer = blackPlayerInput.value;
  if (!whitePlayer || !blackPlayer) {
    return;
  }
  const data = await postPlayers(whitePlayer, blackPlayer);
  console.log("hallo", data);
  playersList.push([data.whitePlayer, data.blackPlayer]);
  console.log(playersList);
  nameForm.hidden = true;
  showGame(data.whitePlayer, data.blackPlayer);
};

async function postMoves(moveList) {
  return fetch("http://localhost:3000/moves", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ moveList }),
  }).then((response) => {
    if (!response.ok) {
      throw new Error(
        `Network response was not ok, status: ${response.status}`
      );
    }
    return response.json();
  });
}

async function postPlayers(whitePlayer, blackPlayer) {
  return fetch("http://localhost:3000/players", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ whitePlayer, blackPlayer }),
  }).then((response) => {
    if (!response.ok) {
      throw new Error(
        `Network response was not ok, status: ${response.status}`
      );
    }
    return response.json();
  });
}

async function getPlayers() {
  return fetch("http://localhost:3000/players", {
    method: "GET",
  }).then((response) => {
    if (!response.ok) {
      throw new Error(
        `Network response was not ok, status: ${response.status}`
      );
    }
    return response.json();
  });
}

const showGame = (whitePlayer, blackPlayer) => {
  game.hidden = false;
  const gameHeader = game.querySelector("#game-header");
  gameHeader.innerText = `Spel tussen ${whitePlayer} en ${blackPlayer}`;
};

async function submitClicked(event) {
  let messageDisplay = document.querySelector(".message-display");
  messageDisplay.innerHTML = "";
  let playerInput = document.querySelector(".player-text");
  moveList.push(playerInput.value);
  moves = await postMoves(moveList);
  if (currentPlayerToMove === "wit") currentPlayerToMove = "zwart";
  else currentPlayerToMove = "wit";
  messageDisplay.innerHTML = `Aan zet: ${currentPlayerToMove}, Laatste zet: ${playerInput.value}`;
  console.log(moves);
}

nameForm.addEventListener("submit", nameSubmit);
