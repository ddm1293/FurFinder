import { useEffect } from "react";
import { useSelector } from 'react-redux';
import axios from 'axios';
import useRefreshToken from "./useRefreshToken";

const axiosPrivate = axios.create({
  baseURL: 'http://localhost:3001', // TODO: better handling of baseURL
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
});

const useAxiosPrivate = () => {
  const user = useSelector((state) => state.user);
  const refresh = useRefreshToken();

  useEffect(() => {
    // attach accessToken to header if it wasn't already
    const requestIntercept = axiosPrivate.interceptors.request.use(
      config => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${user?.accessToken}`;
        }
        return config;
      }, (error) => Promise.reject(error)
    );

    // if accessToken has expired, refresh it
    const responseIntercept = axiosPrivate.interceptors.response.use(
      response => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    }
  }, [user, refresh]);

  return axiosPrivate;
}

export default useAxiosPrivate;
