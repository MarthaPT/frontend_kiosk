import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';

export const Api = (
  serviceURL: string = import.meta.env.VITE_ENV_SERVICE
): AxiosInstance => {
  const baseURL = `${serviceURL}/`;

  const axiosConfig: AxiosRequestConfig = {
    baseURL,
  };

  const httpInterceptor: AxiosInstance = axios.create(axiosConfig);

  httpInterceptor.interceptors.request.use(
    async (request) => {
      // If the request data is FormData, let Axios set the headers
      if (request.data instanceof FormData) {
        // Remove 'Content-Type' to let Axios set it, including the boundary
        delete request.headers['Content-Type'];
      } else {
        // For JSON requests, set headers as application/json
        request.headers['Accept'] = 'application/json';
        request.headers['Content-Type'] = 'multipart/form-data';
        request.headers['Content-Type'] = 'application/json';
      }

      // Remove 'Access-Control-Allow-Origin' as it's a response header
      delete request.headers['Access-Control-Allow-Origin'];

      return request;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );

  httpInterceptor.interceptors.response.use(
    (response) => {
      return response.data;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );

  return httpInterceptor;
};
