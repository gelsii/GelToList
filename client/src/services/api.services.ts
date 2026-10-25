import axios from "axios";
import apiInterceptors from "./api.interceptors.services";

const apiServices = axios.create({
  baseURL: import.meta.env.VITE_BASEURL_SERVER,
  withCredentials: true,
});

export default apiServices;

apiInterceptors();
