import { API } from ".";
import { userLogin } from "../models/userSignIn";
import { userSignUp } from "../models/userSignUp";
import axios from "axios";
import axiosInstance from "./AxiosConfig";
import { SignedStudentDTO } from "../models/SignedStudentDTO";

export const SignIn = (credentiels:userLogin)=>{
    return axios.post(API+"auth/student/signin", credentiels);
};

export const SignUp = async (student:userSignUp)=>{
    const response = await fetch(API+"auth/student/signup", {
        method: "POST",
        body: JSON.stringify(student),
        headers: {
            "Content-Type": "application/json"
        }
    });
    const data = await response.json();
    return data;
}

export const isAuthenticated = ()=>{
    return localStorage.getItem("token") ? true : false;
}

export const refreshToken = async ()=>{
    const {data} = await axiosInstance.get<SignedStudentDTO>(`auth/student/refresh/token/${localStorage.getItem("refresh_token")}`);
    return data;
}