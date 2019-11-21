import React, { useReducer, createContext, useState } from 'react';
import { reducer, initialState } from './reducer';

const AppContext = createContext();

const AppProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [selected, setSelected] = useState(null);

  return (
    <AppContext.Provider value={{ state, dispatch, selected, setSelected }}>
      {props.children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
