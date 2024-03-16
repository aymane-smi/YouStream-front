import axios from "axios"
import { API } from "."
import { StreamTopDTO } from "../models/StreamTopDTO"

export const getTopStream = ()=>{
    return axios.get<StreamTopDTO[]>(`${API}stream/features`)
}

export const getInfiniteStreams = (offset:Number = 0)=>{
    return axios.get<StreamTopDTO[]>(`${API}stream/features/page?offset=${offset}`);
}