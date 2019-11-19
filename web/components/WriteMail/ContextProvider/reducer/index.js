import { initialState } from './initial-state';

export const wmReducer = (state, action) => {
  switch (action.type) {
    case 'updateReceivers': {
      const { receivers } = action;
      return { ...state, receivers };
    }
    case 'updateSubject': {
      const { subject } = action;
      return { ...state, subject };
    }
    case 'updateText': {
      const { text } = action;
      return { ...state, text };
    }
    case 'updateFiles': {
      const { files } = action;
      return { ...state, files };
    }
    case 'init': {
      return { ...initialState };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};
