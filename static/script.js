import { postPlayers, postMove } from './post.js';

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

  const { whitePlayer: player1, blackPlayer: player2 } = await postPlayers(whitePlayer, blackPlayer);

  nameForm.hidden = true;
  showGame(player1, player2);
};

const moveSubmit = async (event) => {
  event.preventDefault();
  const move = document.querySelector('#move-input').value;
  await postMove(move);
  // alert(`De zet ${move} moet naar de server verstuurd worden!`);
};

const showGame = (whitePlayer, blackPlayer) => {
  moveForm.hidden = false;
  document.querySelector("#title-header").innerText = `Spel tussen ${whitePlayer} en ${blackPlayer}`;
}

nameForm.addEventListener("submit", nameSubmit);
moveForm.addEventListener("submit", moveSubmit);
