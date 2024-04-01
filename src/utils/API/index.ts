import { SignIn as signIn, SignUp as signUp, isAuthenticated, refreshToken} from "./auth";
import { getInfiniteStreams, getTopStream, getStreamById, createStream, getStudentStream } from "./stream";
import {getStudent, editUsername, editPassword, subscribe, getStudentInfo, toggleActivation} from "./student";
import { getStrikes } from "./strike";
export const API = "http://localhost:8080/api/";

const apis = {
    auth: {
        signIn,
        signUp,
        isAuthenticated,
        refreshToken
    },
    student: {
        getStudent,
        editUsername,
        editPassword,
        subscribe,
        getStudentInfo,
        toggleActivation
    },
    stream:{
        topStream: getTopStream,
        infinite: getInfiniteStreams,
        getStreamById,
        createStream,
        getStudentStream
    },
    strike: {
        getStrikes
    }
}

export default apis;