import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (callback, url) => {
  const [loading, setLoading] = useState(true);

  const fetchInitialData = async () => {
    const { data } = await axios.get(url);
    callback(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  return loading;
};

export default useFetch;
