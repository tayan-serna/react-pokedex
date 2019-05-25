// @vendors
import React, { useEffect, useState, useRef, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CircularProgress } from 'react-md';

// @components
import Menu from '../menu';
import Pokemon from '../../components/pokemonCard';

// @actions
import { getPokemonById } from '../../actions/pokemons';

// @styles
import './styles.scss';

const PokemonDetail = (props) => {
  const [pokemon, setPokemon] = useState({
    ...props.pokemon
  });
  const [currentId, setCurrentId] = useState(parseInt(props.match.params.id));
  const [isLoadPokemon, setIsLoadPokemon] = useState(false);

  let pokemonRef = useRef({ ...pokemon });
  let urlRef = useRef(currentId);
  let hasPokemonChanged = JSON.stringify(pokemonRef.current) !== JSON.stringify(props.pokemon);
  let hasUrlChanged = urlRef.current !== parseInt(props.match.params.id);

  useEffect(() => {
    if (!props.loggedUser.logged) {
      return props.history.push('/');
    }
    if (hasPokemonChanged) {
      pokemonRef.current = { ...props.pokemon };
      setPokemon({
        ...props.pokemon
      })
    }

    if (hasUrlChanged) {
      setCurrentId(parseInt(props.match.params.id));
      setIsLoadPokemon(false);
    }

    if (pokemon.data.id !== currentId && !pokemon.loading && !isLoadPokemon) {
      setIsLoadPokemon(true);
      props.getPokemonById(currentId);
    }
  }, [
      hasPokemonChanged,
      currentId,
      props,
      props.pokemon,
      pokemon.data.id,
      pokemon.loading,
      isLoadPokemon,
      hasUrlChanged
  ]);

  if (pokemon.loading || !pokemon.data.id) {
    return (<CircularProgress id="details-loader"/>)
  }

  if (pokemon.error) {
    return <div>Something went wrong :(</div>
  }

  const renderImages = () => Object
    .keys(pokemon.data.sprites)
    .filter((sprite) => pokemon.data.sprites[sprite])
    .map((sprite, key) => (
      <img
        alt={pokemon.data.name}
        key={key}
        className="pokemon-detail-container__image"
        src={pokemon.data.sprites[sprite]}
      />
    ));

  return (
    <section>
      <Menu />
      <div className="pokemon-detail-container">
        <h2 className="pokemon-detail-container__title">
          {pokemon.data.name} #{pokemon.data.id}
        </h2>
        <div className="pokemon-detail-container__image-container">
          {renderImages()}
        </div>
        <div className="pokemon-detail-container__details">
          <div className="pokemon-detail-container__details-item">
            <strong>Height: </strong> {pokemon.data.height}
          </div>
          <div className="pokemon-detail-container__details-item">
            <strong>Weight: </strong> {pokemon.data.weight}
          </div>
          <div className="pokemon-detail-container__details-item">
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
          <div className="pokemon-detail-container__details-item">
            {pokemon.data.types.map(type => (
              <span
                className="pokemon-detail-container__type"
                key={type.slot}
              >
                {type.type.name}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="pokemon-evolution-container">
        {
          pokemon.evolution_chain.length
            ? (
              <Fragment>
                <h2
                  className="pokemon-evolution-container__title"
                >
                  Evolution Chain
                </h2>
                <div
                  className="pokemon-evolution-container__evolution-list"
                >
                  {pokemon.evolution_chain.map(poke => (
                    <Pokemon key={poke.id} pokemon={poke} history={props.history}/>
                  ))}
                </div>
              </Fragment>
            )
            : null
        }

      </div>
    </section>
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
