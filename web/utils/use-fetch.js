import { useState, useEffect } from 'react';
import request from './request';

const useFetch = (callback, URL) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInitData = async () => {
      setIsLoading(true);
      const response = await request.get(URL);
      if (response.isError) {
        // TODO : 에러처리 핸들러 만들기
      }
      callback(response.data);
      setIsLoading(false);
    };

    fetchInitData(URL);
  }, [callback, URL]);
  return isLoading;
};

export default useFetch;
