/* eslint-disable jsx-a11y/anchor-is-valid */

// @vendors
import React, { Component } from 'react';
import {
  Button,
  TextField
} from 'react-md';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// @utils
import { validateEmail, validateStrongPass } from '../../utils';

// æactions
import {
  registerUser,
  loggin
} from '../../actions/users';

const initialState = {
  isLogging: true,
  email: '',
  password: '',
  name: '',
  confPassword: '',
  passConfirmationError: false,
  logginError: false,
  emailError: false,
  weakPass: false
};
class LandingPage extends Component {
  state = {
    ...initialState
  };

  componentDidMount() {
    const { loggedUser, history } = this.props;

    if (loggedUser.logged && !loggedUser.error) {
        history.push('/pokemons');
    }
  }

  componentDidUpdate(prevProps) {
    const { loggedUser, history } = this.props;
    if (JSON.stringify(prevProps.loggedUser) !== JSON.stringify(loggedUser)) {
      if (loggedUser.logged && !loggedUser.error) {
        history.push('/pokemons');
      } else if (!loggedUser.logged && loggedUser.error) {
        this.setState({
          logginError: true
        }, () => {
          setTimeout(() => {
            this.setState({
              logginError: false
            });
          }, 5000)
        });
      }
    }
  }

  handleChange = (field, value) => {
    this.setState({
      [field]: value
    });
  }

  handleBlurEmail = () => {
    const { email } = this.state;
    this.setState({
      emailError: !validateEmail(email)
    });
  }

  handleLoggin = () => {
    const {
      email,
      password
    } = this.state;
    const { loggin } = this.props;

    loggin({
      email,
      password
    });

    this.setState({
      ...initialState
    });
  }

  handleRegister = () => {
    const {
      email,
      name,
      password
    } = this.state;
    const { registerUser } = this.props;

    registerUser({
      email,
      name,
      password
    });
    this.setState({
      ...initialState
    });
  }

  handleCancel = () => {
    this.setState({
      ...initialState
    });
  }

  passConfirmation = () => {
    const { password, confPassword } = this.state;
    if (!password || !confPassword) { return; }
    this.setState({
      passConfirmationError: password !== confPassword,
    });
  }

  strongPassValidator = () => {
    const { password } = this.state;
    this.setState({
      weakPass: !validateStrongPass(password)
    });
  }

  renderLogging = () => {
    const { email, password, logginError, emailError } = this.state;

    return (
      <div>
        <TextField
          className="md-cell md-cell--bottom"
          id="email"
          label="Email"
          error={emailError}
          errorText="you should use a valid email"
          lineDirection="center"
          onChange={(value) => this.handleChange('email', value)}
          onBlur={this.handleBlurEmail}
          placeholder="e.g: hello@hello.com"
          value={email}
        />
        <TextField
          className="md-cell md-cell--bottom"
          id="password"
          label="Password"
          lineDirection="center"
          onChange={(value) => this.handleChange('password', value)}
          type="password"
          value={password}
        />
        {
          logginError && <div>User or Password are wrong</div>
        }
        <Button
          flat
          disabled={(!email || !password || emailError)}
          primary
          onClick={this.handleLoggin}
        >
          Log in
        </Button>
      </div>
    );
  }

  renderRegister = () => {
    const {
      name,
      email,
      password,
      confPassword,
      passConfirmationError,
      emailError,
      weakPass
    } = this.state;

    return (
      <div>
        <TextField
          className="md-cell md-cell--bottom"
          id="name"
          label="Trainer Name *"
          lineDirection="center"
          onChange={(value) => this.handleChange('name', value)}
          value={name}
        />
        <TextField
          className="md-cell md-cell--bottom"
          id="email"
          label="Email *"
          error={emailError}
          errorText="you should use a valid email"
          lineDirection="center"
          onBlur={this.handleBlurEmail}
          onChange={(value) => this.handleChange('email', value)}
          placeholder="e.g: hello@hello.com"
          value={email}
        />
        <TextField
          className="md-cell md-cell--bottom"
          id="password"
          error={weakPass}
          errorText="Password must have 2 upper case letter, a length of 8 letters minimun a number and a special character"
          label="Password *"
          lineDirection="center"
          onChange={(value) => this.handleChange('password', value)}
          onBlur={() => {
            this.passConfirmation();
            this.strongPassValidator();
          }}
          type="password"
          value={password}
        />
        <TextField
          className="md-cell md-cell--bottom"
          id="confPassword"
          label="Confirm Password *"
          lineDirection="center"
          error={passConfirmationError}
          errorText="Passwords should be the same"
          onChange={(value) => this.handleChange('confPassword', value)}
          onBlur={this.passConfirmation}
          type="password"
          value={confPassword}
        />
        <Button
          flat
          onClick={this.handleCancel}
        >
          Cancel
        </Button>
        <Button
          flat
          disabled={
            (
              !name
              || !email
              || !password
              || !confPassword
              || passConfirmationError
              || emailError
            )
          }
          primary
          onClick={this.handleRegister}
        >
          Register
        </Button>
      </div>
    );
  }

  handleSwitchClick = (e) => {
    e.preventDefault();
    this.setState({
      ...initialState,
       isLogging: !this.state.isLogging
    });
  }

  render() {
    const { isLogging } = this.state;
    return (
      <section>
        <h1>Welcome to your pokedex online</h1>
        {
          isLogging
            ? this.renderLogging()
            : this.renderRegister()
        }
        <a href="" onClick={this.handleSwitchClick}>
          {
            isLogging
              ? <span>Register here</span>
              : <span>Log in</span>
          }
        </a>
      </section>
    );
  }
}

const mapStateToProps = ({ users }) => ({
  loggedUser: users.loggedInUser
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  loggin,
  registerUser
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
