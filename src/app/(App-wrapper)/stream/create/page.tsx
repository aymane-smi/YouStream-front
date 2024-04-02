"use client"
import { Badge } from "@/components/ui/badge";
import Modal from "react-modal";
import { DialogFooter, DialogHeader } from "@/components/ui/dialog";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"
import apis from "@/utils/API";
import { TagDTO } from "@/utils/models/TagDTO";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { KeyboardEvent, useEffect, useState } from "react";
import { useMutation } from "react-query";
import { ScaleLoader } from "react-spinners";
import { toast } from "react-toastify";
import {v4 as uuidv4} from "uuid";
import { useRouter } from "next/navigation";

export default function CreateStream(){
    const [tags, setTags] = useState<TagDTO[]>([]);
    const [refreshLoading, setRefreshLoading] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const mutation = useMutation("ceateSteam", apis.stream.createStream);
    const router = useRouter();
    const handleEnter = (e:KeyboardEvent<HTMLInputElement>)=>{
        if(e.key === "Enter" && ((e.target as HTMLInputElement).value as string) !== ""){
            const value = (e.target as HTMLInputElement)?.value; 
            setTags((old)=>[...old, {id:0, tag_name:value}]);
            (e.target as HTMLInputElement).value = "";
        }
    }

    useEffect(()=>{
        const error = mutation.error?.response?.data?.error;
        if(error === "expired"){
            handleToast("session expired please relogin", "error");
             setRefreshLoading(true);
        }else if(error !== ""){
            handleToast(error, "error");
        }
    },[mutation.error]);
    const onSend = async()=>{
        const {data} = await mutation.mutateAsync(tags);
        console.log(data.streamToken);
        await navigator.clipboard.writeText(data?.streamToken);
        handleToast("stream created and the clipboard contain the stream id", "success", data.stream.id as number);
    }
    const onEmpty = ()=>{
        setTags([]);
    }

    const handleRefresh = async()=>{
        setIsLoading(true);
        const result = await apis.auth.refreshToken();
        localStorage.setItem("refresh_token", result.refresh_token)
        localStorage.setItem("token", result.token);
        setIsLoading(false);
        setRefreshLoading(false);
    }

    const handleToast = (message: string, type: string, id:number)=>{
        if(type === "error")
            toast.error(message);
        else if(type === "success")
            toast.success(message, {
                onClose: ()=>{
                    router.push(`/stream/${id}`);
                }
            });
    }
    return <div className="rounded-red-500 flex justify-center items-center w-full">
        {refreshLoading ? <div className="w-full flex justify-center items-center flex-col gap-3">
            <button className="rounded-md border p-2 bg-[#8F49FE] text-white" onClick={handleRefresh}>restart you session</button>
            {isLoading && <ScaleLoader color="#8F49FE"/>}
        </div>
        :
        <Drawer>
            <DrawerTrigger className="p-4 rounded-md border font-semibold">create new stream</DrawerTrigger>
            <DrawerContent className="flex justify-center items-center flex-col w-full">
                <DrawerHeader>
                <DrawerTitle className="w-full text-center">Stream Creation Form</DrawerTitle>
                </DrawerHeader>
                <input type="text" onKeyDown={handleEnter} className="p-2 bg-transparent rounded-md border"/>
                {/* <p className="text-red-500 text-[12px]">{mutation?.error?.message}</p> */}
                {tags && <div className="flex justify-center items-center gap-3 flex-wrap mt-3">
                    {tags.map((tag)=><Badge key={uuidv4()}>{tag.tag_name}</Badge>)}
                    </div>}
                <DrawerFooter>
                    { refreshLoading && <ScaleLoader color="#A96FFF" />}
                <DrawerClose className="flex justify-center items-center gap-3">
                    <button className="rounded-md border p-2 bg-[#8F49FE] text-white" onClick={onSend}>create</button>
                    <button className="rounded-md border p-2" onClick={onEmpty}>Cancel</button>
                </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>}
    </div>;
}