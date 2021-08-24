import { useState, useCallback } from 'react';

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (reqConfig, configerData) => {
    setIsLoading(true);

    try {
      const response = await fetch(reqConfig.url, {
        method: reqConfig.method ? reqConfig.method : 'GET',
        headers: reqConfig.headers ? reqConfig.headers : {},
        body: reqConfig.body ? JSON.stringify(reqConfig.body) : null,
      });

      if (!response.ok) {
        throw new Error('Request Failed...');
      }

      const data = await response.json();
      configerData(data);
    } catch (err) {
        setError(err.message || 'Something went wrong..');
    }

    setIsLoading(false);
  }, []);

  return {
      isLoading,
      error,
      fetchData
  };
};

export default useHttp;