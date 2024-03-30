import Avatar, { genConfig } from 'react-nice-avatar'
const config = genConfig();
import "./sidebar.css";
import { useQuery } from 'react-query';
import apis from '@/utils/API';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';

export const Sidebar = ()=>{
    const {isLoading, isError, data} = useQuery("getStudents", apis.student.getStudent);
    return <div className="max-w-[200px] h-[calc(100vh-70px)] bg-[#1F1F23] flex flex-col justify-start items-center overflow-y-scroll hide-scroll">
        <p className="font-bold text-[11px] p-3">RECOMMENDED STREAMERS</p>
        {/* loading skeleton */}
        {isLoading && [...Array(7)].map((i)=>{
            return <div className='flex justify-center items-center gap-3' key={i}>
                    <Skeleton className="w-[40px] h-[40px] my-3 rounded-[50%]"/>
                    <Skeleton className='w-[60px] h-[10px]'/>
                </div>
        })}
        {/* avatars of all users */}
        <div className="flex flex-col justify-start items-start">
            {data && data.data.map((student, index)=>{
                const fullName = student.firstName + " " +student.lastName; 
                return <Link href={`/streamer/${student.id}`} className='flex justify-center items-center gap-3' title={student.username} key={`streamer_${index}`}>
                    <Avatar className="w-[30px] h-[30px] my-3" {...config}/>
                    <p>{fullName.length > 10 ? fullName.slice(10)+"..." : fullName}</p>
                </Link>
            })}
        </div>
    </div>;
}