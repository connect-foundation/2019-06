import { useState, useEffect } from 'react';
import request from './request';

const useFetch = (callback, URL) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInitData = async () => {
      setIsLoading(true);
      const { data } = await request.get(URL);
      callback(data);
      setIsLoading(false);
    };

    fetchInitData(URL);
  }, [callback, URL]);
  return isLoading;
};

export default useFetch;
