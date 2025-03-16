import { useState } from "react";
import "./App.css";
import imageOptions from "./imgImports";
import Cards from "./cardGrid.jsx";

function App() {
  const [cardsData, setSelectedCards] = useState({
    options: imageOptions,
    currentSet: [],
    pastSelections: [],
    currentScore: 0,
    bestScore: 0,
  });

  return (
    <div id="app">
      <header>
        <div className="headerLeft">
          <h1>Memory Game</h1>
          <h3>
            Get points by clicking on an image but dont click on any more than
            once!
          </h3>
        </div>
        <div className="headerRight">
          <span>Score: {cardsData.currentScore}</span>
          <span>Best score: {cardsData.bestScore}</span>
        </div>
      </header>
      <Cards cardsData = {cardsData} setSelectedCards = {setSelectedCards}></Cards> 
    </div>
  );
}

export default App;
