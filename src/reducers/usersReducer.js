import uuid from 'uuid';

import {
  REGISTER_USER,
  LOGGING_USER,
  LOG_OUT,
  EDIT_USER
} from '../constants';

const initialState = {
  registeredUsers: [{
    email: 'asd@asd.com',
    password: '123',
    name: 'adrian',
    id: uuid()
  }],
  loggedInUser: {
    logged: false,
    error: false
  }
};

const getLoggedUser = (state, user) => {
  const result = state.registeredUsers
    .find(registeredUser => (
      registeredUser.email === user.email
      && registeredUser.password === user.password
    ));

  if (result) {
    return {
      email: result.email,
      name: result.name,
      id: result.id,
      logged: true,
      error: false,
    }
  }
  return {
    logged: false,
    error: true
  }
};

const editUser = (state, user) => {
  const result = state.registeredUsers
    .find(registeredUser => (
      registeredUser.id === user.id
    ));

  if (result) {
    const index = state.registeredUsers.indexOf(result);
    const newUsersArray = [
      ...state.registeredUsers
    ];
    newUsersArray[index] = {
      ...result,
      ...user
    };

    delete user.password;

    return {
      registeredUsers: newUsersArray,
      loggedInUser: {
        ...state.loggedInUser,
        ...user
      }
    };
  }

  return {
    registeredUsers: state.registeredUsers
  };
}

function usersReducer (state = initialState, action) {
  switch(action.type) {
    case(REGISTER_USER):
      return {
        ...state,
        registeredUsers: [
          ...state.registeredUsers,
          {
            ...action.payload.user,
            id: uuid()
          }
        ]
      };
    case(EDIT_USER):
      return {
        ...state,
        ...editUser(state, action.payload.user)
      }
    case(LOGGING_USER):
      return {
        ...state,
        loggedInUser: getLoggedUser(state, action.payload.user)
      }
    case(LOG_OUT):
      return {
        ...state,
        loggedInUser: {
          logged: false,
          error: false
        }
      }
    default:
      return state;
  }
}

export default usersReducer;
