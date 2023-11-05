import { useEffect, useState } from "react";
import "./Deck.scss";
import { Link } from "react-router-dom";
import { deleteDeck } from "../../api/deckApi/deleteDeck";
import { TDeck, getDecks } from "../../api/cardApi/getDecks";
import { createDeck } from "../../api/deckApi/createDeck";

function Deck() {
  const [decks, setDecks] = useState<TDeck[]>([]);
  const [title, setTitle] = useState("");

  const handleCreateDeck = async (e: React.FormEvent) => {
    e.preventDefault();
    const deck = await createDeck(title);
    setDecks([...decks, deck]);
    setTitle("");

    // Store the updated decks array in local storage
    localStorage.setItem("decks", JSON.stringify([...decks, deck]));
  };

  async function handleDeleteDeck(deckId: string) {
    await deleteDeck(deckId);
    setDecks(decks.filter((deck) => deck._id !== deckId));
  }

  async function fetchDecks() {
    const newDecks = await getDecks();
    setDecks(newDecks);
    localStorage.setItem("decks", JSON.stringify(newDecks));
  }

  useEffect(() => {
    // Check local storage for decks
    const savedDecksString = localStorage.getItem("decks");
    if (savedDecksString) {
      const savedDecks = JSON.parse(savedDecksString);
      setDecks(savedDecks);
    } else {
      // Fetch decks from the server if not available in local storage

      fetchDecks();
    }
  }, []);
  return (
    <div className="container">
      <div className="App">
        <h1>Your Decks</h1>

        <ul className="decks">
          {decks.map((deck) => (
            <li key={deck._id}>
              <button onClick={() => handleDeleteDeck(deck._id)}>X</button>

              <Link to={`decks/${deck._id}`}>{deck.title}</Link>
            </li>
          ))}
        </ul>
        <form onSubmit={handleCreateDeck}>
          <label htmlFor="deck-title">Deck Title</label>
          <input
            id="deck-title"
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setTitle(e.target.value);
            }}
          />
          <button>Create Deck</button>
        </form>
      </div>
    </div>
  );
}

export default Deck;
