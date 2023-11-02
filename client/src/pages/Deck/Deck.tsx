import { useEffect, useState } from "react";
import "./Deck.scss";

type TDeck = {
  title: string;
  _id: string;
};

function Deck() {
  const [decks, setDecks] = useState<TDeck[]>([]);
  const [title, setTitle] = useState<string>("");

  const handleCreateDeck = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/decks", {
      method: "POST",
      body: JSON.stringify({ title }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const newDeck = await response.json();
      setDecks([...decks, newDeck]);
      setTitle("");
    }
  };

  useEffect(() => {
    async function fetchDecks() {
      const response = await fetch("http://localhost:5000/decks");
      const newDecks = await response.json();
      setDecks(newDecks);
    }
    fetchDecks();
  }, []);

  return (
    <div className="deck-form">
      <div className="decks">
        {decks.map((deck) => (
          <li key={deck._id}>
            <div className="deck-title">{deck.title}</div>
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
