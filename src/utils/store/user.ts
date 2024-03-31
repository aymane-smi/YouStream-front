import {create} from "zustand";
export type authType = {
    loggedStatus: string | null,
    setLoggedStatus: () => void,
    setEmptyLoggedSttaus: ()=> void
}
const useAuthStore = create<authType>((set)=>({
    loggedStatus: localStorage.getItem("token"),
    setLoggedStatus: ()=>set((state)=>({loggedStatus: localStorage.getItem("token")})),
    setEmptyLoggedSttaus: ()=>set((state)=>({loggedStatus: undefined}))
}));