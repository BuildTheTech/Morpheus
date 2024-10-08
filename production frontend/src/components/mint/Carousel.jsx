import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { NextIcon, PrevIcon } from "../../Icons";

export default function Carousel() {
  const swiperRef = useRef(null); // Ref for the Swiper instance
  const [isBeginning, setIsBeginning] = useState(true); // State for managing the "prev" button
  const [isEnd, setIsEnd] = useState(false); // State for managing the "next" button

  const handleNext = () => {
    if (swiperRef.current && !isEnd) {
      swiperRef.current.slideNext();
    }
  };

  const handlePrev = () => {
    if (swiperRef.current && !isBeginning) {
      swiperRef.current.slidePrev();
    }
  };

  const onSwiperInit = (swiper) => {
    swiperRef.current = swiper;
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  const onSlideChange = (swiper) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  return (
    <div className="relative  flex justify-center items-center max-w-[412px] mx-auto px-[37px] ">
      {/* Custom Prev Button */}
      <button
        onClick={handlePrev}
        className={`absolute left-0 top-1/2 transform -translate-y-1/2 sm:px-3 px-1 sm:py-2 py-1  bg-[#057108] rounded-[6px] z-10  ${
          isBeginning ? " cursor-not-allowed" : ""
        }`}
        disabled={isBeginning}
      >
        <PrevIcon />
      </button>

      {/* Swiper Component */}

      <div className="w-full  mt-1 mx-auto sm:mt-4  overflow-hidden">
        <Swiper
          onInit={onSwiperInit}
          onSlideChange={onSlideChange}
          slidesPerView={1}
          spaceBetween={10}
          loop={false}
        >
          {Array.from({ length: 50 }, (v, i) => i + 1).map((it, i) => (
            <SwiperSlide key={i}>
              <div className="text-[32px] sm:text-[48px] text-white text-center flex justify-center items-center font-normal">
                CYCLE {it}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Custom Next Button */}
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
