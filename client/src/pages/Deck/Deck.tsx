import { useEffect, useState } from "react";
import "./Deck.scss";
import { Link } from "react-router-dom";
import { deleteDeck } from "../../api/deleteDeck";
import { TDeck, getDecks } from "../../api/getDecks";
import { createDeck } from "../../api/createDeck";

function Deck() {
  const [decks, setDecks] = useState<TDeck[]>([]);
  const [title, setTitle] = useState("");

  const handleCreateDeck = async (e: React.FormEvent) => {
    e.preventDefault();
    const deck = await createDeck(title);
    setDecks([...decks, deck]);
    setTitle("");
  };

  async function handleDeleteDeck(deckId: string) {
    await deleteDeck(deckId);
    setDecks(decks.filter((deck) => deck._id !== deckId));
  }

  useEffect(() => {
    async function fetchDecks() {
      const newDecks = await getDecks();
      setDecks(newDecks);
    }
    fetchDecks();
  }, []);

  return (
    <div className="deck-form">
      <div className="decks">
        {decks.map((deck) => (
          <li key={deck._id}>
            <button onClick={() => handleDeleteDeck(deck._id)}>X</button>
            <Link to={`decks/${deck._id}`}>
              <div className="deck-title">{deck.title}</div>
            </Link>
          </li>
        ))}
      </div>
      <form onSubmit={handleCreateDeck}>
        <label htmlFor="deck-title">Deck title</label>
        <input
          id="deck-title"
          type="text"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(e.target.value);
          }}
        />
        <button>Create deck</button>
      </form>
    </div>
  );
}

export default Deck;
