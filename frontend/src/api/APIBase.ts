/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig } from 'axios';

const doRequest = async (options: AxiosRequestConfig<any>): Promise<any> => {
  const config: AxiosRequestConfig = {
    baseURL: import.meta.env.VITE_APP_API_URL || 'http://localhost:4000',
    headers: { 'Content-Type' : 'application/json' },
    responseType: 'json',
    ...options,
  };

  return axios.request(config)
              .then((response) =>  response ? response.data : null);
};

export default doRequest;