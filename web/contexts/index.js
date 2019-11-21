import React, { useReducer, createContext } from 'react';
import { reducer, initialState } from './reducer';

const AppContext = createContext();
const { Provider } = AppContext;

const AppProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <AppContext.Provider value={{ state, dispatch }}>{props.children}</AppContext.Provider>;
};

export { AppProvider, AppContext };
