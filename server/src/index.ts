import express from "express";
import mongoose from "mongoose";
import { getDeckController } from "./routes/controllers/getDeckController";
import { createDeckController } from "./routes/controllers/createDeckController";
import deleteDeckController from "./routes/controllers/deleteDeckController";
const app = express();

// Cors
const cors = require("cors");
app.use(cors());

app.use(express.json());

// Env
const dotenv = require("dotenv");
dotenv.config();

// PORT
const PORT = 5000;

// Get Method
app.get("/decks", getDeckController);

// Post method
app.post("/decks", createDeckController);

// Delete method
app.delete("/decks/:deckId", deleteDeckController);

// Connecting mongoose database
mongoose.connect(process.env.MONGO_URI!).then(() => {
  console.log(`listening on port ${PORT}`);
  app.listen(PORT);
});
