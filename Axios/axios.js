import axios from "axios";
export const axiosInstance =axios.create({

    baseURL:"https://ems-project-backend-production.up.railway.app",
    withCredentials:true
});

 