import axios from "axios";

const authServices = axios.create({
  baseURL: import.meta.env.VITE_BASEURL_SERVER,
  withCredentials: true,
});

export default authServices;
