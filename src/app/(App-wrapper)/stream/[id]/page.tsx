"use client"
import ReactPlayer from "react-player";
import Avatar from "react-nice-avatar";
import { IoPersonOutline } from "react-icons/io5";
import { MdOutlineReportGmailerrorred } from "react-icons/md";
import { Fragment, useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { useParams } from "next/navigation";
import { useMutation, useQuery } from "react-query";
import apis from "@/utils/API";
import { Skeleton } from "@/components/ui/skeleton";
import { v4 as uuidv4 } from "uuid";

export default function StreamId(){
    const {id} = useParams<{id: string}>();
    const [disabled, setDisabled] = useState<boolean>(false);
    const [followed, setFollowed] = useState<boolean>(false);
    const {data, isLoading, } = useQuery("getStreamById", {
        queryFn: ()=>apis.stream.getStreamById(Number.parseInt(id))
    });
    const loggedId = localStorage.getItem("id");
    useEffect(()=>{
        if(loggedId == data?.data.owner?.id)
            setDisabled(true);
        if(isSubscribed(Number.parseInt(localStorage.getItem("id") as string)))
            setFollowed(true);
        else
            setFollowed(false);
    }, [data]);
    const followMutation = useMutation("follow", apis.student.subscribe, {
        onSuccess: (data)=>{
            setDisabled(true);
            if(followed)
                setFollowed(false);
            else
                setFollowed(true);
        }
    });
    const isSubscribed = (id:number)=>{
        return data?.data?.subscribers?.findIndex((item)=>item.id === id) === -1 ? false : true;
    }
    return <main className="w-full">
        <ReactPlayer url={`http://localhost:8081/hls/${data?.data.file_name}.m3u8`}
                     playing={false}
                     controls
                     width="100%"
                     height={500}
        />
        {/* information about the streamer */}
        <div className="flex justify-between items-center p-5">
            <div className="flex justify-center items-center gap-3">
               <Avatar className="w-[80px] h-[80px] rounded-[50%]"/>
                <div className="flex flex-col justify-center items-start gap-2">
                    {isLoading ? <Skeleton className="w-[100px] h-[30px]"/> : <p className="text-[22px] font-bold">{data?.data.owner.username}</p> }
                    {isLoading ? <Skeleton className="w-[40px] h-[20px] rounded-md"/> : <div className="flex gap-3 justify-start items-center">
                        {
                            data?.data.tags.map((tag)=><Badge key={uuidv4()}>{tag.tag_name}</Badge>)
                        }
                        </div>}
                </div>
            </div>
            <div className="flex flex-col justify-center items-center">
                <div className="flex justify-center items-center gap-2">{
                    !followed ? <button className={`rounded-md p-2 font-semibold bg-[#9645FE] flex gap-2 justify-center items-center ${disabled && "cursor-not-allowed"}`} onClick={()=>followMutation.mutate({
                            streamerId: data?.data.owner.id
                        })} disabled={disabled}>
                            <IoPersonOutline size={20}/>
                            <span>Follow</span>
                        </button> :
                        <button className={`rounded-md p-2 font-semibold bg-[#9645FE] flex gap-2 justify-center items-center`} onClick={()=>followMutation.mutate({
                            streamerId: data?.data.owner.id
                        })} disabled={disabled}>
                            <IoPersonOutline size={20}/>
                            <span>Unfollow</span>
                        </button>
                    }
                    <button className={`rounded-md p-2 font-semibold bg-[#1F1F23] flex gap-2 justify-center items-center ${disabled && "cursor-not-allowed"}`}>
                        <MdOutlineReportGmailerrorred size={20}/>
                        <span>Report stream</span>
                    </button>
                </div>
            </div>
        </div>
    </main>;
}