import React, { useState, useEffect } from 'react';
import Router from 'next/router';

import storage from '../utils/storage';
import Loading from '../components/Loading';

const withAuthentication = WrappedComponent => {
  const initialValueState = {
    email: '',
    name: '',
    sub_email: '',
    loading: true,
  };

  const containerComponent = () => {
    const [userAndLoading, setUserAndLoading] = useState(initialValueState);

    useEffect(() => {
      const user = storage.getUser();
      if (!user) {
        Router.push('/login');
        return;
      }

      const { name, sub_email, email } = user;
      setUserAndLoading({
        name,
        sub_email,
        email,
        loading: false,
      });
    }, []);

    const { name, sub_email, email, loading } = userAndLoading;

    return loading ? (
      <Loading full={true} />
    ) : (
      <WrappedComponent name={name} sub_email={sub_email} email={email} />
    );
  };

  return containerComponent;
};

export { withAuthentication };
