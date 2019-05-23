import axios from 'axios';

import {
  GET_POKEMONS,
  GET_POKEMON_BY_ID_REQUEST,
  GET_POKEMON_BY_ID_SUCCESS,
  GET_POKEMON_BY_ID_FAILURE
} from '../constants';

export const getPokemons = () => dispatch => axios
  .get(
    'https://pokeapi.co/api/v2/pokemon',
    {
      params: {
        limit: 50
      }
    }).then(({
      data: {
        count,
        next,
        previous,
        results
      }
    }) => {
      axios.all(results.map(pokemon => axios.get(
          pokemon.url
        ).then(({ data }) => ({
          ...data
        }))
      )).then((pokemons) => {
        dispatch({
          type: GET_POKEMONS,
          payload: pokemons
        });
      })
    });

export const getPokemonById = id => dispatch => {
  dispatch({
    type: GET_POKEMON_BY_ID_REQUEST
  });

  axios
    .get(
      `https://pokeapi.co/api/v2/pokemon/${id}`,
    ).then(({ data: pokemon }) => {
      dispatch({
        type: GET_POKEMON_BY_ID_SUCCESS,
        payload: { pokemon }
      });
    })
    .catch(() => {
      dispatch({
      type: GET_POKEMON_BY_ID_FAILURE
    });
    });
}
