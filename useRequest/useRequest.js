import defaultAxios from "axios";
import { useCallback, useEffect, useState } from "react";

export const createClient = (opts, axiosInstance = defaultAxios) => {
  return axiosInstance(opts);
};

export default client => {
  const [state, setState] = useState({
    loading: true,
    error: null,
    data: null
  });
  const [trigger, setTrigger] = useState(new Date());
  const refetch = () => {
    setState(state => ({
      ...state,
      loading: true
    }));
    setTrigger(new Date());
  };
  const makeFetch = useCallback(() => {
    client
      .then(data => {
        setState(state => ({
          ...state,
          loading: false,
          data
        }));
      })
      .catch(error => {
        setState(state => ({
          ...state,
          loading: false,
          error
        }));
      });
  }, [client]);
  useEffect(() => {
    makeFetch();
  }, [trigger, makeFetch]);
  return { ...state, refetch };
};
