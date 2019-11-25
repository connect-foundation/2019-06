import React, { useReducer, createContext } from 'react';
import { reducer, initialState } from './reducer';

const AppStateContext = createContext();
const AppDisapthContext = createContext();

const AppProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppStateContext.Provider value={{ state }}>
      <AppDisapthContext.Provider value={{ dispatch }}>{props.children}</AppDisapthContext.Provider>
    </AppStateContext.Provider>
  );
};

export { AppProvider, AppStateContext, AppDisapthContext };
