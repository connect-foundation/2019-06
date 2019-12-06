import { useState, useEffect } from "react";
import request from "./request";

const initialValues = { loading: true, error: false, data: null };

const useFetch = URL => {
  const [fetchingData, setFetchingData] = useState(initialValues);

  useEffect(() => {
    const fetchInitData = async () => {
      setFetchingData(initialValues);

      const { isError, data } = await request.get(URL);
      if (isError) {
        setFetchingData({ loading: false, error: data, data: null });
      } else {
        setFetchingData({ loading: false, error: null, data });
      }
    };

    fetchInitData(URL);
  }, [URL]);

  return fetchingData;
};

export default useFetch;
