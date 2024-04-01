import axios from "axios"
import { API } from "."
import { StudentList } from "../models/StudentList"
import axiosInstance from "./AxiosConfig"
import { StudentEditUserDTO } from "../models/StudentEditUserDTO"
import { StudentEditPwdDTO } from "../models/StudentEditPwdDTO"
import { SubscriberDTO } from "../models/SubscriberDTO"
import {SubscriberRDTO} from "../models/SubscriberRDTO";
import { StudentInfoDTO } from "../models/StudentInfoDTO"

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
    }>(`student/editUsername?userType=student`, studentEditUser);
}

export const editPassword = (studentEditPwd:StudentEditPwdDTO)=>{
    return axiosInstance.post<{
        "message": String
    }>(`student/editPassword?userType=student`, studentEditPwd);
}
export const subscribe = (subscriber:SubscriberRDTO)=>{
    return axiosInstance.post<SubscriberRDTO>('student/subscribe?userType=student', subscriber);
}

export const getStudentInfo = ()=>{
    return axiosInstance.get<StudentInfoDTO>('student/all?userType=admin');
}