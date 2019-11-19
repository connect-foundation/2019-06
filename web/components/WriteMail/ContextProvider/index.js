import React, { useReducer, useContext } from 'react';
import { wmReducer } from './reducer';
import { initialState } from './reducer/initial-state';

const WMstateContext = React.createContext();
const WMdispatchContext = React.createContext();

export const WriteMailContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(wmReducer, initialState);
  return (
    <WMstateContext.Provider value={state}>
      <WMdispatchContext.Provider value={dispatch}>{children}</WMdispatchContext.Provider>
    </WMstateContext.Provider>
  );
};

export const useStateForWM = () => {
  const ctx = useContext(WMstateContext);
  if (ctx === undefined) {
    throw new Error('useStateForWM은 WriteMailContextProvider 내에서 사용할 수 있습니다');
  }
  return ctx;
};

export const useDispatchForWM = () => {
  const ctx = useContext(WMdispatchContext);
  if (ctx === undefined) {
    throw new Error('useDispatchForWM은 WriteMailContextProvider 내에서 사용할 수 있습니다');
  }
  return ctx;
};
