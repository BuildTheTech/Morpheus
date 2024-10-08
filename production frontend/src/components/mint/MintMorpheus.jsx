import { useState } from "react";
import { ArrowUpDown } from "../../Icons";
import Dropdown from "./Dropdown";

export default function MintMorpheus() {
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("127,394,882.22");
  return (
    <div
      className="box  w-full  pt-[30px] sm:pb-[45px] pb-[20px] px-[10px] sm:px-[45px]  relative overflow-hidden bg-cover bg-no-repeat"
      style={{ backgroundImage: "url('/assets/images/mint-bg.png')" }}
    >
      <div>
        <h4 className="head-h4 text-center">MINT MORPHEUS</h4>

        {/* TITANX Spent */}
        <p className="text-center text-primary/60 text-[14px] font-normal leading-normal mt-6 mb-2">
          TITANX Spent
        </p>
        <div className="p-[1px] bg-gradient-to-b from-primary/60 to-primary/5 rounded-[16px]">
          <div
            className="rounded-[16px]  bg-[#030D03] pt-[24px] pb-[11px] px-[13px]"
            style={{
              boxShadow: "0px 4.8px 4.8px 0px rgba(0, 0, 0, 0.25) inset",
            }}
          >
            <div className="flex justify-between flex-wrap sm:flex-nowrap items-center gap-2">
              <input
                type="text"
                className="text-white placeholder:text-white text-[14px] sm:text-[24px] font-normal  leading-none w-full flex-1 bg-transparent border-none outline-none"
                onChange={(e) => setInputValue(e.target.value)}
                value={inputValue}
              />

              <Dropdown />
            </div>

            <div className="flex justify-between items-center mt-[4px] mb-[9px] flex-wrap gap-2 ">
              <h6 className="text-primary/60 urbanist-font">$123,839.51</h6>
              <div className="flex items-center gap-1 ">
                <button
                  onClick={() => setValue("25%")}
                  className={`text-black text-[10px] sm:text-[16px] font-semibold  rounded-[16px] px-[5px] sm:px-[12px] py-0.5 urbanist-font  ${
                    value === "25%" ? "bg-white/60" : "bg-primary/60"
                  }`}
                  style={{
                    boxShadow: "0px 4.8px 4.8px 0px rgba(0, 0, 0, 0.25) inset",
                  }}
                >
                  25%
                </button>
                <button
                  onClick={() => setValue("50%")}
                  className={`text-black text-[10px] sm:text-[16px] font-semibold  rounded-[16px] px-[5px] sm:px-[12px] py-0.5 urbanist-font  ${
                    value === "50%" ? "bg-white/60" : "bg-primary/60"
                  }`}
                  style={{
                    boxShadow: "0px 4.8px 4.8px 0px rgba(0, 0, 0, 0.25) inset",
                  }}
                >
                  50%
                </button>
                <button
                  onClick={() => setValue("MAX")}
                  className={`text-black text-[10px] sm:text-[16px] font-semibold  rounded-[16px] px-[5px] sm:px-[12px] py-0.5 urbanist-font  ${
                    value === "MAX" ? "bg-white/60" : "bg-primary/60"
                  }`}
                  style={{
                    boxShadow: "0px 4.8px 4.8px 0px rgba(0, 0, 0, 0.25) inset",
                  }}
                >
                  MAX
                </button>
              </div>
            </div>

            {/* balance */}
            <div className="flex justify-between items-center gap-1 flex-wrap border-t border-[#12960A]/20">
              <p className="text-white/50 text-[10px] sm:text-[14px] font-normal pt-[7px] leading-none ">
                Wallet Balance:
              </p>
              <p className="text-white/50 text-[10px] sm:text-[14px] font-normal pt-[7px] leading-none">
                17,937,827,526.45{" "}
                <span className="text-primary/50">TITANX</span>
              </p>
            </div>
          </div>
        </div>

        <button className="block w-fit mx-auto mt-[22px]">
          <ArrowUpDown />
        </button>
        {/* MORPHEUS minted */}
        <p className="text-center text-primary/60 text-[14px] font-normal  mt-[15px] mb-2 leading-none">
          MORPHEUS minted
        </p>

        <div className="p-[1px] bg-gradient-to-b from-primary/60 to-primary/5 rounded-[16px]">
          <div
            className="rounded-[16px]  bg-[#030D03] pt-[20px] pb-[14px] px-[13px]"
            style={{
              boxShadow: "0px 4.8px 4.8px 0px rgba(0, 0, 0, 0.25) inset",
            }}
          >
            <div className="flex justify-between flex-wrap items-center gap-y-2">
              <h5 className="text-white text-[14px] sm:text-[24px] font-normal  leading-none">
                17,127,394,882.22
              </h5>
            </div>

            <div className="flex justify-between items-center mt-[6px]  flex-wrap gap-2 border-t border-[#12960A]/20 pt-[7px]">
              <h6 className="text-primary/60 urbanist-font text-[16px]">
                $122,948.81
              </h6>
              <h6 className="text-primary/60  text-[16px]">
                ROI: <span className="text-white">165%</span>
              </h6>
            </div>
          </div>
        </div>

        <button className="text-white text-[16px] sm:text-[20px] w-full gd-btn mt-[22px] rounded-[16px] urbanist-font p-[12px] leading-none">
          MINT
        </button>
      </div>
    </div>
  );
}
