import express, { Request, Response } from "express";
import DeckModel from "../../models/Deck";
const app = express();

export async function getDeckController(req: Request, res: Response) {
  const decks = await DeckModel.find();
  res.json(decks);
}
