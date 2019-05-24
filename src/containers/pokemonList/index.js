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
import InfiniteScroll from 'react-infinite-scroller';

// @componets
import Menu from '../menu';

// @actions
import {
  getPokemons,
  filterPokemons
} from '../../actions/pokemons';

// @styles
import './styles.scss';

class PokemonList extends Component {
  componentDidMount() {
    const { pokemons, getPokemons, loggedUser, history } = this.props;
    if (!loggedUser.logged) {
      // history.push('/');
    }
    if (!pokemons.pokemonList.length) {
      getPokemons(0);
    }
  }

  handleFilter = (value) => {
    const { filterPokemons } = this.props;
    filterPokemons(value);
  }

  handleLoadMore = (page) => {
    const { getPokemons } = this.props;
    getPokemons(page)
  }

  render() {
    const { history, pokemons } = this.props;
    return (
      <section className="pokemon-list-container">
        <Menu />
        <div
          className="pokemon-list-container__filter-container"
        >
          <TextField
            className="pokemon-list-container__filter"
            id="filter"
            label="search"
            lineDirection="center"
            onChange={value => this.handleFilter(value)}
          />
        </div>
        {
          pokemons.pokemonList.length
            ? (
              <InfiniteScroll
                pageStart={0}
                loadMore={this.handleLoadMore}
                hasMore={pokemons.pokemonList.length <= pokemons.pokemonCount}
                loader={<div className="loader" key={0}>Loading ...</div>}
              >
                <ul
                  className="pokemon-list-container__pokemon-card-container"
                >
                  {
                    pokemons.pokemonListFiltered.map(pokemon => (
                      <Card
                        key={pokemon.id}
                        className="pokemon-list-container__pokemon-card"
                        onClick={() => { history.push(`pokemon/${pokemon.id}`)}}
                      >
                        <CardTitle
                          className="pokemon-list-container__pokemon-card-title"
                          title={`${pokemon.name} #${pokemon.id}`}
                        />
                        <CardText
                          className="pokemon-list-container__pokemon-card-body"
                        >
                          <img
                            alt={pokemon.name}
                            className="pokemon-list-container__pokemon-card-image"
                            src={pokemon.sprites.front_default}
                          />
                          <div className="pokemon-list-container__pokemon-card-type-container">
                            {pokemon.types.map(type => (
                              <span
                                className="pokemon-list-container__pokemon-card-type"
                                key={type.slot}
                              >
                                {type.type.name}
                              </span>
                            ))}
                          </div>
                        </CardText>
                      </Card>
                    ))
                  }
                </ul>
              </InfiniteScroll>
            )
            : null
        }
      </section>
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
