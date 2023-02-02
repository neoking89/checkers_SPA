const nameForm = document.querySelector("#name-form");
const moveForm = document.querySelector("#move-form");

const whitePlayerInput = document.querySelector("#white-player");
const blackPlayerInput = document.querySelector("#black-player");

const titleHeader = document.querySelector("#title-header");
const game = document.querySelector("#game");
// const gameHeader = document.querySelector("#game-header");
// const gameBoard = document.querySelector("#game-board");

let playersList = [];
let moveList = [];

// 1. indien klik op name knop: stuur naam van players naar server
// 2. indien 2 namen worden ontvangen: toggle de 2 views

const nameSubmit = (event) => {
  event.preventDefault();
  const whitePlayer = whitePlayerInput.value;
  const blackPlayer = blackPlayerInput.value;
  if (!whitePlayer || !blackPlayer) {
    // toon spelers error
    return;
  }
  const result = postPlayers(whitePlayer, blackPlayer);
};

const showGame = (whitePlayer, blackPlayer) => {
  game.hidden = false;
  const gameHeader = game.querySelector("#game-header");
  gameHeader.innerText = `Spel tussen ${whitePlayer} en ${blackPlayer}`;
}



function postPlayers(whitePlayer, blackPlayer) {
  fetch("http://localhost:3000/players", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ whitePlayer, blackPlayer }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Network response was not ok, status: ${response.status}`
        );
      }
      return response.json();
    })
    .then((data) => {
      console.log("hallo", data);
      const {whitePlayer, blackPlayer} = data;
      playersList.push([whitePlayer, blackPlayer]);
      console.log(playersList);
      nameForm.hidden = true;
      showGame(whitePlayer, blackPlayer);
    })
    .catch((error) => {
      console.error("There was a problem with fetch", error);
    });
}

function submitClicked(event) {
  let messageDisplay = document.querySelector(".message-display");
  messageDisplay.innerHTML = "";
  let playerInput = document.querySelector(".player-text");
  moveList.push(playerInput.value);
  messageDisplay.innerHTML = "Last move was " + playerInput.value;
  console.log(moveList);
}

// --------------------
nameForm.addEventListener("submit", nameSubmit);






// function promptPlayerMove(player) {
  //   moveForm.hidden = false;
  //   const showPlayerToMove = document.querySelector("#show-player-to-move");
  //   const text = document.createTextNode(`Zet van ${player}`);
  //   showPlayerToMove.appendChild(text);
  //   const moveInput = moveForm.querySelector("#move-input");
  //   const moveSubmit = moveForm.querySelector("#move-submit");
  
  //   moveSubmit.addEventListener("click", (event) => {
  //     event.preventDefault();
  //     const move = moveInput.value;
  //     // validatatie zet
  //     if (!move) {
  //       // toon zet error
  //       return;
  //     }
  //     moveList.push(move);
  //     // console.log(moveList);
  //     // moveForm.hidden = true;
  //   });
  // }