import { useEffect, useState } from "react";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import "swiper/css";
import { NextIcon, PrevIcon } from "../../Icons";

interface CarouselProps {
  maxCycle: number;
  onChange: (cycle: number) => void;
}

export default function Carousel({ maxCycle, onChange }: CarouselProps) {
  const [isBeginning, setIsBeginning] = useState(true); // State for managing the "prev" button
  const [isEnd, setIsEnd] = useState(false); // State for managing the "next" button

  const [swiperInstance, setSwiperInstance] = useState<SwiperClass>();

  useEffect(() => {
    if (swiperInstance) {
      swiperInstance.slideTo(maxCycle - 1);
    }
  }, [swiperInstance, maxCycle]);

  const handleNext = () => {
    if (swiperInstance) {
      swiperInstance.slideNext();
    }
  };

  const handlePrev = () => {
    if (swiperInstance) {
      swiperInstance.slidePrev();
    }
  };

  return (
    <div className="relative  flex justify-center items-center max-w-[412px] mx-auto px-[37px] ">
      <button
        onClick={handlePrev}
        className={`absolute left-0 top-1/2 transform -translate-y-1/2 sm:px-3 px-1 sm:py-2 py-1  bg-[#057108] rounded-[6px] z-10  ${
          isBeginning ? " cursor-not-allowed" : ""
        }`}
        disabled={isBeginning}
      >
        <PrevIcon />
      </button>
      <div className="w-full  mt-1 mx-auto sm:mt-4  overflow-hidden">
        <Swiper
          onInit={(swiper) => {
            setSwiperInstance(swiper);
          }}
          onSlideChange={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
            onChange(swiper.activeIndex + 1);
          }}
          slidesPerView={1}
          spaceBetween={10}
          loop={false}
        >
          {Array.from({ length: maxCycle }, (_, i) => i + 1).map((it, i) => (
            <SwiperSlide key={i}>
              <div className="text-[32px] sm:text-[48px] text-white text-center flex justify-center items-center font-normal">
                CYCLE {it}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <button
        onClick={handleNext}
        className={`absolute right-0 top-1/2 transform -translate-y-1/2 sm:px-3 px-1 sm:py-2 py-1 text-white bg-[#057108] rounded-[6px] z-10 ${
          isEnd ? " cursor-not-allowed" : ""
        }`}
        disabled={isEnd}
      >
        <NextIcon />
      </button>
    </div>
  );
}
