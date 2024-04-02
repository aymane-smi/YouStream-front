"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { faTwitch } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "../ui/button";
import { userLogin } from "@/utils/models/userSignIn";
import {useForm, SubmitHandler} from "react-hook-form";
import apis from "@/utils/API";
import { useMutation } from "react-query";
import { useState } from "react";
import {ScaleLoader} from "react-spinners";
import { useAuthStore } from "@/utils/store/user";

export const LoginButton = ()=>{
    const {auth} = apis;
    const logged = useAuthStore((state)=>state.setLoggedStatus);
    const [message, setMessage] = useState<string>("");
    const [open, setOpen] = useState<boolean>(false);
    const signinMutation = useMutation(auth.signIn, {
        onSuccess: (data)=>{
            setOpen(false);
            setMessage("");
            localStorage.setItem("token", data.data.token)
            localStorage.setItem("refresh_token", data.data.refresh_token);
            localStorage.setItem("id", data.data.id);
            logged();
        },
        onError: (error:Error)=>{
            setMessage("bad credentiels");
        },
    });
    const {formState: {errors}, handleSubmit, register} = useForm<userLogin>({
        defaultValues: {
            username: "",
            password: ""
        }
    });
    const onSubmit: SubmitHandler<userLogin> = (data)=>{
        signinMutation.mutate(data);
    }
    return (<Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="bg-[#2F2F35] w-fit p-1 rounded-sm text-white font-semibold text-[12px]" onClick={()=>setOpen(true)}>Se connecter</Button>
        </DialogTrigger>
        <DialogContent className="bg-[#18181B] flex flex-col justify-center items-center">
          <DialogHeader className="flex flex-row justify-center items-center gap-2">
            <FontAwesomeIcon icon={faTwitch} style={{
                color: "#A96FFF",
                width: "50px",
                height: "50px"
            }}/>
            <DialogTitle className="text-[28px]">Se connecter à YouStream</DialogTitle>
          </DialogHeader>
          <form className="w-full p-3 flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col justify-center items-start w-full gap-2">
                <label htmlFor="username" className="font-bold text-[13px]">Identifiant</label>
                <input className="w-full border-[0.5px] rounded border-white bg-transparent text-[19px] focus:border-[#A96FFF] focus:border-3 outline-none box-border"
                       id="username"
                       {...register("username", {required: "nom d'utilisateur est requis"})}
                />
                <p className="text-red-500">{errors.username?.message}</p>
              </div>
              <div className="flex flex-col justify-center items-start w-full gap-2">
                <label htmlFor="password" className="font-bold text-[13px]">Mot de passe</label>
                <input type="password" 
                       id="password"
                       className="w-full border-[0.5px] rounded border-white bg-transparent text-[19px] focus:border-[#A96FFF] focus:border-3 outline-none box-border"
                       {...register("password", {required: "mot de passe est requis"})}
                />
              </div>
              <p className="text-red-500 w-full text-center">{message.length > 0 && message}</p>
              {signinMutation.isLoading ? 
                <div className="w-full flex justify-center items-center">
                    <ScaleLoader color="#A96FFF"/>
                </div> : 
                <button className="w-full text-white bg-[#A96FFF] rounded-sm p-1">Se connecter</button>
              }
            </form>
        </DialogContent>
      </Dialog>);
}