import {
  GET_POKEMONS,
  GET_POKEMON_BY_ID_REQUEST,
  GET_POKEMON_BY_ID_SUCCESS,
  GET_POKEMON_BY_ID_FAILURE
} from '../constants';

const initialState = {
  pokemonList: [],
  pokemon: {
    loading: false,
    error: false,
    data: {},
    evolution_chain: {}
  }
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
    case GET_POKEMON_BY_ID_REQUEST:
      return {
        ...state,
        pokemon: {
          ...state.pokemon,
          data: {},
          error: false,
          evolution_chain: {},
          loading: true
        }
      }
    case GET_POKEMON_BY_ID_SUCCESS:
      return {
        ...state,
        pokemon: {
          ...state.pokemon,
          data: action.payload.pokemon,
          error: false,
          evolution_chain: action.payload.evolution_chain,
          loading: false
        }
      }
    case GET_POKEMON_BY_ID_FAILURE:
      return {
        ...state,
        pokemon: {
          ...state.pokemon,
          data: {},
          error: true,
          evolution_chain: {},
          loading: false
        }
      }
    default:
      return state;
  }
}

export default pokemonsReducer;
