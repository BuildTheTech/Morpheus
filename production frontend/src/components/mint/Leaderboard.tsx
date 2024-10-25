import { formatUnits } from "viem";
import { useAppContext } from "../../utilities/contexts/AppContext";
import {
  formatNumber,
  rankStrFromNumber,
  shortenAddress,
} from "../../utilities/helper";
import { useRef, useState } from "react";

export default function Leaderboard() {
  const [tableSize, setTableSize] = useState(10);
  const { topHolders, fetchTopHolders } = useAppContext();
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      className="box w-full pt-[30px] sm:pt-[42px] sm:pb-[36px] pb-[20px] px-[10px] sm:px-[45px] relative overflow-hidden bg-no-repeat bg-cover "
      style={{ backgroundImage: "url('/assets/images/leaderboard-bg.png')" }}
    >
      <div>
        <h4 className="head-h4 text-center sm:leading-[34px]">LEADERBOARD</h4>

        <div className="mt-[32px]">
          <div className="flex flex-col w-full gap-[14px]">
            <div className="flex justify-between w-full xl:px-[20px] px-[10px]">
              <span className="text-white text-[10px] sm:text-[16px] font-normal sm:leading-[19px]">
                RANK
              </span>
              <span className="text-white text-[10px] sm:text-[16px] font-normal sm:leading-[19px]">
                USER
              </span>
              <span className="text-white text-[10px] sm:text-[16px] font-normal text-end sm:pr-[20px] whitespace-nowrap sm:leading-[19px]">
                TOKENS MINTED
              </span>
            </div>

            <div
              className="overflow-y-auto max-h-[700px] flex flex-col gap-[13px] no-scrollbar scroll-smooth"
              ref={ref}
            >
              {topHolders
                .filter((_, i) => i < tableSize)
                .map((h, i) => (
                  <div
                    key={i}
                    className="border rounded-lg border-primary/50 bg-[#030D03] py-4 flex justify-between xl:px-[20px] px-[10px]"
                    style={{
                      boxShadow:
                        "0px 4.8px 4.8px 0px rgba(0, 0, 0, 0.25) inset",
                    }}
                  >
                    <span className="text-[white] text-center text-[12px] sm:text-[20px] sm:leading-[24px]">
                      {rankStrFromNumber(i + 1)}
                    </span>
                    <span className="text-primary text-center text-[12px] sm:text-[20px] sm:leading-[24px]">
                      {shortenAddress(h.address, 4)}
                    </span>
                    <span className="text-[white] text-center text-[12px] sm:text-[20px] sm:leading-[24px]">
                      {formatNumber(Number(formatUnits(h.amount, 18)))}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {tableSize < 100 && tableSize < topHolders.length ? (
          <button
            className="text-white urbanist-font text-[16px] sm:text-[20px] gd-btn sm:py-[13px] mt-[22px] py-2 sm:px-[64px] px-8 rounded-[16px] mx-auto w-fit block leading-none"
            onClick={async () => {
              await fetchTopHolders();
              setTableSize(Math.min(100, tableSize + 10));
              setTimeout(() => {
                if (ref.current) {
                  ref.current.scrollTop = ref.current.scrollHeight;
                }
              }, 100);
            }}
            disabled={tableSize == 100}
          >
            LOAD MORE
          </button>
        ) : (
          <button
            className="text-primary text-[16px] sm:text-[20px] w-full mt-[22px] rounded-[16px]  p-[12px] border border-[#2D2F2D] leading-[24px] cursor-default"
            style={{
              background: "linear-gradient(180deg, #2F2F2F 0%, #1B1B1B 100%)",
              boxShadow: "0px 4.8px 4.8px 0px rgba(0, 0, 0, 0.25) inset",
            }}
            disabled={tableSize == 100}
          >
            LOAD MORE
          </button>
        )}
        <p className="text-white/60 text-[12px] sm:text-[14px] urbanist-font text-center mt-3">
          Leaderboard updates every few minutes.
        </p>
      </div>
    </div>
  );
}
