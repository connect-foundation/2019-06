import React, { useState, useRef } from 'react';

export const sendMailContext = React.createContext();

const sendMailContextProvider = ({ children }) => {
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

  return <sendMailContext.Provider {...props}>{children}</sendMailContext.Provider>;
};

export default sendMailContextProvider;
