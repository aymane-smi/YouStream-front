"use client"
import { Badge } from "@/components/ui/badge";
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
import { KeyboardEvent, useState } from "react";

export default function CreateStream(){
    const [tags, setTags] = useState<String[]>([]);
    const handleEnter = (e:KeyboardEvent<HTMLInputElement>)=>{
        if(e.key === "Enter" && ((e.target as HTMLInputElement).value as string) !== ""){
            const value = (e.target as HTMLInputElement)?.value; 
            setTags((old)=>[...old, value]);
            (e.target as HTMLInputElement).value = "";
        }
    }
    return <div className="rounded-red-500 flex justify-center items-center w-full">
        <Drawer>
            <DrawerTrigger className="p-4 rounded-md border font-semibold">create new stream</DrawerTrigger>
            <DrawerContent className="flex justify-center items-center flex-col w-full">
                <DrawerHeader>
                <DrawerTitle className="w-full text-center">Stream Creation Form</DrawerTitle>
                {/* <DrawerDescription>This action cannot be undone.</DrawerDescription> */}
                </DrawerHeader>
                <input type="text" onKeyDown={handleEnter} className="p-2 bg-transparent rounded-md border"/>
                {tags && <div className="flex justify-center items-center gap-3 flex-wrap mt-3">
                    {tags.map((tag)=><Badge>{tag}</Badge>)}
                    </div>}
                <DrawerFooter>
                <DrawerClose className="flex justify-center items-center gap-3">
                    <button className="rounded-md border p-2 bg-[#8F49FE] text-white">create</button>
                    <button className="rounded-md border p-2">Cancel</button>
                </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    </div>;
}