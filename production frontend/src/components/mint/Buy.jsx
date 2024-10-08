import Countdown from "./Countdown";

export default function Buy() {
  return (
    <div
      className="box w-full  pt-[30px] sm:pt-[42px] sm:pb-[45px] pb-[20px] px-[10px] sm:px-[43px] relative overflow-hidden bg-cover bg-no-repeat "
      style={{ backgroundImage: "url('/assets/images/buy-bg.png')" }}
    >
      {" "}
      <div className="relative">
        <h4 className="text-center head-h4 sm:leading-[34px]">BUY & BURN</h4>

        <div className="mt-[41px] flex flex-col gap-[24px]">
          {/* Buy & Burn Balance */}
          <div>
            <div className="flex justify-between items-center">
              <p className="text-white text-[12px] font-normal sm:text-[16px] sm:leading-[19px]">
                Buy & Burn Balance
              </p>
              <p className="text-white text-[12px] font-normal sm:text-[16px] urbanist-font sm:leading-[19px]">
                $378,484.7156
              </p>
            </div>

            <p className="mt-[7px] dark-box p-[13px] text-primary text-[14px] text-center sm:text-[20px] font-normal whitespace-nowrap sm:leading-[24px]">
              5,837,175,532,405
            </p>
          </div>
          {/* Next Buy & Burn */}
          <div>
            <div className="flex justify-between items-center">
              <p className="text-white text-[12px] font-normal sm:text-[16px] sm:leading-[19px]">
                Next Buy & Burn
              </p>
              <p className="text-white text-[12px] font-normal sm:text-[16px] urbanist-font sm:leading-[19px]">
                $1,563.986
              </p>
            </div>

            <p className="mt-[7px] dark-box p-[13px] text-primary text-[14px] text-center sm:text-[20px] font-normal whitespace-nowrap sm:leading-[24px]">
              2,156,330,385 TITANX
            </p>
          </div>
          {/* User Reward */}
          <div>
            <div className="flex justify-between items-center">
              <p className="text-white text-[12px] font-normal sm:text-[16px] sm:leading-[19px]">
                User Reward
              </p>
              <p className="text-white text-[12px] font-normal sm:text-[16px] urbanist-font sm:leading-[19px]">
                $23.566
              </p>
            </div>

            <p className="mt-[7px] dark-box p-[13px] text-primary text-[14px] text-center sm:text-[20px] font-normal whitespace-nowrap sm:leading-[24px] ">
              32,344,955 TITANX
            </p>
          </div>
          {/* Last Burn Time */}
          <div>
            <div className="flex justify-between items-center">
              <p className="text-white text-[12px] font-normal sm:text-[16px] sm:leading-[19px]">
                Last Burn Time
              </p>
            </div>

            <p className="mt-[7px] dark-box p-[13px] text-primary text-[14px] text-center sm:text-[20px] font-normal sm:leading-[24px]">
              TUES SEP 24, 2024 19:30:00
            </p>
          </div>
          {/* Next Period Starts In */}
          <div>
            <div className="flex justify-between items-center">
              <p className="text-white text-[12px] font-normal sm:text-[16px] sm:leading-[19px]">
                Next Period Starts In
              </p>
            </div>

            <p className="mt-[7px] dark-box p-[13px] text-primary text-[14px] text-center sm:text-[20px] font-normal sm:leading-[24px]">
              TUES SEP 24, 2024 20:30:00
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center mt-[27px]">
          <p className="text-white text-[12px] font-normal sm:text-[16px] sm:leading-[19px]">
            Accumulated Periods
          </p>
          <p className="text-primary text-[16px] font-normal sm:text-[20px] sm:leading-[24px]">
            0
          </p>
        </div>

        <button
          className="text-primary text-[16px] sm:text-[20px] w-full mt-[44px] mb-[24px] rounded-[16px]  p-[12px] border border-[#2D2F2D] xl:whitespace-nowrap urbanist-font leading-none"
          style={{
            background: "linear-gradient(180deg, #2F2F2F 0%, #1B1B1B 100%)",
            boxShadow: "0px 4.8px 4.8px 0px rgba(0, 0, 0, 0.25) inset",
          }}
        >
          Trigger Buy & Burn in:
          <span className="text-white/60">
            <Countdown targetDate="2024-10-10T12:00:00" />
          </span>
        </button>

        <p className="text-white/60 text-[12px] sm:text-[14px] urbanist-font">
          Accumulated Mechanism activates every 30 minutes. If not triggered,
          the amount is added to the next 30-minute period.
        </p>
      </div>
    </div>
  );
}
