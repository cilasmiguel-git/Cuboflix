import axios from "axios";
import apiConfig from "./apiConfig";

const axiosClient = axios.create({
  baseURL: apiConfig.baseUrl,
  headers: {
    'Content-Type':'application/json'
  },
  params: {
    api_key: apiConfig.apiKey
  }
});

axiosClient.interceptors.request.use(async (config) => config);

axiosClient.interceptors.response.use(
  function (response) {
    if (response && response.data) {
      return response.data;
    }
    return response;
  }, 
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosClient;