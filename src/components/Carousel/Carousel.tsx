"use client"
import React from 'react';
import { StackedCarousel, ResponsiveContainer, StackedCarouselSlideProps, ResponsiveContainerProps } from 'react-stacked-center-carousel';
import "./Carousel.css";
const data = new Array(10).fill({ coverImage: "xxx", video: "xxx" })

export function ResponsiveCarousel() {
    const ref = React.useRef<StackedCarousel>();
    return (
      <div style={{ width: '100%', position: 'relative' }}>
          <ResponsiveContainer
              carouselRef={ref}
              render={(width, carouselRef) => {
                return (
                  <StackedCarousel
                      ref={carouselRef}
                      slideComponent={Slide}
                      slideWidth={750}
                      carouselWidth={width}
                      data={data}
                      maxVisibleSlide={5}
                      disableSwipe
                      customScales={[1, 0.85, 0.7, 0.55]}
                      transitionTime={450}
                  />
                );
              }}
          />
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

    const { coverImage, video } = data[dataIndex];

    return (
      <div className='twitch-card' draggable={false}>
        <div className={`cover fill ${isCenterSlide && loaded ? 'off' : 'on'}`}>
          <div
            className='card-overlay fill'
            onClick={() => {
              if (!isCenterSlide) swipeTo(slideIndex);
            }}
          />
          <img className='cover-image fill' src={coverImage} />
        </div>
        {loaded && (
          <div className='detail fill'>
            <img className='video' src={video} />
            <div>x</div>
          </div>
        )}
      </div>
    );
});