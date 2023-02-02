"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const port = 3000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: ["http://127.0.0.1:3001", "http://localhost:3001"],
}));
app.use(body_parser_1.default.json());
app.post("/players", (req, res) => {
    const { whitePlayer, blackPlayer } = req.body;
    console.log("inside players");
    res.json({ whitePlayer, blackPlayer });
});
app.post("/moves", (req, res) => {
    const moveList = req.body;
    console.log("inside moves");
    res.json({ moveList });
});
app.post("/", (req, res) => {
    const { whitePlayer, blackPlayer } = req.body;
    console.log(whitePlayer, blackPlayer);
    res.json({ status: "success" });
});
app.get("/moves", (req, res) => {
    res.json({ status: "succes GET from moves" });
});
app.get("/players", (req, res) => {
    res.json({ status: "succes GET from players" });
});
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
async function getMoves() {
    return fetch("http://localhost:3000/moves", {
        method: "GET",
    })
        .then((response) => {
        if (!response.ok) {
            throw new Error(`Network response was not ok, status: ${response.status}`);
        }
        return response.json();
    })
        .then((data) => {
        return data.moves;
    });
}
// app.use(express.json());
// app.use(bodyParser.json());
// app.post('/game', (req, res) => {
//   const { whitePlayer, blackPlayer } = req.body;
//   console.log(whitePlayer, blackPlayer);
//   res.json({ status: 'success' });
// });
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
//# sourceMappingURL=index.js.map