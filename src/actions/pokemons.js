import axios from 'axios';

import {
  GET_POKEMONS,
  GET_POKEMON_BY_ID_REQUEST,
  GET_POKEMON_BY_ID_SUCCESS,
  GET_POKEMON_BY_ID_FAILURE
} from '../constants';

const evolveChainTree = async (evolves_to, species) => {
  const evolutions = [];
  if (!species.name) { return null };
  if (!evolves_to.length) {
    return [{
      parent: await axios.get(species.url).then(result => result.data),
      children: null
    }]
  }

  evolves_to.forEach(async(evolve) => {
    evolutions.push({
      parent: await axios.get(species.url).then(result => result.data),
      children: await evolveChainTree(evolve.evolves_to, evolve.species)
    });
  });

  return evolutions
};

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
            return evolveChainTree(evolves_to, species)
        })
      )
  ])
  .then(axios.spread((pokemonRes, evolutionRes) => {
    dispatch({
      type: GET_POKEMON_BY_ID_SUCCESS,
      payload: {
        pokemon: pokemonRes.data,
        evolution_chain: evolutionRes
      }
    });
  }))
  .catch(() => {
    dispatch({
    type: GET_POKEMON_BY_ID_FAILURE
  })
})}
