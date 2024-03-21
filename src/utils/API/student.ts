import axios from "axios"
import { API } from "."
import { StudentList } from "../models/StudentList"
import axiosInstance from "./AxiosConfig"
import { StudentEditUserDTO } from "../models/StudentEditUserDTO"
import { StudentEditPwdDTO } from "../models/StudentEditPwdDTO"

export const getStudent = ()=>{
    return axios.get<StudentList[]>(`${API}student`, {
        headers: {
            "Content-Type": "application/json"
        }
    })
}

export const editUsername = (studentEditUser:StudentEditUserDTO)=>{
    console.log(studentEditUser);
    return axiosInstance.post<{
        "message": String
    }>(`${API}student/editUsername?userType=student`, studentEditUser);
}

export const editPassword = (studentEditPwd:StudentEditPwdDTO)=>{
    console.log(studentEditPwd);
    return axiosInstance.post<{
        "message": String
    }>(`${API}student/editPassword?userType=student`, studentEditPwd);
}