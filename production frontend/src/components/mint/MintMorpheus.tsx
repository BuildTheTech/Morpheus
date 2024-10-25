import { useState } from "react";
import { ArrowUpDown } from "../../Icons";
import Dropdown from "./Dropdown";
import { useAccount, useBalance, useConfig, useReadContract } from "wagmi";
import {
  simulateContract,
  waitForTransactionReceipt,
  writeContract,
} from "wagmi/actions";
import TokenABI from "../../abi/TokenABI.json";
import MorpheusMintingABI from "../../abi/MorpheusMintingABI.json";
import { mintingAddress, titanXAddress } from "../../utilities/constants";
import { formatUnits, parseUnits } from "viem";
import { useAppContext } from "../../utilities/contexts/AppContext";
import { formatNumber, formatTimeDiff } from "../../utilities/helper";
import { myToast } from "../Toast";

export default function MintMorpheus() {
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { isConnected, address } = useAccount();
  const config = useConfig();
  const {
    titanXPrice,
    currentRatio,
    currentCycle,
    endsAt,
    refetchContractInfo,
  } = useAppContext();

  const titanXBalanceResult = useBalance({
    address: address,
    token: titanXAddress,
    query: { refetchInterval: 60000 },
  });
  const titanXBalance = (titanXBalanceResult.data?.value || 0n) as bigint;

  const titanXAllowanceResult = useReadContract({
    abi: TokenABI,
    address: titanXAddress,
    functionName: "allowance",
    args: [address, mintingAddress],
    query: { refetchInterval: 60000 },
  });
  const titanXAllowance = (titanXAllowanceResult.data || 0n) as bigint;

  const handleApprove = async () => {
    if (titanXAllowance >= parseUnits(amount, 18)) {
      return;
    }

    setIsLoading(true);
    try {
      const result = await simulateContract(config, {
        abi: TokenABI,
        address: titanXAddress,
        functionName: "approve",
        args: [mintingAddress, parseUnits(amount, 18)],
        account: address,
      });

      const writeResult = await writeContract(config, result.request);
      const data = await waitForTransactionReceipt(config, {
        hash: writeResult,
      });
      console.log(writeResult, data);
      titanXAllowanceResult.refetch();
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };

  const handleMint = async () => {
    setIsLoading(true);
    try {
      const result = await simulateContract(config, {
        abi: MorpheusMintingABI,
        address: mintingAddress,
        functionName: "mint",
        args: [parseUnits(amount, 18)],
        account: address,
      });

      const writeResult = await writeContract(config, result.request);
      await waitForTransactionReceipt(config, {
        hash: writeResult,
      });
      titanXBalanceResult.refetch();
      refetchContractInfo();

      myToast({
        title: "Successful",
        content: `Morpheus Minted Successfully! You can claim your Morpheus in ${formatTimeDiff(
          endsAt * 1000 - Date.now()
        )}`,
        toastType: "success",
      });
      setAmount("");
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };

  return (
    <div
      className="box w-full pt-[30px] sm:pb-[45px] pb-[20px] px-[10px] sm:px-[45px] relative overflow-hidden bg-cover bg-no-repeat"
      style={{ backgroundImage: "url('/assets/images/mint-bg.png')" }}
    >
      <div>
        <h4 className="head-h4 text-center">MINT MØRPHEUS</h4>

        {/* TITANX Spent */}
        <p className="text-center text-primary/60 text-[14px] font-normal leading-normal mt-6 mb-2">
          TITANX Spent
        </p>
        <div className="p-[1px] bg-gradient-to-b from-primary/60 to-primary/5 rounded-[16px]">
          <div
            className="rounded-[16px] bg-[#030D03] pt-[24px] pb-[11px] px-[13px]"
            style={{
              boxShadow: "0px 4.8px 4.8px 0px rgba(0, 0, 0, 0.25) inset",
            }}
          >
            <div className="flex justify-between flex-wrap sm:flex-nowrap items-center gap-2">
              <input
                type="number"
                className="text-white placeholder:text-white text-[14px] sm:text-[24px] font-normal leading-none w-full flex-1 bg-transparent border-none outline-none"
                onChange={(e) => setAmount(e.target.value)}
                value={amount}
                placeholder="0"
              />

              <Dropdown />
            </div>

            <div className="flex justify-between items-center mt-[4px] mb-[9px] flex-wrap gap-2 ">
              <h6 className="text-primary/60 urbanist-font">
                ${formatNumber(Number(amount) * titanXPrice)}
              </h6>
              <div className="flex items-center gap-1 ">
                <button
                  onClick={() => setAmount(formatUnits(titanXBalance / 4n, 18))}
                  className={`text-black text-[10px] sm:text-[16px] font-semibold rounded-[16px] px-[5px] sm:px-[12px] py-0.5 urbanist-font bg-primary/60`}
                  style={{
                    boxShadow: "0px 4.8px 4.8px 0px rgba(0, 0, 0, 0.25) inset",
                  }}
                >
                  25%
                </button>
                <button
                  onClick={() => setAmount(formatUnits(titanXBalance / 2n, 18))}
                  className={`text-black text-[10px] sm:text-[16px] font-semibold rounded-[16px] px-[5px] sm:px-[12px] py-0.5 urbanist-font bg-primary/60`}
                  style={{
                    boxShadow: "0px 4.8px 4.8px 0px rgba(0, 0, 0, 0.25) inset",
                  }}
                >
                  50%
                </button>
                <button
                  onClick={() => setAmount(formatUnits(titanXBalance, 18))}
                  className={`text-black text-[10px] sm:text-[16px] font-semibold rounded-[16px] px-[5px] sm:px-[12px] py-0.5 urbanist-font bg-primary/60`}
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
              <p className="text-white/50 text-[10px] sm:text-[14px] font-normal pt-[7px] leading-none">
                Wallet Balance:
              </p>
              <p className="text-white/50 text-[10px] sm:text-[14px] font-normal pt-[7px] leading-none">
                {formatNumber(Number(formatUnits(titanXBalance, 18)))}{" "}
                <span className="text-primary/50">TITANX</span>
              </p>
            </div>
          </div>
        </div>
        <button className="block w-fit mx-auto mt-[22px]">
          <ArrowUpDown />
        </button>
        {/* MORPHEUS minted */}
        <p className="text-center text-primary/60 text-[14px] font-normal mt-[15px] mb-2 leading-none">
          MØRPHEUS minted
        </p>

        <div className="p-[1px] bg-gradient-to-b from-primary/60 to-primary/5 rounded-[16px]">
          <div
            className="rounded-[16px] bg-[#030D03] pt-[20px] pb-[14px] px-[13px]"
            style={{
              boxShadow: "0px 4.8px 4.8px 0px rgba(0, 0, 0, 0.25) inset",
            }}
          >
            <div className="flex justify-between flex-wrap items-center gap-y-2">
              <h5 className="text-white text-[14px] sm:text-[24px] font-normal leading-none">
                {formatNumber(Number(amount) * currentRatio)}
              </h5>
            </div>

            <div className="flex justify-between items-center mt-[6px] flex-wrap gap-2 border-t border-[#12960A]/20 pt-[7px]">
              <h6 className="text-primary/60 urbanist-font text-[16px]">
                ${formatNumber(Number(amount) * titanXPrice)}
              </h6>
              {/* <h6 className="text-primary/60 text-[16px]">
                ROI: <span className="text-white">165%</span>
              </h6> */}
            </div>
          </div>
        </div>

        <button
          className="text-white text-[16px] sm:text-[20px] w-full gd-btn mt-[22px] rounded-[16px] urbanist-font p-[12px] leading-none uppercase"
          disabled={!isConnected || isLoading || currentCycle == 0}
          onClick={() => {
            if (titanXAllowance >= parseUnits(amount, 18)) {
              handleMint();
            } else {
              handleApprove();
            }
          }}
        >
          {!isConnected
            ? "Please connect wallet..."
            : isLoading
            ? "Processing..."
            : titanXAllowance < parseUnits(amount, 18)
            ? "Approve"
            : "Mint"}
        </button>
        <p className="text-white/60 text-[12px] sm:text-[14px] urbanist-font mt-3">
          Your Morpheus will be claimable at the end of the cycle day.
        </p>
      </div>
    </div>
  );
}
