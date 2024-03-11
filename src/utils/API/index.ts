import { SignIn as signIn, SignUp as signUp, isAuthenticated} from "./auth";
export const API = "http://localhost:8080/api/";

const apis = {
    auth: {
        signIn,
        signUp,
        isAuthenticated
    }
}

export default apis;