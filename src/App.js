// @vendors
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

// @components
import PokemonList from './containers/pokemonList';
import PokemonDetail from './containers/pokemonDetail';
import LandingPage from './containers/landingPage';

const App = () => (
  <Router>
      <div>
        <Route exact path="/" component={LandingPage} />
        <Route path="/pokemons" component={PokemonList} />
        <Route path="/pokemon/:id" component={PokemonDetail} />
      </div>
    </Router>
);
export default App;
