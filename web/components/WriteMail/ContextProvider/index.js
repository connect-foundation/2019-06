import React, { useState, useRef } from 'react';

export const WriteMailContext = React.createContext();

const WriteMailContextProvider = ({ children }) => {
  const [receivers, setReceivers] = useState([]);
  const subjectComponent = useRef(null);
  const bodyComponent = useRef(null);

  const props = {
    value: {
      receiver: { receivers, setReceivers },
      subjectComponent,
      bodyComponent,
    },
  };

  return <WriteMailContext.Provider {...props}>{children}</WriteMailContext.Provider>;
};

export default WriteMailContextProvider;
