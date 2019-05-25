// @vendors
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TextField, CircularProgress } from 'react-md';
import InfiniteScroll from 'react-infinite-scroller';

// @componets
import Menu from '../menu';
import Pokemon from '../../components/pokemonCard';

// @actions
import {
  getPokemons,
  filterPokemons
} from '../../actions/pokemons';

// @styles
import './styles.scss';

class PokemonList extends Component {
  state = {
    filterValue: ''
  };

  componentDidMount() {
    const {
      pokemons,
      getPokemons,
      loggedUser,
      history
    } = this.props;
    if (!loggedUser.logged) {
      history.push('/');
    }
    if (!pokemons.pokemonList.length) {
      getPokemons(0);
    }
  }

  handleFilter = (filterValue) => {
    const { filterPokemons } = this.props;
    this.setState({ filterValue })
    filterPokemons(filterValue);
  }

  handleLoadMore = (page) => {
    const { getPokemons } = this.props;
    getPokemons(page)
  }

  render() {
    const { history, pokemons } = this.props;
    const { filterValue } = this.state;

    const renderListByFilter = () => {
      if (!pokemons.pokemonListFiltered.length) {
        return (
          <div
            className="pokemon-list-container__no-pokemons"
          >
            Not pokemons found
          </div>
        );
      }
      return (
        <ul
          className="pokemon-list-container__pokemon-card-container"
        >
          {
            pokemons.pokemonListFiltered.map(pokemon => (
              <Pokemon
                key={pokemon.id}
                pokemon={pokemon}
                history={history}
              />
            ))
          }
        </ul>
      );
    };

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
            value={filterValue}
          />
        </div>
        {
          filterValue && renderListByFilter()
        }
        {
          pokemons.pokemonList.length && !filterValue
            ? (
              <InfiniteScroll
                pageStart={0}
                loadMore={this.handleLoadMore}
                hasMore={pokemons.pokemonList.length <= pokemons.pokemonCount}
                loader={
                  <CircularProgress key={0} id="pokemon-loader" />
                }
              >
                <ul
                  className="pokemon-list-container__pokemon-card-container"
                >
                  {
                    pokemons.pokemonListFiltered.map(pokemon => (
                      <Pokemon
                        key={pokemon.id}
                        pokemon={pokemon}
                        history={history}
                      />
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
