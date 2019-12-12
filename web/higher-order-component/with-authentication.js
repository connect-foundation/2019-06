import React from 'react';
import Loading from '../components/Loading';
import { useAuthentication } from '../hook/use-authentication';

const withAuthentication = WrappedComponent => {
  const containerComponent = () => {
    const user = useAuthentication();

    return !user ? (
      <></>
    ) : (
      <WrappedComponent name={user.name} sub_email={user.sub_email} email={user.email} />
    );
  };

  return containerComponent;
};

export { withAuthentication };
