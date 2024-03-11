import { useState, useEffect } from 'react'

import './App.css'

interface Pokemon{
  name: string
  sprites: {
    front_default: string
  }
  types: {
    type: {
      name: string
    }
  }[]
  base_experience: number
  weight: number
  height: number
};

function App() {
const [pokemonName, setPokemonName] = useState<string>("");
const [pokemon, setPokemon] = useState<Pokemon>();

useEffect(() =>{
  if(pokemonName) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then((response) => response.json())
      .then(data =>{
        setPokemon(data)
      })
  }
}, [pokemonName])

  return (
    <main>
      <form >
        <label >
          Enter pokemon name:
          <br />
          <input type="text" value={pokemonName} onChange={(event) => setPokemonName(event.target.value)} />
        </label>
      </form>
      {pokemon &&
      <div>
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        <h1>{pokemon.name}</h1>
        <h2>Types: {pokemon.types.map(data => data.type.name).join(" and ")}</h2>
        <p>Height: {pokemon.height} Weight: {pokemon.weight}</p>
        <p>Base experience: {pokemon.base_experience}</p>
      </div>
      }
      {!pokemon &&
        <p>Loading...</p>}
    </main>
   
  );
}

export default App
