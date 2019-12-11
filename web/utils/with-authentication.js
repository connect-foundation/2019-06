import React, { useState, useEffect } from 'react';
import Router from 'next/router';

import storage from './storage';
import Loading from '../components/Loading';

const withAuthentication = WrappedComponent => {
  const initialValuState = {
    email: '',
    name: '',
    sub_email: '',
    loading: true,
  };

  const containerComponent = () => {
    const [values, setValues] = useState(initialValuState);

    useEffect(() => {
      const user = storage.getUser();
      if (!user) {
        Router.push('/login');
        return;
      }

      const { name, sub_email, email } = user;
      setValues({
        name,
        sub_email,
        email,
        loading: false,
      });
    }, []);

    const { name, sub_email, email, loading } = values;

    return !loading ? (
      <WrappedComponent name={name} sub_email={sub_email} email={email} />
    ) : (
      <Loading full={true} />
    );
  };

  return containerComponent;
};

export { withAuthentication };
