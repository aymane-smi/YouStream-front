"use client";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {faUser} from "@fortawesome/free-regular-svg-icons/faUser";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Switch } from "../ui/switch";
import { log } from "console";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export function PopOver() {
    const [value, setValue] = useState<boolean>(false);
    const {setTheme, theme} = useTheme();
    useEffect(()=>{
        if(value)
            setTheme("light");
        else
            setTheme("dark");
    }, [value]);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button>
        <FontAwesomeIcon icon={faUser}
            style={{
                width: "20px",
                height: "20px"
            }}
            color="white"
        />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-fit flex gap-2 justify-center items-center">
        <label htmlFor="theme mode" className={theme === "dark" ? "text-white" : "text-black"}>switch theme mode</label>
        <Switch style={{
            width: "40px",
            height: "20px"
        }} id="theme mode" onCheckedChange={setValue} checked={value}/>
      </PopoverContent>
    </Popover>
  )
}
