import { useState } from 'react'

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
// const [pokemonName, setPokemonName] = useState<string>("");
const [pokemon, setPokemon] = useState<Pokemon>();
const [loading, setLoading] = useState<boolean>(false);
const [error, setError] =useState<boolean>(false);


const handleSubmit:React.FormEventHandler<HTMLFormElement> = event =>{
  event.preventDefault();
  setPokemon(undefined);
  setError(false);
  const formData = new FormData(event.target as HTMLFormElement);
  const pokemonName = formData.get("PokemonName")
  if(pokemonName){
    setLoading(true);
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then((response) => response.json())
    .then((data) => setPokemon(data))
    .catch(() => setError(true))
    .finally(() => setLoading(false))
  }
  
}


  return (
    <main>
      <div className='heading-container'>
        <h1>Welcome to Pokepedia!</h1>
        <p>Using the latest React technologies, Pokepedia seamlessly integrates with the Pokémon API to fetch and display an array of data on your favorite Pokémon.</p>
        <p>Start your journey today with a simply click and see what fascinating discoveries await you in Pokepedia!</p>
      </div>

      <div className='container'>
        <form onSubmit={handleSubmit}>
          <label >
            Enter Pokemon name:
            <br/>
            <input type="text" name='PokemonName' />
          </label>
          <button type='submit' >Get info!</button>
        </form>
        {pokemon &&
        <div className='data-container'>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <h2>{pokemon.name}</h2>
          <h3>Types: {pokemon.types.map(data => data.type.name).join(" and ")}</h3>
          <p>Height: {pokemon.height} Weight: {pokemon.weight}</p>
          <p>Base experience: {pokemon.base_experience}</p>
        </div>
        }
        <div className='loading'>
        {loading &&
          <img src='./src/assets/loading.png' alt='Loading Image'></img>}
        </div>
        
        <div className='error'>
        {error &&
          <p>Couldn't find your pokemon!</p>}
        </div>

      </div>
    </main>

  );
}

export default App
