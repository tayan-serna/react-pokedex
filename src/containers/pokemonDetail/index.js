// @vendors
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// @actions
import { getPokemonById } from '../../actions/pokemons';

const PokemonDetail = (props) => {
  useEffect(() => {
    const {
      getPokemonById,
      match: {
        params: {
          id
        }
      },
      pokemon
    } = props;
    const parsedId = parseInt(id);
    if (pokemon.data.id !== parsedId && !pokemon.loading) {
      getPokemonById(parsedId);
    }
  });

  if (props.pokemon.loading) {
    return (<div>loading...</div>)
  }

  return (
    <div>
      {
        !props.pokemon.data.id
          ? null
          : (
            <div>
              {props.pokemon.data.name}
              <img alt={props.pokemon.data.name} src={props.pokemon.data.sprites.front_default} />
              {props.pokemon.data.types.map(type => (
                <span key={type.slot}>
                  {type.type.name}
                </span>
              ))}
            </div>
          )
      }
    </div>
  )
};

const mapStateToProps = ({ pokemons }) => ({
  pokemon: pokemons.pokemon
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getPokemonById
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PokemonDetail);
