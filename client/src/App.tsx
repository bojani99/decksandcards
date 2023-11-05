import { Routes, Route } from "react-router-dom";
import Deck from "./pages/Deck/Deck";
import DeckItem from "./pages/DeckItem/DeckItem";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Deck />} />
        <Route path="/decks/:deckId" element={<DeckItem />} />
      </Routes>
    </div>
  );
}

export default App;
