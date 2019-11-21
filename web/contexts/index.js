import React, { useState, createContext } from 'react';

const AppContext = createContext();

const { Provider } = AppContext;

const AppProvider = props => {
  const [user, setUser] = useState(null);

  // const logout = () => {
  //   setUser(null);
  //   Router.push('/login');
  // };

  const userContext = {
    user,
    setUser,
  };

  const value = { userContext };
  return <Provider value={value}>{props.children}</Provider>;
};

export { AppProvider, AppContext };
