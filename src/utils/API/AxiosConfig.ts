import axios from "axios";
import { API } from ".";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/api/"
});

axiosInstance.interceptors.request.use((config)=>{
    config.headers['Content-Type'] = "application/json";
    if(config.url?.includes("userType"))
        config.headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`
    return config;
}, async(error)=>{
    console.log("inside request error");
});

axiosInstance.interceptors.response.use((response)=>{
    return response;
});

/*
, (ResponseError)=>{
    const {error}:{error:string} = ResponseError.response.data;
    if(error == "expired")
        return "expired";
}
*/

export default axiosInstance;