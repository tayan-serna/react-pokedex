import axios from 'axios';

import {
  GET_POKEMONS,
  GET_POKEMON_BY_ID_REQUEST,
  GET_POKEMON_BY_ID_SUCCESS,
  GET_POKEMON_BY_ID_FAILURE,
  FILTER_POKEMON
} from '../constants';

const evolveChainTreePromises = (evolves_to, species, promises = []) => {
  if (!species.name) { return };
  if (!evolves_to.length) {
    promises.push(axios.get(species.url).then(result => result.data))
  }

  evolves_to.forEach((evolve) => {
    promises.push(axios.get(species.url).then(result => result.data))
    evolveChainTreePromises(evolve.evolves_to, evolve.species, promises)
  });

  return promises;
};

export const getPokemons = page => dispatch => axios
  .get(
    'https://pokeapi.co/api/v2/pokemon',
    {
      params: {
        limit: 50,
        offset: page * 50
      }
    }).then(({
      data: {
        count,
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
          payload: {
            pokemons,
            count
          }
        });
      })
    });

export const getPokemonById = id => dispatch => {
  dispatch({
    type: GET_POKEMON_BY_ID_REQUEST
  });

  axios.all([
    axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`),
    axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
      .then(({
        data: {
          evolution_chain: {
            url
          }
        }
      }) => axios.get(url)
        .then(({
          data: {
            chain: {
              evolves_to,
              species
            }
          }
        }) => {
          return axios.all(evolveChainTreePromises(evolves_to, species))
        })
      )
  ])
  .then(axios.spread((pokemonRes, evolutionRes) => {
    dispatch({
      type: GET_POKEMON_BY_ID_SUCCESS,
      payload: {
        pokemon: pokemonRes.data,
        evolution_chain: evolutionRes.filter(pokemon => pokemon.id !== id)
      }
    });
  }))
  .catch(() => {
    dispatch({
    type: GET_POKEMON_BY_ID_FAILURE
  })
})};

export const filterPokemons = value => dispatch => dispatch({
  type: FILTER_POKEMON,
  payload: value
});
