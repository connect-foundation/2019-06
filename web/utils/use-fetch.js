import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (callback, url, query) => {
  const [loading, setLoading] = useState(true);
  const queryStr = Object.entries(query)
    .map(([k, v]) => `${k}=${v}`)
    .reduce((a, b) => `${a}&${b}`);

  const fetchInitialData = async () => {
    const { data } = await axios.get(`${url}?${queryStr}`);
    callback(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  return loading;
};

export default useFetch;
