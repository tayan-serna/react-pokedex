// @vendors
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Card,
  CardTitle,
  CardText,
  TextField
} from 'react-md';

// @componets
import Menu from '../menu';

// @actions
import {
  getPokemons,
  filterPokemons
} from '../../actions/pokemons';

class PokemonList extends Component {
  componentDidMount() {
    const { pokemons, getPokemons, loggedUser, history } = this.props;
    if (!loggedUser.logged) {
      // history.push('/');
    }
    if (!pokemons.pokemonList.length) {
      getPokemons();
    }
  }

  handleFilter = (value) => {
    const { filterPokemons } = this.props;
    filterPokemons(value);
  }

  render() {
    const { history, pokemons } = this.props;
    return (
      <div>
        <Menu />
        <div>
          <TextField
            className="md-cell md-cell--bottom"
            id="filter"
            label="search"
            lineDirection="center"
            onChange={value => this.handleFilter(value)}
          />
        </div>
        <ul>
          {
            pokemons.pokemonListFiltered.map(pokemon => (
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

const mapStateToProps = ({ pokemons, users }) => ({
  pokemons,
  loggedUser: users.loggedInUser
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getPokemons,
  filterPokemons
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PokemonList);
