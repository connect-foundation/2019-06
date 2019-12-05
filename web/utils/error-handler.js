import React from 'react';
import Router from 'next/router';

const handleErrorStatus = ({ status, message }) => {
  let returnValue = '';
  switch (status) {
    case 401:
      Router.push('/login');
      break;
    default:
      returnValue = <div>{message}</div>;
      break;
  }
  return returnValue;
};

export default handleErrorStatus;
