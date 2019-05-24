// @vendors
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, DialogContainer, TextField } from 'react-md';
import { withRouter } from "react-router";

// @utils
import { validateEmail } from '../../utils';

// @actions
import { logout, editUser } from '../../actions/users';

class Menu extends Component {
  state = {
    visible: false,
    email: this.props.loggedUser.email,
    emailChanged: false,
    password: '',
    passwordChanged: false,
    name: this.props.loggedUser.name,
    nameChanged: false,
    emailError: false
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

  render() {
    const { loggedUser, history } = this.props;
    const {
      visible,
      name,
      email,
      password,
      emailError
    } = this.state;

    const actions = [];
    actions.push({ secondary: true, children: 'Cancel', onClick: this.hide });
    actions.push(
      <Button
        flat
        disabled={emailError}
        primary
        onClick={this.onConfirm}
      >
        Confirm
      </Button>
    );

    return (
      <section>
        <Button
          icon
          primary
          onClick={() => history.goBack()}
        >
          chevron_left
        </Button>
        <h1>
          Welcome {loggedUser.name}
        </h1>
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
        <DialogContainer
          id="simple-action-dialog"
          visible={visible}
          onHide={this.hide}
          actions={actions}
          title="Your Profile"
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
              label="New Password"
              lineDirection="center"
              onChange={(value) => this.handleChange('password', value)}
              onBlur={this.passConfirmation}
              type="password"
              value={password}
            />
          </div>
        </DialogContainer>
      </section>
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
