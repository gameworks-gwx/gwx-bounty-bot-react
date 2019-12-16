import { useState, useEffect } from 'react'

const useFetch = (url, options) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const response = await fetch(url, options)
        const json = await response.json();
        setResponse(json);
      } catch (error) {
        setError(error)
      }
    }
    fetchAPI();
  }, [])

  return { response, error };
}

export default useFetch;