const form = document.querySelector("#form");
const whitePlayerInput = document.querySelector("#white-player");
const blackPlayerInput = document.querySelector("#black-player");
let playersList = document.querySelector("#players-list");
const gameHeader = document.querySelector("#game-header");
const gameBoard = document.querySelector("#game-board");


const handleSubmit = (event) => {
  event.preventDefault();
  const whitePlayer = whitePlayerInput.value;
  const blackPlayer = blackPlayerInput.value;
  console.log(whitePlayer, blackPlayer);

  fetch("http://localhost:3000/players", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ whitePlayer, blackPlayer }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok, status: ${response.status}`);
      }
      return response.json();
    })
    .then(() => {
      playersList = addPlayersToList(playersList, whitePlayer, blackPlayer);
    })
    .catch((error) => {
      console.error("There was a problem with fetch", error);
    });
};

function addPlayersToList(playersList, whitePlayer, blackPlayer){
  const newListItem = document.createElement("li");
  newListItem.innerText = `White Player: ${whitePlayer}, Black Player: ${blackPlayer}`;
  playersList.appendChild(newListItem);
  return playersList;
}

function showGame(whitePlayer, blackPlayer) {
  gameHeader.hidden = false;
  gameHeader.innerText = `Game between ${whitePlayer} and ${blackPlayer}`;
  gameBoard.hidden = false;
  form.hidden = true;
}


// --------------------
form.addEventListener("submit", handleSubmit);
console.log(playersList);
// showGame();







