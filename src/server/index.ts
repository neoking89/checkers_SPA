import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';

const port = 3000;
const app = express();

app.use(cors({
  origin: ['http://127.0.0.1:3001', 'http://localhost:3001']
}));

app.use(bodyParser.json());

app.post('/players', (req, res) => {
  const { whitePlayer, blackPlayer } = req.body;
  console.log("inside players");
  res.json({ whitePlayer, blackPlayer});
});

app.post('/', (req, res) => {
  const { whitePlayer, blackPlayer } = req.body;
  console.log(whitePlayer, blackPlayer);
  res.json({ status: 'success' });
});

// app.get('/players', (req, res) => {
//   res.json({ status: 'succes' });
// });


app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

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
