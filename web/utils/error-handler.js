import React from 'react';
import Router from 'next/router';
import UserError from '../components/Error/User';
import ServerError from '../components/Error/Server';

const handleErrorStatus = ({ status, message }) => {
  let returnValue = '';

  if (status === 401) {
    Router.push('/login');
  } else if (status >= 400 && status < 500) {
    returnValue = <UserError message={message} />;
  } else if (status >= 500) {
    returnValue = <ServerError message={message} />;
  }

  return returnValue;
};

export default handleErrorStatus;
