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
import { FaPen } from "react-icons/fa";
import { StudentEditUserDTO } from "@/utils/models/StudentEditUserDTO";
import { editPassword } from "@/utils/API/student";
import { StudentEditPwdDTO } from "@/utils/models/StudentEditPwdDTO";

export const EditStudent = ({option, value=""}:{option:Number, value?:string})=>{
    const {editUsername} = apis.student;
    const [message, setMessage] = useState<string>("");
    const [open, setOpen] = useState<boolean>(false);
    const editUserMutation = useMutation(editUsername, {
        onSuccess: (data)=>{
            setOpen(false);
            setMessage("");
        },
        onError: (error:Error)=>{
            setMessage(`error during the update for the username`);
        },
    });
    const editPwdMutation = useMutation(editPassword, {
      onSuccess: (data)=>{
          setOpen(false);
          setMessage("");
      },
      onError: (error:Error)=>{
          setMessage(`error during the update for the password`);
      },
  });
  const costumeString = option === 1 ? "username" : "password";
    const costumeObj = ()=>{
      if(option === 1)
        // username
        return {username: value}
      else if(option === 2)
        // password
        return {password: value}
    }
    const {formState: {errors}, handleSubmit, register} = useForm<any>({
        defaultValues: costumeObj()
    });
    const onSubmit: SubmitHandler<any> = (data)=>{
      if(option === 1)
        editUserMutation.mutate(data);
      else if(option === 2)
        editPwdMutation.mutate(data);
    }
    return (<Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button className="px-2 py-1 border-[0.5px] rounded-md rounded-l-none border-white border-l-0 flex justify-center items-center" onClick={()=>setOpen(true)}>
            <FaPen size={15} />
          </button>
        </DialogTrigger>
        <DialogContent className="bg-[#18181B] flex flex-col justify-center items-center">
          <DialogHeader className="flex flex-row justify-center items-center gap-2">
            <DialogTitle className="text-[28px]">Change {option === 1 ? "Username" : "Password"}</DialogTitle>
          </DialogHeader>
          <form className="w-full p-3 flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col justify-center items-start w-full gap-2">
                <label htmlFor={option === 1 ? "username" : "password"} className="font-bold text-[13px]">{option === 1 ? "Username" : "Password"}</label>
                <input className="w-full border-[0.5px] rounded border-white bg-transparent text-[19px] focus:border-[#A96FFF] focus:border-3 outline-none box-border"
                       id={option === 1 ? "username" : "password"}
                       {...register(costumeString, {required: `${costumeString} is required`})}
                />
                {errors && <p className="text-red-500">{errors.root?.message}</p>}
              </div>
              <p className="text-red-500 w-full text-center">{message.length > 0 && message}</p>
              {editUserMutation.isLoading || editPwdMutation.isLoading ? 
                <div className="w-full flex justify-center items-center">
                    <ScaleLoader color="#A96FFF"/>
                </div> : 
                <button className="w-full text-white bg-[#A96FFF] rounded-sm p-1">Edit</button>
              }
            </form>
        </DialogContent>
      </Dialog>);
}