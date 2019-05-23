// @vendors
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Card,
  CardTitle,
  CardText
} from 'react-md';

// @actions
import { getPokemons } from '../../actions/pokemons';

class PokemonList extends Component {
  componentDidMount() {
    const { pokemons, getPokemons } = this.props;
    if (!pokemons.length) {
      getPokemons();
    }
  }

  render() {
    const { history, pokemons } = this.props;
    console.log(this.props);
    return (
      <div>
        <ul>
          {
            pokemons.pokemonList.map(pokemon => (
              <Card key={pokemon.id} onClick={() => { history.push(`pokemon/${pokemon.id}`)}}>
                <CardTitle title={pokemon.name} />
                <CardText>
                  <img alt={pokemon.name} src={pokemon.sprites.front_default} />
                  {pokemon.types.map(type => (
                    <span key={type.slot}>
                      {type.type.name}
                    </span>
                  ))}
                </CardText>
              </Card>
            ))
          }
        </ul>
      </div>
    );
  }
}

const mapStateToProps = ({ pokemons }) => ({
  pokemons
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getPokemons
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PokemonList);
