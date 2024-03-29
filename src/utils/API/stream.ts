import axiosInstance from "./AxiosConfig"
import { API } from "."
import { StreamTopDTO } from "../models/StreamTopDTO"
import { StreamDTO } from "../models/StreamDTO"
import { TagDTO } from "../models/TagDTO"
import { StreamResponseDTO } from "../models/StreamResponseDTO"

export const getTopStream = ()=>{
    return axiosInstance.get<StreamTopDTO[]>(`${API}stream/features`)
}

export const getInfiniteStreams = (offset:Number = 0)=>{
    return axiosInstance.get<StreamTopDTO[]>(`${API}stream/features/page?offset=${offset}`);
}

export const getStreamById = (id:Number) =>{
    return axiosInstance.get<StreamDTO>(`${API}stream/features/find/${id}`);
}

export const createStream = (tags:TagDTO[])=>{
    return axiosInstance.post<StreamResponseDTO>(`${API}stream?userType=student`, {
        tags: tags
    });
}