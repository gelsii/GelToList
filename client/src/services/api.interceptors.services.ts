import axios from "axios";
import apiServices from "./api.services";

const apiInterceptors = () => {
  apiServices.interceptors.request.use(async (config) => {
    const response = await axios.get(
      `${import.meta.env.VITE_BASEURL_SERVER}/auth/token`, {
        withCredentials: true
      }
    );

    config.headers.Authorization = `Bearer ${response.data?.access_token}`;

    return config;
  });
};

export default apiInterceptors;
