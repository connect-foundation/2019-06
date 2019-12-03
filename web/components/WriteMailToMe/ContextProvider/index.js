import React, { useReducer, useContext } from 'react';
import { writeMailToMeReducer } from './reducer';
import { initialState } from './reducer/initial-state';

const WriteMailToMeStateContext = React.createContext();
const WriteMailToMeDispatchContext = React.createContext();

export const WriteMailToMeContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(writeMailToMeReducer, initialState);
  return (
    <WriteMailToMeStateContext.Provider value={state}>
      <WriteMailToMeDispatchContext.Provider value={dispatch}>
        {children}
      </WriteMailToMeDispatchContext.Provider>
    </WriteMailToMeStateContext.Provider>
  );
};

export const useWriteMailToMeState = () => {
  const ctx = useContext(WriteMailToMeStateContext);
  if (ctx === undefined) {
    throw new Error(
      'useWriteMailToMeState은 WriteMailToMeContextProvider 내에서 사용할 수 있습니다',
    );
  }
  return ctx;
};

export const useWriteMailToMeDispatch = () => {
  const ctx = useContext(WriteMailToMeDispatchContext);
  if (ctx === undefined) {
    throw new Error(
      'useWriteMailToMeDispatch은 WriteMailToMeContextProvider 내에서 사용할 수 있습니다',
    );
  }
  return ctx;
};
