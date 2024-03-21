"use client"
import Link from "next/link";
import { FaPen } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import { EditStudent } from "@/components/edit/editStudent";

export default function Account(){
   const {sub} = jwtDecode(localStorage.getItem("token") as string);
    return <main className="p-6 w-full">
        <p className="text-[40px] font-bold">Settings</p>
        <div className="flex flex-col items-start justify-center gap-4 mt-4 w-full">
            <p className="text-[20px] font-semibold">Profile Settings</p>
            <p className="text-[14px] text-[#ADADB8]">Change identifying details for your account</p>
            <div className="border-[0.5px] rounded-md border-[#ADADB8] w-full bg-[#18181B]">
                {/* username edit */}
                <div className="flex justify-between items-center p-4 border-b border-white pb-6">
                    <p>username</p>
                    <div className="flex w-[70%]">
                        <input type="password" disabled placeholder={sub} className="border-[0.5px] rounded-r-none px-4 py-1 rounded border-white w-full border-r-0 bg-[#28282C]" data-testid="username_input"/>
                        <EditStudent option={1} value={sub as string}/>
                    </div>
                </div>
                {/* password edit */}
                <div className="flex justify-between items-center p-4 pb-6 border-b border-white">
                    <p>password</p>
                    <div className="flex w-[70%]">
                        <input disabled placeholder="password" className="border-[0.5px] rounded-r-none px-4 py-1 rounded border-white w-full border-r-0 bg-[#28282C]" data-testid="password_input" />
                        <EditStudent option={2}/>
                    </div>
                </div>
                {/* back button */}
                <div className="flex justify-end items-center p-4 pb-6">
                    <Link href="/" className="rounded-md p-2 font-semibold bg-[#9645FE]">Back to home</Link>
                </div>
                
            </div>
        </div>
    </main>;
}