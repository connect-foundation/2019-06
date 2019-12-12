import { useState, useEffect } from 'react';
import Router from 'next/router';

import storage from '../utils/storage';

const initialValueState = {
  email: '',
  name: '',
  sub_email: '',
  loading: true,
};

const useAuthentication = () => {
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

  return userAndLoading;
};

export { useAuthentication };
