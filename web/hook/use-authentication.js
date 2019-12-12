import { useState, useEffect } from 'react';
import Router from 'next/router';

import storage from '../utils/storage';

const useAuthentication = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = storage.getUser();
    if (!userData) {
      Router.push('/login');
      return;
    }

    setUser(userData);
  }, []);

  return user;
};

export { useAuthentication };
