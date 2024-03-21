import { SignIn as signIn, SignUp as signUp, isAuthenticated, } from "./auth";
import { getInfiniteStreams, getTopStream, getStreamById } from "./stream";
import {getStudent, editUsername, editPassword} from "./student";
export const API = "http://localhost:8080/api/";

const apis = {
    auth: {
        signIn,
        signUp,
        isAuthenticated
    },
    student: {
        getStudent,
        editUsername,
        editPassword
    },
    stream:{
        topStream: getTopStream,
        infinite: getInfiniteStreams,
        getStreamById
    }
}

export default apis;