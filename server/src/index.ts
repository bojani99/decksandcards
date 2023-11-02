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

app.get("/decks", async (req: Request, res: Response) => {
  const decks = await Deck.find();
  res.json(decks);
});

app.post("/decks", async (req: Request, res: Response) => {
  console.log(req.body);

  const newDeck = new Deck({
    title: req.body.title,
  });
  const createdDeck = await newDeck.save();
  res.json(createdDeck);
});

mongoose.connect(process.env.MONGO_URI!).then(() => {
  console.log(`listening on port ${PORT}`);
  app.listen(PORT);
});
