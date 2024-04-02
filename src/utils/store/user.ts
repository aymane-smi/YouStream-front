import store from "zustand";
export type authType = {
    loggedStatus: string | null,
    setLoggedStatus: () => void,
    setEmptyLoggedSttaus: ()=> void
}
export const useAuthStore = store<authType>((set)=>({
        loggedStatus: localStorage.getItem("token"),
        setLoggedStatus: ()=>set((state)=>({loggedStatus: localStorage.getItem("token")})),
        setEmptyLoggedSttaus: ()=>set((state)=>({loggedStatus: undefined}))
    }));