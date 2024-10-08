import Carousel from "./Carousel";
import Countdown from "./Countdown";

export default function Claimable() {
  return (
    <div
      className="box w-full pt-[30px] sm:pb-[45px] pb-[20px] px-[10px] sm:px-[45px] relative overflow-hidden bg-cover bg-no-repeat"
      style={{ backgroundImage: "url('/assets/images/claimable-bg.png')" }}
    >
      <div className="relative">
        <h4 className="head-h4 text-center">MORPHEUS CLAIMABLE</h4>

        <div className="lg:pt-[88px] pt-[50px] lg:pb-[60px] pb-[30px]">
          <Carousel />
        </div>

        <p className="text-center text-primary/60 text-[12px] sm:text-[14px]">
          MORPHEUS
        </p>

        <div className="p-[1px] bg-gradient-to-b from-primary/60 to-primary/5 rounded-[16px] mt-2">
          <div
            className="rounded-[16px]  bg-[#030D03] pt-[20px] pb-[15px] px-[13px]"
            style={{
              boxShadow: "0px 4.8px 4.8px 0px rgba(0, 0, 0, 0.25) inset",
            }}
          >
            <h5 className="text-white text-[18px] sm:text-[24px] text-center leading-none">
              127,394,882.22
            </h5>

            <p className="border-[#12960A]/30 border-t text-primary/60 text-[14px] sm:text-[16px] font-medium urbanist-font pt-1.5 text-center mt-[11px] leading-none">
              $122,948.81
            </p>
          </div>
        </div>

        <button
          className="text-primary text-[16px] sm:text-[20px] w-full mt-[22px] rounded-[16px]  p-[12px] border border-[#2D2F2D] leading-[24px]"
          style={{
            background: "linear-gradient(180deg, #2F2F2F 0%, #1B1B1B 100%)",
            boxShadow: "0px 4.8px 4.8px 0px rgba(0, 0, 0, 0.25) inset",
          }}
        >
          Claimable After:{" "}
          <span className="text-white/60">
            <Countdown targetDate="2024-10-10T12:00:00" />
          </span>
        </button>
      </div>
    </div>
  );
}
