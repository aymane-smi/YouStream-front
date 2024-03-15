"use client"
import React from 'react';
import { StackedCarousel, ResponsiveContainer, StackedCarouselSlideProps, ResponsiveContainerProps } from 'react-stacked-center-carousel';
import "./Carousel.css";
import { useQuery } from 'react-query';
import apis from '@/utils/API';
import { Skeleton } from '../ui/skeleton';
import ReactPlayer from "react-player";
const loader = new Array(10);

export function ResponsiveCarousel() {
    const ref = React.useRef<StackedCarousel>();
    const {data, isLoading} = useQuery("topStreams", apis.stream.topStream);
    data?.data.forEach((stream, index)=>{
      loader[index] = stream;
    });
    return (
      <div style={{ width: '100%', position: 'relative' }}>
          {isLoading ? <Skeleton className='W-[750px] h-[200px]'/> : <ResponsiveContainer
              carouselRef={ref}
              render={(width, carouselRef) => {
                return (
                  <StackedCarousel
                      ref={carouselRef}
                      slideComponent={Slide}
                      slideWidth={750}
                      carouselWidth={width}
                      data={loader}
                      maxVisibleSlide={5}
                      disableSwipe
                      customScales={[1, 0.85, 0.7, 0.55]}
                      transitionTime={450}
                  />
                );
              }}
          />}
          
      </div>
    );
}

const Slide = React.memo(function (props: StackedCarouselSlideProps) {
    const { data, dataIndex, isCenterSlide, swipeTo, slideIndex } = props;
    const [loadDelay, setLoadDelay] = React.useState<any>();
    const [removeDelay, setRemoveDelay] = React.useState<any>();
    const [loaded, setLoaded] = React.useState(false);
    React.useEffect(() => {
      if (isCenterSlide) {
        clearTimeout(removeDelay);
        setLoadDelay(setTimeout(() => setLoaded(true), 1000));
      } else {
        clearTimeout(loadDelay);
        if (loaded) setRemoveDelay(setTimeout(() => setLoaded(false), 1000));
      }
    }, [isCenterSlide]);

    React.useEffect(() => () => {
      clearTimeout(removeDelay);
      clearTimeout(loadDelay);
    });

    return (
      <div className='twitch-card' draggable={false}>
        <div className={`cover fill ${isCenterSlide && loaded ? 'off' : 'on'}`}>
          <div
            className='card-overlay fill'
            onClick={() => {
              if (!isCenterSlide) swipeTo(slideIndex);
            }}
          />
          <img className='cover-image fill' src="https://img.freepik.com/premium-vector/no-signal-old-tv-screen_268834-925.jpg?w=360" />
        </div>
        {loaded && (
          <div className='detail fill'>
            {data[dataIndex] == undefined ? <p className='text-black'></p> : <ReactPlayer url="https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8" playing={true} config={{
              file:{
                forceHLS: true,
                forceSafariHLS: true
              }
            }}/>}
          </div>
        )}
      </div>
    );
});