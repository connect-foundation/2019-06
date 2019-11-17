import React, { Component, createContext } from 'react';
import axios from 'axios';
import Router from 'next/router';

const UserContext = createContext();

const { Provider } = UserContext;

class UserProvider extends Component {
  state = {
    user: null,
  };

  signOut = () => {
    this.setState({
      user: null,
    });
    Router.push('/login');
  };

  setFail = fail => {
    this.setState({ fail });
  };

  setUser = user => {
    this.setState({ user });
  };

  render() {
    const {
      state: { user },
      signOut,
      setUser,
    } = this;

    const value = { user, signOut, setUser };
    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

export { UserProvider, UserContext };
