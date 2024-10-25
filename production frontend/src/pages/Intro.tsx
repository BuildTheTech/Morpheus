import { useRef, useState } from "react";
import { IoIosVolumeHigh } from "react-icons/io";
import { IoIosVolumeOff } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export default function Intro() {
  const [isMuted, setIsMuted] = useState(true);
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMuteUnmute = () => {
    if (!videoRef.current) return;

    if (isMuted) {
      videoRef.current.muted = false;
    } else {
      videoRef.current.muted = true;
    }
    setIsMuted(!isMuted);
  };

  return (
    <>
      <div>
        <div className="relative w-full h-fit">
          <div className="absolute w-full h-full left-0">
            <div className="flex justify-center items-center">
              <div className="video-container w-[50%] h-[50%] mx-auto mt-8">
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  src="assets/video/morpheusintro.mp4"
                  autoPlay
                  muted={isMuted}
                  loop
                  playsInline></video>
              </div>
            </div>
          </div>

          <img
            src="assets/images/intro-bg.png"
            className="w-full relative"
            alt=""
          />

          <div className="max-w-[1000px] mx-auto">
            <div className="absolute 2xl:bottom-[30.5%] xl:bottom-[30%] lg:bottom-[29%] sm:bottom-[28%] bottom-[22%] 2xl:left-[33%] xl:left-[36%] lg:left-[40%] lg:gap-[20px] flex items-center gap-3 left-1/2 transform -translate-x-1/2 lg:rotate-[2.11deg]">
              <button
                onClick={() => navigate("/home")}
                className="text-[#D6F04E] text-[8px] sm:text-[12px] lg:text-[16px] font-normal lg:px-[20px] lg:py-[8px] px-3 py-2 border border-[rgba(6,174,11,0.10)] rounded-[20px] whitespace-nowrap hover:border-[#06AE0B]">
                Enter the Matrix
              </button>
              <button
                className="text-[#D6F04E] text-[8px] sm:text-[12px] lg:text-[16px] font-normal lg:px-[20px] lg:py-[8px] px-3 py-2 border border-[rgba(6,174,11,0.10)] rounded-[20px] flex items-center gap-1 hover:border-[#06AE0B]"
                onClick={handleMuteUnmute}>
                <div className="w-[24px]">
                  {isMuted ? (
                    <IoIosVolumeOff color="#00FF00" size={16} />
                  ) : (
                    <IoIosVolumeHigh color="#00FF00" size={16} />
                  )}
                </div>
                {isMuted ? "unmute" : "mute"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
