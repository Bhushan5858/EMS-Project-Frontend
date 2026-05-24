import axios from "axios";
export const axiosInstance = axios.create({
  baseURL: "http://13.205.209.102:5000",
  withCredentials: true,
});

 