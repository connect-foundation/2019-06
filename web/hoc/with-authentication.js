import React from 'react';
import Loading from '../components/Loading';
import { useAuthentication } from '../hook/use-authentication';

const withAuthentication = WrappedComponent => {
  const containerComponent = () => {
    const userAndLoading = useAuthentication();

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
