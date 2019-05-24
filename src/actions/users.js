import {
  LOGGING_USER,
  REGISTER_USER,
  EDIT_USER,
  LOG_OUT
} from '../constants';

export const registerUser = user => dispatch => dispatch({
  type: REGISTER_USER,
  payload: {
    user
  }
});

export const editUser = user => dispatch => dispatch({
  type: EDIT_USER,
  payload: {
    user
  }
});

export const loggin = user => dispatch => dispatch({
  type: LOGGING_USER,
  payload: {
    user
  }
});

export const logout = () => dispatch => dispatch({
  type: LOG_OUT
});
