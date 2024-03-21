import axios from "axios";
import { API } from ".";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/api/"
});

axiosInstance.interceptors.request.use((config)=>{
    config.headers['Content-Type'] = "application/json";
    if(config.url?.includes("userType"))
        config.headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`
    console.log(config);
    return config;
});

export default axiosInstance;