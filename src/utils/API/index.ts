import { SignIn as signIn, SignUp as signUp, isAuthenticated} from "./auth";
import { getInfiniteStreams, getTopStream } from "./stream";
import {getStudent} from "./student";
export const API = "http://localhost:8080/api/";

const apis = {
    auth: {
        signIn,
        signUp,
        isAuthenticated
    },
    student: {
        getStudent
    },
    stream:{
        topStream: getTopStream,
        infinite: getInfiniteStreams
    }
}

export default apis;