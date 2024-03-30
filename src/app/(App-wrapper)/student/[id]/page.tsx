"use client"
import Link from "next/link";
import Avatar from "react-nice-avatar";
import { config } from '@fortawesome/fontawesome-svg-core';
import ReactPlayer from "react-player";
import { FaPlayCircle } from "react-icons/fa";
import { useQuery } from "react-query";
import apis from "@/utils/API";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import {v4 as uuidv4} from "uuid";
import { Badge } from "@/components/ui/badge";
config.autoAddCss = false;

export default function StudentStream(){
    const {id} = useParams<{id: string}>();
    const {data, isLoading, error} = useQuery("studentStreams", {
        queryFn: ()=> apis.stream.getStudentStream(Number.parseInt(id))
    });
    console.log(data?.data);
    return <div className="flex justify-start items-center flex-col w-full py-6 gap-4">
        <p className="text-[22px] font-bold">{data?.data[0].owner.username} All streams</p>
        {!isLoading ?
                    <div className="flex justify-center items-center gap-3 flex-wrap">
                        {data?.data?.map((item)=>(<div className="flex flex-col justify-center items-center w-fit" key={uuidv4()}>
                        <ReactPlayer url="http://sample.vodobox.net/skate_phantom_flex_4k/skate_phantom_flex_4k.m3u8"
                                        light
                                        playing={false}
                                        controls
                                        playIcon={<FaPlayCircle size={50} color='white'/>}
                                        width={300}
                                        height={150}
                            />
                        <div className='flex justify-start gap-3 items-center w-full'>
                            <Link href={`/student/${item.owner.id}`}>
                                <Avatar className="w-[40px] h-[40px] rounded-[50%]" {...config}/>
                            </Link>
                            <div className='w-full flex flex-col gap-5'>
                                <Link href={`/stream/${item.id}`} className='w-full h-[10px]'>Streamed by:{item.owner.username}</Link>
                                <div className='w-full flex justify-start items-center gap-3'>
                                    {item.tags.map((tag)=><Badge key={uuidv4()}>{tag.tag_name}</Badge>)}
                                </div>
                            </div>
                        </div>
                    </div>)
                    )}
                    </div>
                   :
                   <div className="w-full flex justify-center items-center gap-4 flex-warp">
                    {[1,2,3,4].map((i)=><div className='flex flex-col justify-start items-center gap-3' key={uuidv4()}>
                        <Skeleton className='w-[300px] h-[150px]'/>
                        <div className='flex justify-start gap-3 items-center w-full'>
                            <Skeleton className='rounded-[50%] w-[40px] h-[40px]'/>
                            <div className='w-full'>
                            <Skeleton className='w-full h-[10px]'/>
                            <Skeleton className='w-full h-[10px]'/>
                            </div>
                        </div>
                        </div>)}
                   </div>
        }
        
    </div>
}