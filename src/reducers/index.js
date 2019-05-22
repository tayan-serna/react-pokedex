
// @vendors
import { combineReducers } from 'redux';

import users from './usersReducer';
import pokemons from './pokemonsReducer';

export default combineReducers({
  pokemons,
  users
});
