// @vendors
import React, { useEffect, useState, useRef, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// @components
import Menu from '../menu';

// @actions
import { getPokemonById } from '../../actions/pokemons';

const PokemonDetail = (props) => {
  const [pokemon, setPokemon] = useState({
    ...props.pokemon
  });
  const [isLoadPokemon, setIsLoadPokemon] = useState(false);
  const parsedId = parseInt(props.match.params.id);

  let ref = useRef({ ...pokemon });
  let hasPokemonChanged = JSON.stringify(ref.current) !== JSON.stringify(props.pokemon);

  useEffect(() => {
    if (!props.loggedUser.logged) {
      return props.history.push('/');
    }
    if (hasPokemonChanged) {
      ref.current = { ...props.pokemon };
      setPokemon({
        ...props.pokemon
      })
    }

    if (pokemon.data.id !== parsedId && !pokemon.loading && !isLoadPokemon) {
      setIsLoadPokemon(true)
      props.getPokemonById(parsedId);
    }
  }, [
      hasPokemonChanged,
      parsedId,
      props,
      props.pokemon,
      pokemon.data.id,
      pokemon.loading,
      isLoadPokemon
  ]);

  const getEvolutionChain = (evolution_chain, nodes = []) => {
    evolution_chain.forEach((evolution) => {
      nodes.push(evolution.parent);
      if (evolution.children && evolution.children.length) {
        getEvolutionChain(evolution.children, nodes)
      }
    })
    return nodes.filter(pokemon => pokemon.id !== parsedId);
  };

  if (pokemon.loading || !pokemon.data.id) {
    return (<div>loading...</div>)
  }

  if (pokemon.error) {
    return <div>Something went wrong :(</div>
  }

  return (
    <div>
      <Menu />
      <div>
        <h2>
          {pokemon.data.name} #{pokemon.data.id}
        </h2>
        <img
          alt={pokemon.data.name}
          src={pokemon.data.sprites.front_default}
        />
        <div>
          <strong>Height: </strong> {pokemon.data.height}
        </div>
        <div>
          <strong>Weight: </strong> {pokemon.data.weight}
        </div>
        <div>
          <strong>Abilities: </strong>
          <ul>
            {
              pokemon.data.abilities.map(ability => (
                <li key={ability.slot}>
                  {ability.ability.name}
                </li>
              ))
            }
          </ul>
        </div>
        {pokemon.data.types.map(type => (
          <span key={type.slot}>
            {type.type.name}
          </span>
        ))}
      </div>
      <div>
        {
          getEvolutionChain(pokemon.evolution_chain).length
            ? (
              <Fragment>
                <h1> Evolution Chain </h1>
                {getEvolutionChain(pokemon.evolution_chain).map(pokemon => (
                  <div key={pokemon.id}>{pokemon.name}</div>
                ))}
              </Fragment>
            )
            : null
        }

      </div>
    </div>
  )
};

const mapStateToProps = ({ pokemons, users }) => ({
  pokemon: pokemons.pokemon,
  loggedUser: users.loggedInUser
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getPokemonById
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PokemonDetail);
