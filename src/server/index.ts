import express from "express";
import cors from "cors";
import { position } from "../shared/constants.js";
import { ensureNumber } from "../shared/notation.js";

const port = 3000;
const app = express();

app.use(
  cors({
    origin: ["http://127.0.0.1:3001", "http://localhost:3001"],
  })
);

app.use(express.json()); // accepteer json als input (body-parser is tegenwoordig overbodig)

const moves: string[] = [];
const players: string[][] = [];

app.post("/players", (req, res) => {
  console.log("inside players");
  const { whitePlayer, blackPlayer } = req.body;
  players.push([whitePlayer, blackPlayer]);
  res.json({ whitePlayer, blackPlayer, players: players });
});

app.post("/moves", (req, res) => {
  const { move } = req.body;
  console.log("inside moves post with move: ", move);
  if (!/^\d\d-\d\d$/.test(move)) {
    console.log("move not valid: ", move)
    res.json({
      success: false,
      nrOfMoves: moves.length,
      move: move,
    });
  } else {
    moves.push(move);
    let [from, to] = move.split("-");
    let [x1, y1] = ensureNumber(from);
    let [x2, y2] = ensureNumber(to);
    // for (let i = 0; i < position.length; i++) {
    //   for (let j = 0; j < position[i].length; j++) {
    //     position[i][j] = 0;
    //     }
    // }
    console.log("move valid: ", move)
    console.log("position[x1][y1]: ", position[x1][y1]);
    position[x2][y2] = position[x1][y1];
    position[x1][y1] = 0; // 0 = leeg veld
    res.json({
      success: true,
      nrOfMoves: moves.length,
      move: move,
    });
  }
});

app.get("/moves", (req, res) => {
  res.json({ moves });
});

app.get("/position", (req, res) => {
  res.json({ position });
});

app.get("/players", (req, res) => {
  res.json({ players });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
