import { StrikeDTO } from "../models/StrikeDTO"
import axiosInstance from "./AxiosConfig"

export const getStrikes = ()=>{
    return axiosInstance.get<StrikeDTO>("strike/all?userType=admin");
}