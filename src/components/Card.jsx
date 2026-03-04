import { useData } from "../utils/utils.js";

export default function Card({ pokemon, onClick }) {
  const pokemonAPI = useData(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  if (!pokemonAPI) return <h1>Loading...</h1>;

  return (
    <article class="card" onClick={onClick}>
      <h1>{pokemon}</h1>
      <img src={pokemonAPI.sprites.front_default} alt="" />
    </article>
  );
}
