import { API_URL } from "../config";
import { TDeck } from "../cardApi/getDecks";

export async function createDeck(title: string): Promise<TDeck> {
  const response = await fetch(`${API_URL}/decks`, {
    method: "POST",
    body: JSON.stringify({ title }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const deck: TDeck = await response.json();
  return deck;
}
