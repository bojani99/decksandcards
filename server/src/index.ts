import express from "express";
import mongoose from "mongoose";
import { getDecksController } from "./routes/controllers/getDecksController";
import { createDeckController } from "./routes/controllers/createDeckController";
import { createCardForDeckController } from "./routes/controllers/createCardForDeckController";
import { getDeckController } from "./routes/controllers/getDeckController";
import { deleteCardOnDeckController } from "./routes/controllers/deleteCardOnDeckController";
import deleteDeckController from "./routes/controllers/deleteDeckController";
const app = express();

// Cors
const cors = require("cors");
app.use(cors());

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

// Env
const dotenv = require("dotenv");
dotenv.config();

// PORT
const PORT = 5000;

app.get("/decks", getDecksController);
app.post("/decks", createDeckController);
app.delete("/decks/:deckId", deleteDeckController);
app.get("/decks/:deckId", getDeckController);
app.post("/decks/:deckId/cards", createCardForDeckController);
app.delete("/decks/:deckId/cards/:index", deleteCardOnDeckController);

// Connecting mongoose database
mongoose.connect(process.env.MONGO_URI!).then(() => {
  console.log(`listening on port ${PORT}`);
  app.listen(PORT);
});
