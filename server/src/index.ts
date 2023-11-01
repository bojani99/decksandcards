import express, { Request, Response } from "express";
const app = express();
import mongoose from "mongoose";
const dotenv = require("dotenv");
dotenv.config();

import DeckModel from "./models/Deck";

const PORT = 5000;

app.get("/decks", (req: Request, res: Response) => {
  res.send("Dime majmun");
});
mongoose.connect(process.env.MONGO_URI!).then(() => {
  console.log(`listening on port ${PORT}`);
  app.listen(PORT);
});
