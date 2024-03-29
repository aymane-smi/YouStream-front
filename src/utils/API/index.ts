import { SignIn as signIn, SignUp as signUp, isAuthenticated, refreshToken} from "./auth";
import { getInfiniteStreams, getTopStream, getStreamById, createStream } from "./stream";
import {getStudent, editUsername, editPassword, subscribe} from "./student";
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
        subscribe
    },
    stream:{
        topStream: getTopStream,
        infinite: getInfiniteStreams,
        getStreamById,
        createStream
    }
}

export default apis;