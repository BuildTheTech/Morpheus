import { useEffect, useState } from "react";
import { useAppContext } from "../../utilities/contexts/AppContext";
import { formatNumber } from "../../utilities/helper";
import { formatUnits } from "viem";

export default function Summary() {
  const [progress, setProgress] = useState(0);
  const {
    startsAt,
    endsAt,
    currentRatio,
    titanXPrice,
    morpheusMinted,
    morpheusBurnt,
    dragonXBurnt,
    titanXDeposited,
  } = useAppContext();

  useEffect(() => {
    const timerId = window.setInterval(() => {
      const now = Date.now();
      if (now / 1000 >= endsAt) {
        setProgress(100);
        window.clearInterval(timerId);
        return;
      }

      const totalTime = endsAt - startsAt;
      const elapsedTime = Math.floor(now / 1000) - startsAt;

      const progressPercentage = Math.floor((elapsedTime / totalTime) * 100);

      setProgress(progressPercentage);
    }, 1000);

    return () => {
      window.clearInterval(timerId);
    };
  }, [startsAt, endsAt]);

  return (
    <div
      className="box w-full pt-[30px] sm:pb-[45px] pb-[20px]  relative overflow-hidden bg-cover bg-no-repeat leading-none"
      style={{ backgroundImage: "url('/assets/images/summary-bg.png')" }}>
      <div className="relative">
        <div className="flex justify-between flex-wrap gap-2 gap-y-4 items-center px-[10px] sm:px-[45px]">
          <div>
            <h1 className="text-white text-[20px] sm:text-[28px] font-normal sm:leading-[34px]">
              SUMMARY
            </h1>
            <h1 className="text-white text-[14px] sm:text-[12px] font-normal mt-0.5 leading-none sm:leading-[17px]">
              Minting Cycle
            </h1>
          </div>

          <div>
            <p className="text-white text-[12px] sm:text-[14px] font-normal leading-none">
              1 <span className="text-primary">TitanX</span> = {currentRatio}{" "}
              <span className="text-primary">MØRPHEUS</span>
            </p>
            <p className="text-white text-[12px] sm:text-[14px] font-normal leading-none mt-[9px]">
              1 <span className="text-primary">MØRPHEUS</span> = ${titanXPrice}
            </p>
          </div>
        </div>
        <div className="w-full h-[1px] bg-[#12960A]/50 mt-[28px] mb-[38px]" />
        <div className="px-[10px] sm:px-[45px]">
          <p className="text-center text-white text-[14px] sm:text-[16px] font-normal leading-none mb-[7px] sm:leading-[19px]">
            Mint Cycle Progress
          </p>

          <div className="flex justify-between gap-2 sm:gap-4 items-center">
            <span className="text-white text-[14px] sm:text-[16px] font-normal">
              0%
            </span>
            <div className="flex-1 w-full h-[10px] bg-[#08210A] rounded-[5px] overflow-hidden">
              <div
                className="h-full bg-primary rounded-[5px]"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-white text-[14px] sm:text-[16px] font-normal">
              100%
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-[15px] gap-y-[26px] mt-[24px]">
            {/* Minted */}
            <div className="col-span-1 sm:col-span-2">
              <p className="text-center text-white text-[14px] sm:text-[16px] font-normal leading-none mb-[7px]">
                Total <span className="text-primary">MØRPHEUS</span> Minted
              </p>

              <p className="mt-[7px] dark-box p-[13px] text-primary text-[14px] text-center sm:text-[20px] font-normal">
                {formatNumber(Number(formatUnits(morpheusMinted, 18)))} MØRPHEUS
              </p>
            </div>
            {/* Burnt */}
            <div className="col-span-1 sm:col-span-2">
              <p className="text-center text-white text-[14px] sm:text-[16px] font-normal leading-none mb-[7px] sm:leading-[19px]">
                Total <span className="text-primary">MØRPHEUS</span> Burnt{" "}
                <span className="text-primary">45%</span>
              </p>

              <p className="mt-[7px] dark-box p-[13px] text-primary text-[14px] text-center sm:text-[20px] font-normal">
                {formatNumber(Number(formatUnits(morpheusBurnt, 18)))} MØRPHEUS
              </p>
            </div>
            {/* Deposited*/}
            <div className="col-span-1 sm:col-span-2">
              <p className="text-center text-white text-[14px] sm:text-[16px] font-normal leading-none mb-[7px] sm:leading-[19px]">
                Total <span className="text-primary">TITANX</span> Deposited
              </p>

              <p className="mt-[7px] dark-box p-[13px] text-primary text-[16px] text-center sm:text-[20px] font-normal">
                {formatNumber(Number(formatUnits(titanXDeposited, 18)))} TITANX
              </p>
            </div>
            {/* TITANX*/}
            <div className="col-span-1 ">
              <p className="text-center text-white text-[14px] sm:text-[16px] font-normal leading-none mb-[7px] sm:leading-[19px]">
                Total <span className="text-primary">TITANX</span> Burned
              </p>

              <p className="mt-[7px] dark-box p-[13px] text-primary text-[14px] text-center sm:text-[20px] font-normal">
                {formatNumber(Number(formatUnits(titanXDeposited, 18)) * 0.2)}{" "}
                TITANX
              </p>
            </div>
            {/* DRAGONX*/}
            <div className="col-span-1">
              <p className="text-center text-white text-[14px] sm:text-[16px] font-normal leading-none mb-[7px] sm:leading-[19px]">
                Total <span className="text-primary">DRAGONX</span> Burned
              </p>

              <p className="mt-[7px] dark-box p-[13px] text-primary text-[14px] text-center sm:text-[20px] font-normal">
                {formatNumber(Number(formatUnits(dragonXBurnt, 18)))} DRAGONX
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
