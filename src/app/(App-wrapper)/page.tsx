"use client"
import { ResponsiveCarousel } from '@/components/Carousel/Carousel'
import { Skeleton } from '@/components/ui/skeleton'
import apis from '@/utils/API'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { useCallback, useMemo, useRef } from 'react'
import { FaPlayCircle } from 'react-icons/fa'
import ReactPlayer from 'react-player'
import { useInfiniteQuery } from 'react-query'
import {v4 as uuidv4} from "uuid";
import Avatar from "react-nice-avatar";
import { StreamTopDTO } from '@/utils/models/StreamTopDTO'
import Link from 'next/link'
config.autoAddCss = false

export default function Home() {
  const observer = useRef<IntersectionObserver>();
  const {data, error, isFetching, isLoading, fetchNextPage, hasNextPage} = useInfiniteQuery({
    queryKey: "infiniteStream",
    queryFn: ({pageParam}) => {
      console.log("page Param",pageParam);
      return apis.stream.infinite(pageParam)
    },
    getNextPageParam: (lastPage, allPages) => {
      console.log("last page:",lastPage);
      console.log("all page:",allPages);
      return lastPage.data.length ? allPages.length + 1 : undefined;
    },
  });
  const streams = useMemo(()=>{
    return data?.pages.reduce((acc, page)=> [...acc,...page.data], []);
  }, [data]);
  const lastElementRef = useCallback((div:HTMLDivElement)=>{
      if (isLoading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetching) {
          fetchNextPage();
        }
      });

      if (div) observer.current.observe(div);
  }, [fetchNextPage, hasNextPage, isFetching, isLoading]);
  console.log(data);
  return (
    <main className="w-full max-w-calc[100vw-200px] overflow-y-scroll ml-[200px] max-h-[100vh-70px] hide-scroll">
      <ResponsiveCarousel />
      <div className='w-full p-4 flex flex-col gap-3'>
        <p className='text-[22px] flex gap-2'>
          <span className='text-[#8E4AFE]'>Some streams</span>
          <span>we think you’ll like</span>
        </p>
        <div className='flex justify-start items-center gap-3 flex-wrap'>
          {data && streams?.map((stream)=><div className='flex flex-col justify-start items-center gap-3' key={uuidv4()} ref={lastElementRef}>
            <ReactPlayer url="http://sample.vodobox.net/skate_phantom_flex_4k/skate_phantom_flex_4k.m3u8"
                         light
                         playing={false}
                         controls
                         playIcon={<FaPlayCircle size={50} color='white'/>}
                         width={300}
                         height={150}
              />
            <div className='flex justify-start gap-3 items-center w-full'>
              <Link href={`/student/${localStorage.getItem("id")}`}>
                <Avatar className="w-[40px] h-[40px] rounded-[50%]" {...config}/>
              </Link>
              <div className='w-full flex flex-col gap-3'>
                <p className='w-full h-[10px]'>Streamed by:{stream.username}</p>
                <div className='w-full'>list of tags</div>
              </div>
            </div>
          </div>)}
        </div>
        <div className='flex justify-start items-center gap-3 flex-wrap'>
          {(isLoading || isFetching) && [1,2,3,4].map((i)=><div className='flex flex-col justify-start items-center gap-3' key={uuidv4()}>
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
      </div>
    </main>
  )
}
