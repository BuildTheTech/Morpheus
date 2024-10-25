import { Link } from "react-router-dom";
import { PauseIcon, TelegramIcon, TwitterIcon, YoutubeIcon } from "../../Icons";
import { useRef, useState } from "react";
import { IoPauseOutline } from "react-icons/io5";

export default function Footer() {
  const [isPlayMusic, setIsPlayMusic] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  const handlePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlayMusic) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlayMusic(!isPlayMusic);
  };

  return (
    <footer className="pb-[28px] ">
      <div className="container">
        <div className="flex items-center justify-between flex-col xl:flex-row gap-4 gap-y-6 ">
          <div className="flex flex-col sm:flex-row items-center gap-x-[37px] gap-y-4">
            <Link to="/" className="flex items-center sm:gap-[14px] gap-2">
              <img
                src="assets/images/logo.svg"
                className="w-[42px] lg:w-[57px]"
                alt=""
              />
              <span className="text-[#06AE0B] sen-font text-[24px] lg:text-[36px] font-semibold">
                MØRPHEUS
              </span>
            </Link>

            <div className="flex items-center gap-[22px]">
              <Link to="/">
                <TelegramIcon />
              </Link>
              <Link to="/">
                <TwitterIcon />
              </Link>
              <Link to="/">
                <YoutubeIcon />
              </Link>
            </div>
          </div>
          <nav className="flex items-center gap-x-[60px] gap-y-3 flex-col sm:flex-row">
            {navItems.map((it, i) =>
              it.target === "_blank" ? (
                <a
                  href={it.link}
                  key={i}
                  target={it.target}
                  rel="noopener noreferrer"
                  className="text-white font-normal text-[16px] sm:text-[20px] transition-all duration-150 ease-linear hover:text-primary">
                  {it.title}
                </a>
              ) : (
                <Link
                  to={it.link}
                  key={i}
                  className="text-white font-normal text-[16px] sm:text-[20px] transition-all duration-150 ease-linear hover:text-primary">
                  {it.title}
                </Link>
              )
            )}
          </nav>
        </div>

        <div
          className="w-full h-[1px] my-[18px]"
          style={{
            background:
              "linear-gradient(90deg, rgba(6, 174, 11, 0.00) 0%, #06AE0B 47.5%, rgba(6, 174, 11, 0.00) 100%)",
          }}
        />

        <div className="flex flex-col md:flex-row gap-4 md:justify-between items-center">
          <audio
            preload="auto"
            ref={audioRef}
            src="assets/music/matrix-soundtrack.mp3"
          />
          <button
            className="flex gap-2 text-white text-[16px] px-[20px] py-[8px] rounded-[20px] border-primary/50 border items-center"
            onClick={handlePlayPause}>
            <div className="w-[24px]">
              {!isPlayMusic ? (
                <PauseIcon />
              ) : (
                <IoPauseOutline color="#06AE0B" size={20} />
              )}
            </div>

            <span>{isPlayMusic ? "pause" : "play"} music</span>
          </button>

          <p className="text-white text-[14px] sm:text-[16px] text-center">
            ©2024 <span className="text-primary">MØRPHEUS</span> All Rights
            Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}

const navItems = [
  {
    title: "Home",
    link: "/home",
  },
  {
    title: "Mint & Burn",
    link: "",
  },
  {
    title: "Contracts",
    link: "https://docs.morpheus.win",
    target: "_blank",
  },
  {
    title: "Audit",
    link: "/assets/redpaper/MorpheusRedpaper.pdf",
    target: "_blank",
  },
];
