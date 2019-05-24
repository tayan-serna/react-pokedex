// @vendors
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, DialogContainer, TextField } from 'react-md';
import { withRouter } from "react-router";

// @utils
import { validateEmail, validateStrongPass } from '../../utils';

// @actions
import { logout, editUser } from '../../actions/users';

// @styles
import './styles.scss';

class Menu extends Component {
  state = {
    visible: false,
    email: this.props.loggedUser.email,
    emailChanged: false,
    password: '',
    passwordChanged: false,
    name: this.props.loggedUser.name,
    nameChanged: false,
    emailError: false,
    weakPass: false
  };

  handleLogout = () => {
    const { logout, history } = this.props;
    history.push('/');
    logout();
  }

  handleClickEdit = () => {
    this.setState({ visible: true });
  }

  hide = () => {
    this.setState({ visible: false });
  }

  onConfirm = () => {
    const { editUser, loggedUser } = this.props;
    const {
      email,
      password,
      name,
      emailChanged,
      passwordChanged,
      nameChanged
    } = this.state;

    const newUser = {
      id: loggedUser.id
    };
    if (emailChanged) { newUser.email = email };
    if (passwordChanged) { newUser.password = password };
    if (nameChanged) { newUser.name = name };
    editUser(newUser);
    this.hide();
  }

  handleChange = (field, value) => {
    this.setState({
      [field]: value,
      [`${field}Changed`]: true
    });
  }

  handleBlurEmail = () => {
    const { email } = this.state;
    this.setState({
      emailError: !validateEmail(email)
    });
  }

  strongPassValidator = () => {
    const { password } = this.state;
    this.setState({
      weakPass: !validateStrongPass(password)
    });
  }

  render() {
    const { loggedUser, history } = this.props;
    const {
      visible,
      name,
      email,
      password,
      emailError,
      weakPass
    } = this.state;

    const actions = [];
    actions.push({ secondary: true, children: 'Cancel', onClick: this.hide });
    actions.push(
      <Button
        flat
        disabled={emailError || weakPass}
        primary
        onClick={this.onConfirm}
      >
        Confirm
      </Button>
    );

    return (
      <Fragment>
        <section className="menu-container">
          <Button
            icon
            primary
            onClick={() => history.goBack()}
          >
            chevron_left
          </Button>
          <h1 className="menu-container__title">
            Welcome {loggedUser.name}
          </h1>
          <div>
            <Button
              icon
              primary
              onClick={this.handleClickEdit}
            >
              account_circle
            </Button>
            <Button
              icon
              primary
              onClick={this.handleLogout}
            >
              close
            </Button>
          </div>
        </section>
        <DialogContainer
          id="edit-profile"
          visible={visible}
          onHide={this.hide}
          actions={actions}
          title="My Profile"
          width={360}
        >
          <div>
            <TextField
              className="md-cell md-cell--bottom"
              id="name"
              label="Trainer Name"
              lineDirection="center"
              onChange={(value) => this.handleChange('name', value)}
              value={name}
            />
            <TextField
              className="md-cell md-cell--bottom"
              id="email"
              label="Email"
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
              label="New Password"
              lineDirection="center"
              onChange={(value) => this.handleChange('password', value)}
              onBlur={this.strongPassValidator}
              type="password"
              value={password}
            />
          </div>
        </DialogContainer>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ users }) => ({
  loggedUser: users.loggedInUser
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  logout,
  editUser
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Menu));
