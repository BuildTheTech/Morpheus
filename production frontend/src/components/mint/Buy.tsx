import { useAccount, useConfig } from "wagmi";
import { useAppContext } from "../../utilities/contexts/AppContext";
import Countdown from "./Countdown";
import BuyAndBurnABI from "../../abi/MorpheusBuyAndBurnABI.json";
import { buyAndBurnAddress } from "../../utilities/constants";
import { formatUnits } from "viem";
import { formatNumber } from "../../utilities/helper";
import { useEffect, useState } from "react";
import {
  simulateContract,
  waitForTransactionReceipt,
  writeContract,
} from "wagmi/actions";
import { myToast } from "../Toast";

export default function Buy() {
  const {
    titanXPrice,
    refetchContractInfo,
    titanXBalanceOfBuyAndBurn,
    dailyAllocation,
    lastBurnedIntervalStartTimestamp,
  } = useAppContext();
  const { isConnected, address } = useAccount();
  const config = useConfig();
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const accPeriods = Math.floor(
    (Math.floor(currentTime / 1000) -
      Number(lastBurnedIntervalStartTimestamp)) /
      1800
  );
  const nextBuyAndBurn =
    (Number(formatUnits(titanXBalanceOfBuyAndBurn * dailyAllocation, 18)) /
      10000 /
      48) *
    Math.max(accPeriods, 1);
  const userReward = (nextBuyAndBurn * 15) / 1000;
  const nextPeriodStartsIn = Number(lastBurnedIntervalStartTimestamp) + 30 * 60;

  const handleBuyAndBurn = async () => {
    setIsLoading(true);
    try {
      const result = await simulateContract(config, {
        abi: BuyAndBurnABI,
        address: buyAndBurnAddress,
        functionName: "swapTitanXForDragonXAndMorpheusAndBurn",
        account: address,
      });

      const writeResult = await writeContract(config, result.request);
      await waitForTransactionReceipt(config, {
        hash: writeResult,
      });

      refetchContractInfo();

      myToast({
        title: "Successful",
        content: "BuyAndBurn was Successful!",
        toastType: "success",
      });
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };

  return (
    <div
      className="box w-full  pt-[30px] sm:pt-[42px] sm:pb-[45px] pb-[20px] px-[10px] sm:px-[43px] relative overflow-hidden bg-cover bg-no-repeat "
      style={{ backgroundImage: "url('/assets/images/buy-bg.png')" }}
    >
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
                $
                {Number(formatUnits(titanXBalanceOfBuyAndBurn, 18)) *
                  titanXPrice}
              </p>
            </div>

            <p className="mt-[7px] dark-box p-[13px] text-primary text-[14px] text-center sm:text-[20px] font-normal whitespace-nowrap sm:leading-[24px]">
              {formatNumber(Number(formatUnits(titanXBalanceOfBuyAndBurn, 18)))}{" "}
              TITANX
            </p>
          </div>
          {/* Next Buy & Burn */}
          <div>
            <div className="flex justify-between items-center">
              <p className="text-white text-[12px] font-normal sm:text-[16px] sm:leading-[19px]">
                Next Buy & Burn
              </p>
              <p className="text-white text-[12px] font-normal sm:text-[16px] urbanist-font sm:leading-[19px]">
                ${formatNumber(nextBuyAndBurn * titanXPrice)}
              </p>
            </div>

            <p className="mt-[7px] dark-box p-[13px] text-primary text-[14px] text-center sm:text-[20px] font-normal whitespace-nowrap sm:leading-[24px]">
              ~{formatNumber(nextBuyAndBurn)} TITANX
            </p>
          </div>
          {/* User Reward */}
          <div>
            <div className="flex justify-between items-center">
              <p className="text-white text-[12px] font-normal sm:text-[16px] sm:leading-[19px]">
                User Reward
              </p>
              <p className="text-white text-[12px] font-normal sm:text-[16px] urbanist-font sm:leading-[19px]">
                ${formatNumber(userReward * titanXPrice)}
              </p>
            </div>

            <p className="mt-[7px] dark-box p-[13px] text-primary text-[14px] text-center sm:text-[20px] font-normal whitespace-nowrap sm:leading-[24px] ">
              ~{formatNumber(userReward)} TITANX
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
              {new Date(
                Number(lastBurnedIntervalStartTimestamp) * 1000
              ).toLocaleString("en-US", {
                weekday: "short",
                month: "short",
                day: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false,
              })}
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
              {new Date(nextPeriodStartsIn * 1000).toLocaleString("en-US", {
                weekday: "short",
                month: "short",
                day: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false,
              })}
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center mt-[27px]">
          <p className="text-white text-[12px] font-normal sm:text-[16px] sm:leading-[19px]">
            Accumulated Periods
          </p>
          <p className="text-primary text-[16px] font-normal sm:text-[20px] sm:leading-[24px]">
            {accPeriods}
          </p>
        </div>

        {currentTime < nextPeriodStartsIn * 1000 ? (
          <button
            className="text-primary text-[16px] sm:text-[20px] w-full mt-[44px] mb-[24px] rounded-[16px]  p-[12px] border border-[#2D2F2D] xl:whitespace-nowrap urbanist-font leading-none"
            style={{
              background: "linear-gradient(180deg, #2F2F2F 0%, #1B1B1B 100%)",
              boxShadow: "0px 4.8px 4.8px 0px rgba(0, 0, 0, 0.25) inset",
            }}
          >
            Trigger Buy & Burn in:
            <span className="text-white/60">
              <Countdown targetDate={new Date(nextPeriodStartsIn * 1000)} />
            </span>
          </button>
        ) : (
          <button
            className="text-white text-[16px] sm:text-[20px] w-full gd-btn mt-[22px] rounded-[16px] urbanist-font p-[12px] leading-none uppercase"
            disabled={!isConnected || isLoading}
            onClick={handleBuyAndBurn}
          >
            {!isConnected
              ? "Please connect wallet..."
              : isLoading
              ? "Processing..."
              : "Buy & Burn"}
          </button>
        )}

        <p className="text-white/60 text-[12px] sm:text-[14px] urbanist-font">
          Accumulated Mechanism activates every 30 minutes. If not triggered,
          the amount is added to the next 30-minute period.
        </p>
      </div>
    </div>
  );
}
