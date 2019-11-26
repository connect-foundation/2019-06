import { useState, useEffect } from 'react';
import request from './request';

const useFetch = (callback, URL) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInitData = async () => {
      setIsLoading(true);
      const { isError, data } = await request.get(URL);
      if (isError) {
        callback(data);
        return;
      }
      callback(null, data);
      setIsLoading(false);
    };

    fetchInitData(URL);
  }, [callback, URL]);
  return isLoading;
};

export default useFetch;
