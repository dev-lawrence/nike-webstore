import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useFetchData = (apiUrl) => {
  const fetchData = async () => {
    try {
      const response = await axios.get(apiUrl);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return [];
      }
    }
  };

  const { data, isLoading, isError } = useQuery(['product', apiUrl], fetchData);

  return { data, loading: isLoading, error: isError };
};

export default useFetchData;
