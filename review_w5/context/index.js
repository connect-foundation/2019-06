import React, { useReducer, createContext } from 'react';
import { reducer, initialState } from './reducer';

const AppStateContext = createContext();
const AppDispatchContext = createContext();

const AppProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppStateContext.Provider value={{ state }}>
      <AppDispatchContext.Provider value={{ dispatch }}>
        {props.children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
};

export { AppProvider, AppStateContext, AppDispatchContext };
