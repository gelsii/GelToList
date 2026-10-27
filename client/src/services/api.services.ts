import axios from "axios";

const apiServices = axios.create({
  baseURL: import.meta.env.VITE_BASEURL_SERVER,
  withCredentials: true,
});

export default apiServices;
