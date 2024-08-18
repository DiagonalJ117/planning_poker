/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

export default class Api {

  constructor( baseURL: string | undefined) {
    axios.defaults.baseURL = baseURL;
    axios.interceptors.request.use(
      this.onRequest.bind(this),
      this.onRequestError.bind(this),
    );
    axios.interceptors.response.use(
      this.onResponse.bind(this),
      this.onResponseError.bind(this),
    );
  }

  onRequestError(error: AxiosError) {
    return Promise.reject(error);
  }

  onResponseError(error: AxiosError) {
    return Promise.reject(error);
  }

  onRequest(config: AxiosRequestConfig | any) {
    config.headers = config.headers || {};
    return config;
  }

  onResponse(response: AxiosResponse) {
    return response;
  }
}