"use client";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { faTwitch } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "../ui/button";
import { ChangeEvent, SyntheticEvent, useReducer, useState } from "react";

const reduce = (state:{
    disabled: boolean
}, action:String)=>{
    switch(action){
        case "ENABLE":
            return {
                disabled: false
            };
        case "DISABLE":
            return {
                disabled: true
            };
        default:
            return state;
    }
}

export const LoginButton = ()=>{
    const [state, dispatch] = useReducer(reduce, {disabled: true});
    const [form, setForm] = useState<{
        username:string,
        password: string
    }>({
        username: "",
        password: ""
    });
    const handleChange = (value: string, type:string)=>{
        if(type === "user")
            setForm({...form, username:value});
        else if(type === "pass")
            setForm({...form, password:value});
    }
    const handleSubmit = (e:SyntheticEvent)=>{
        e.preventDefault();
    };
    return (<Dialog>
        <DialogTrigger asChild className="absolute right-0">
          <Button variant="outline">Se connecter</Button>
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
          <form className="w-full p-3 flex flex-col gap-5" onSubmit={handleSubmit}>
              <div className="flex flex-col justify-center items-start w-full gap-2">
                <label htmlFor="username" className="font-bold text-[13px]">Identifiant</label>
                <input type="text" className="w-full border-[0.5px] rounded border-white bg-transparent text-[19px] focus:border-[#A96FFF] focus:border-3 outline-none box-border" onChange={
                    (e:ChangeEvent<HTMLInputElement>)=>handleChange(e.target.value, "user")}
                    />
              </div>
              <div className="flex flex-col justify-center items-start w-full gap-2">
                <label htmlFor="username" className="font-bold text-[13px]">Mot de passe</label>
                <input type="password" className="w-full border-[0.5px] rounded border-white bg-transparent text-[19px] focus:border-[#A96FFF] focus:border-3 outline-none box-border" onChange={
                    (e:ChangeEvent<HTMLInputElement>)=>handleChange(e.target.value, "pass")}
                    />
              </div>
              <button className="w-full text-white bg-[#A96FFF] rounded-sm p-1" disabled={state.disabled}>Se connecter</button>
            </form>
        </DialogContent>
      </Dialog>);
}