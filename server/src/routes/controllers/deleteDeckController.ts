import DeckModel from "../../models/Deck";
import express, { Request, Response } from "express";

export default async function deleteDeckController(
  req: Request,
  res: Response
) {
  const deckId = req.params.deckId;
  const deck = await DeckModel.findByIdAndDelete(deckId);
  res.json(deck);
}
