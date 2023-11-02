import express, { Request, Response } from "express";
import Deck from "./models/Deck";
const app = express();

// Cors
const cors = require("cors");
app.use(cors());

import mongoose from "mongoose";

// Env
const dotenv = require("dotenv");
dotenv.config();

app.use(express.json());

const PORT = 5000;

// Get Method

app.get("/decks", async (req: Request, res: Response) => {
  const decks = await Deck.find();
  res.json(decks);
});

// Post method

app.post("/decks", async (req: Request, res: Response) => {
  console.log(req.body);

  const newDeck = new Deck({
    title: req.body.title,
  });
  const createdDeck = await newDeck.save();
  res.json(createdDeck);
});

// Delete method

app.delete("/decks/:deckId", async (req: Request, res: Response) => {
  const deckId = req.params.deckId;
  const deck = await Deck.findByIdAndDelete(deckId);
  res.json(deck);
});

// Connecting mongoose database
mongoose.connect(process.env.MONGO_URI!).then(() => {
  console.log(`listening on port ${PORT}`);
  app.listen(PORT);
});
