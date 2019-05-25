import {
  REGISTER_USER,
  LOGGING_USER,
  LOG_OUT,
  EDIT_USER
} from '../constants';

import userReducer, { initialState } from './usersReducer';

describe('user reducer', () => {
  it('should return default value', () => {
    const result = userReducer(
      undefined,
      {
        type: null
      }
    );
    expect(result).toEqual(initialState);
  });
  it('should register a user', () => {
    const result = userReducer(
      undefined,
      {
        type: REGISTER_USER,
        payload: {
          user: {
            email: 'adrian@adrian.com',
            name: 'adriancho',
            password: 'AA1*asdf'
          }
        }
      }
    );

    expect(result.registeredUsers).toHaveLength(2);
    expect(result.registeredUsers[1].email).toEqual('adrian@adrian.com');
    expect(result.registeredUsers[1].name).toEqual('adriancho');
    expect(result.registeredUsers[1].password).toEqual('AA1*asdf');
  });
  it('should return a logged user', () => {
    const result = userReducer(
      undefined,
      {
        type: LOGGING_USER,
        payload: {
          user: {
            email: 'asd@asd.com',
            password: '123'
          }
        }
      }
    );

    expect(result.loggedInUser.logged).toBe(true);
    expect(result.loggedInUser.email).toEqual('asd@asd.com');
  });
   it('should return a logged out user', () => {
    const result = userReducer(
      undefined,
      {
        type: LOG_OUT
      }
    );

    expect(result.loggedInUser.logged).toBe(false);
  });
  it('should return a edited user', () => {
    const result = userReducer(
      undefined,
      {
        type: LOGGING_USER,
        payload: {
          user: {
            email: 'asd@asd.com',
            password: '123'
          }
        }
      }
    );

    const editUser =  userReducer(
      undefined,
      {
        type: EDIT_USER,
        payload: {
          user: {
            email: 'dsa@asd.com',
            id: result.loggedInUser.id
          }
        }
      }
    );

    expect(result.loggedInUser.logged).toBe(true);
    expect(result.loggedInUser.email).toEqual('asd@asd.com');
    expect(editUser.loggedInUser.email).toEqual('dsa@asd.com');
  });
});
