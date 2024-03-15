import axios from "axios"
import { API } from "."
import { StreamTopDTO } from "../models/StreamTopDTO"

export const getTopStream = ()=>{
    return axios.get<StreamTopDTO[]>(`${API}streamtest`)
}