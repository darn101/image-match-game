import { useEffect, useState } from 'react';
import './App.css'
import SingleCard from './components/SingleCard';

const ImageCards = [
  { "src": "/img/potion-1.png", "matched": false },
  { "src": "/img/helmet-1.png", "matched": false },
  { "src": "/img/ring-1.png", "matched": false },
  { "src": "/img/scroll-1.png", "matched": false },
  { "src": "/img/shield-1.png", "matched": false },
  { "src": "/img/sword-1.png", "matched": false },
]

function App() {

  const [cards, SetCards] = useState([]);
  const [turns, SetTurns] = useState(0);
  const [choiceone, SetChoiceOne] = useState(null);
  const [choicetwo, SetChoiceTwo] = useState(null);
  const [gameStarted, SetGameStarted] = useState(false);

  const ShuffleCards = () => {
    const ShuffledCards = [...ImageCards, ...ImageCards]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    SetCards(ShuffledCards);
    SetTurns(0);
    SetGameStarted(true);
  }

  const handleChoice = (NewChoice) => {
    choiceone ? SetChoiceTwo(NewChoice) : SetChoiceOne(NewChoice);
  }

  useEffect(() => {
    if (choiceone && choicetwo) {
      if (choiceone.src === choicetwo.src) {
        console.log('found');
        SetCards(cards => cards.map(card => {
          if (card.src === choiceone.src || card.src === choicetwo.src) {
            return { ...card, matched: true }
          }
          return card;
        }))
      }
      else {
        ResetTurn();
        console.log('back');
      }
    }

  }, [choiceone, choicetwo]);

  const ResetTurn = () => {
    setTimeout(() => {
      SetChoiceOne(null);
      SetChoiceTwo(null);
      SetTurns(turns + 1);
    }, 300)

  }

  // console.log(cards, turns);

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={() => ShuffleCards()}>New Game</button>

      <div className="card-grid">
        {cards.map(card => (
          <SingleCard
            card={card}
            key={card.id}
            handleChoice={handleChoice}
            choiceone={choiceone}
            choicetwo={choicetwo}
            flipped={card === choiceone || card === choicetwo || card.matched} />
        ))}

      </div>
      {
        gameStarted && <p>Turns : {turns}</p>
      }

    </div>
  );
}

export default App