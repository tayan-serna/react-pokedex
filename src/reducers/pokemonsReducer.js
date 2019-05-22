import { GET_POKEMONS, GET_POKEMON_BY_ID } from '../constants';

const initialState = {
  pokemonList: [],
  pokemon: {}
};

function pokemonsReducer (state = initialState, action) {
  switch(action.type) {
    case GET_POKEMONS:
      return {
        ...state,
        pokemonList: [
          ...state.pokemonList,
          ...action.payload
        ]
      };
    case GET_POKEMON_BY_ID:
      return {
        ...state,
        pokemon: state.pokemonList.find(pokemon => pokemon.id === action.payload.id)
      }
    default:
      return state;
  }
}

export default pokemonsReducer;
