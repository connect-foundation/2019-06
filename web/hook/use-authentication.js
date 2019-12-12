import { useState, useEffect } from 'react';

import storage from '../utils/storage';
import history from '../utils/history';

const useAuthentication = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = storage.getUser();
    if (!userData) {
      history.push('/');
      return;
    }

    setUser(userData);
  }, []);

  return user;
};

export { useAuthentication };
