
// @vendors
import { combineReducers } from 'redux';

import users from './usersReducer';
import pokemos from './pokemonsReducer';

export default combineReducers({
  pokemos,
  users
});
