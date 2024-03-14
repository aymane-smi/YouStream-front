import axios from "axios"
import { API } from "."
import { StudentList } from "../models/StudentList"

export const getStudent = ()=>{
    return axios.get<StudentList[]>(`${API}student`, {
        headers: {
            "Content-Type": "application/json"
        }
    })
}