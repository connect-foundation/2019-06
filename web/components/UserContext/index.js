import React, { useState, createContext } from 'react';
import axios from 'axios';
import Router from 'next/router';

const UserContext = createContext();

const { Provider } = UserContext;

const UserProvider = props => {
  const [user, setUser] = useState(null);

  const signOut = () => {
    setUser(user);
    Router.push('/login');
  };

  const value = { user, signOut, setUser };
  return <Provider value={value}>{props.children}</Provider>;
};

export { UserProvider, UserContext };
