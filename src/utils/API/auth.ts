import { API } from ".";
import { userLogin } from "../models/userSignIn";
import { userSignUp } from "../models/userSignUp";
import axios from "axios";

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
    return localStorage.getItem("token") == undefined ? false : true;
}