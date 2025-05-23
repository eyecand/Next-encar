"use client";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import Lightbox from "yet-another-react-lightbox";
import {
  Fullscreen,
  Thumbnails,
  Counter,
  Zoom,
} from "yet-another-react-lightbox/plugins";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/counter.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Image from "next/image";
import NotImage from "../../public/12.png";
import Logo from "../../public/Logo_jpeg.jpg";
type SliderProps = {
  imgSrc: {
    url: string;
  }[];
};
export const SliderCarPage = ({ imgSrc }: SliderProps) => {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const allImg = imgSrc.map((item) => {
    return { src: item.url };
  });

  const handleLightBox = (i: number) => {
    setOpen(true);
    setIndex(i);
  };
  return (
    <div className="custom-swiper md:w-1/2 pr-0 pb-6 md:pr-6 md:pb-0">
      {/* <Image src="/Logo_jpeg.jpg" width={200} height={100} alt="#" /> */}
      {imgSrc.length > 0 ? (
        <>
          {" "}
          <Swiper
            spaceBetween={10}
            loop={true}
            lazyPreloadPrevNext={1}
            pagination={{
              el: ".my-custom-pagination-div",
              clickable: true,
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            onSwiper={(swiper) => {
              for (let i = 0; i < swiper.pagination.bullets.length; i++) {
                swiper.pagination.bullets[
                  i
                ].style.backgroundImage = `url(${imgSrc[i].url})`;
              }
            }}
            className="relative w-full md:w-full max-h-[275px] sm:max-h-[325px]  md:max-h-[350px] lg:max-h-[400px]"
          >
            {imgSrc.map((element: { url: string }, i: number) => {
              return (
                <SwiperSlide
                  className="relative"
                  key={i}
                  onClick={() => handleLightBox(i)}
                >
                  <img loading="lazy" src={element.url} />
                  <div className="absolute w-[38%] h-[20%] bottom-[5%] right-0 rounded-b-lg rounded-s-lg">
                    <Image className="w-[35%]" src={Logo} alt="#" sizes="20" />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
          <>
            <Lightbox
              plugins={[Fullscreen, Counter, Thumbnails, Zoom]}
              open={open}
              controller={{ closeOnBackdropClick: true }}
              slides={allImg}
              close={() => setOpen(false)}
              index={index}
              animation={{ zoom: 500 }}
              zoom={{
                maxZoomPixelRatio: 10,
              }}
              on={{ view: ({ index: currentIndex }) => setIndex(currentIndex) }}
            />
          </>
          <div className="my-custom-pagination-div mt-2 grid grid-cols-6 gap-1"></div>
        </>
      ) : (
        <Image
          className="object-contain w-full"
          alt="not found"
          src={NotImage}
          width={350}
          height={276}
        />
      )}
    </div>
  );
};
