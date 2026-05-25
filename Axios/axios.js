import axios from "axios";
export const axiosInstance = axios.create({
  baseURL: "http://13.205.86.177:5000",
  withCredentials: true,
});

 