"use client"
import Image from "next/image"
import { LoginButton } from "../../auth/login-button"
import { PopOver } from "../../costum/popover"
import Link from "next/link"
import {useAuthStore} from "@/utils/store/user";

export const Navbar = ()=>{
    const logged = useAuthStore((state)=>state.loggedStatus);
    console.log("=>",logged);
    return <header className="max-w-screen h-[70px] bg-[#18181B] flex justify-between items-center px-2 shadow-lg z-[999]">
                <Link  href="/" className="flex justify-center items-center gap-4">
                  <Image 
                    src="/icon.png"
                    width={40}
                    height={40} 
                    alt={'youstream icon'}
                  />
                  <Image 
                    src="/youstream.png"
                    width={180}
                    height={160} 
                    alt={'youstream image'}
                  />
                </Link>
                <div className="flex gap-2 justify-center items-center">
                  {!logged && <LoginButton />}
                  <PopOver />
                </div>
              </header>
}