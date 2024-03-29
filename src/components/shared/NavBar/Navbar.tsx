import Image from "next/image"
import { LoginButton } from "../../auth/login-button"
import { PopOver } from "../../costum/popover"
import apis from "@/utils/API"
import Link from "next/link"

export const Navbar = ()=>{
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
                  {!apis.auth.isAuthenticated() && <LoginButton />}
                  <PopOver />
                </div>
              </header>
}