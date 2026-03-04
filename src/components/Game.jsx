import { useState } from "react";
import { pokemon } from "../data/pokemonData";
import Card from "./Card";

export default function Game() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [clickedIds, setClickedIds] = useState([]);
  const [pokemonList, setPokemonList] = useState(pokemon);

  function shuffle(array) {
    for (let i = array.length - 1; i >= 1; i--) {
      // eslint-disable-next-line react-hooks/purity
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function handleScore(id) {
    if (clickedIds.includes(id)) {
      setScore(0);
      setBestScore((prev) => Math.max(prev, score));
      setClickedIds([]);
      setPokemonList(shuffle(pokemon));
      return;
    }

    setScore((prevScore) => prevScore + 1);
    setClickedIds((prevIds) => [...prevIds, id]);
    setPokemonList((prevList) => shuffle(prevList));
  }

  return (
    <>
      <header>
        <h1>Memory Game</h1>
        <div>
          How sharp is your memory? Catch points by clicking each Pokémon only
          once! Oops—click the same Pokémon twice, and poof! Your score goes
          back to zero!
        </div>
        <h2>Current score: {score}</h2>
        <h2>Best score: {bestScore}</h2>
      </header>
      <main>
        {pokemonList.map((pokemon) => (
          <Card
            key={pokemon.id}
            pokemon={pokemon.name}
            onClick={() => handleScore(pokemon.id)}
          />
        ))}
      </main>
    </>
  );
}
