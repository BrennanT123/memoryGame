import { useEffect, useState } from "react";

function Cards({ cardsData, setSelectedCards }) {
  useEffect(() => {
    setCards();
  }, []);

  const [gameInfo, setGameInfo] = useState({
    info: "",
  });

  const setCards = () => {
    const chosenCards = new Set();

    while (chosenCards.size < 11) {
        const randomIndex = Math.floor(Math.random() * 24);
        chosenCards.add(cardsData.options[randomIndex]); 
    }

    let uniqueCard;
    const pastSelectionsSet = new Set(cardsData.pastSelections);

    do {
        uniqueCard = cardsData.options[Math.floor(Math.random() * 24)];
    } while (pastSelectionsSet.has(uniqueCard)|| chosenCards.has(uniqueCard));

    chosenCards.add(uniqueCard); 


    const newSet = [...chosenCards].map(image => ({
        imgSelected: image,
        id: crypto.randomUUID(),
    }));

    setSelectedCards(prevData => ({
        ...prevData,
        currentSet: newSet,
    }));
};

  const onSelect = (data, image) => {
    setCards();

    if (data.pastSelections.includes(image.imgSelected)) {
      if (data.currentScore > data.bestScore) {
        setSelectedCards((prevData) => ({
          ...prevData,
          bestScore: prevData.currentScore,
          currentScore: 0,
          pastSelections: [],
        }));
      }
      setGameInfo({
        info: "You Lose. Click on a card to play again.",
      });
      return;
    }
    const newScore = data.currentScore + 1;

    setSelectedCards((prevData) => ({
      ...prevData,
      pastSelections: [...prevData.pastSelections, image.imgSelected],
      currentScore: newScore,
    }));
    setGameInfo({
      info: "",
    });

    if (newScore === 24) {
      if (data.currentScore > data.bestScore) {
        setSelectedCards((prevData) => ({
          ...prevData,
          bestScore: prevData.currentScore,
          currentScore: 0,
          pastSelections: [],
        }));
      }
      setGameInfo({
        info: "You win!",
      });
      return;
    }
  };

  return (
    <>
      <h4 className="gameInfo">{gameInfo.info}</h4>
      <div className="cardGrid">
        {cardsData.currentSet.map((e) => (
          <div
            key={e.id}
            className="card"
            onClick={() => onSelect(cardsData, e)}
          >
            <img src={e.imgSelected} alt="Memory Card" />
          </div>
        ))}
      </div>
    </>
  );
}

export default Cards;
