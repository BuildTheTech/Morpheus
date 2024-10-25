import { useState } from "react";
import { useAppContext } from "../../utilities/contexts/AppContext";
import Carousel from "./Carousel";
import Countdown from "./Countdown";
import { useAccount, useConfig, useReadContract } from "wagmi";
import MorpheusMintingABI from "../../abi/MorpheusMintingABI.json";
import { mintingAddress } from "../../utilities/constants";
import { formatNumber } from "../../utilities/helper";
import { formatUnits } from "viem";
import {
  simulateContract,
  waitForTransactionReceipt,
  writeContract,
} from "wagmi/actions";
import { myToast } from "../Toast";

export default function Claimable() {
  const [selectedCycle, setSelectedCycle] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const { currentCycle, morpheusPrice, endsAt, refetchContractInfo } =
    useAppContext();

  const { address, isConnected } = useAccount();
  const config = useConfig();

  const amountToClaimResult = useReadContract({
    abi: MorpheusMintingABI,
    address: mintingAddress,
    functionName: "amountToClaim",
    args: [address, selectedCycle],
    query: { refetchInterval: 5000 },
  });
  const amountToClaim = (amountToClaimResult.data || 0n) as bigint;

  const handleClaim = async () => {
    setIsLoading(true);
    try {
      const result = await simulateContract(config, {
        abi: MorpheusMintingABI,
        address: mintingAddress,
        functionName: "claim",
        args: [selectedCycle],
        account: address,
      });

      const writeResult = await writeContract(config, result.request);
      await waitForTransactionReceipt(config, {
        hash: writeResult,
      });
      refetchContractInfo();
      amountToClaimResult.refetch();
      myToast({
        title: "Successful",
        content: "Morpheus Claimed for CycleX Successfully!",
        toastType: "success",
      });
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };

  return (
    <div
      className="box w-full pt-[30px] sm:pb-[45px] pb-[20px] px-[10px] sm:px-[45px] relative overflow-hidden bg-cover bg-no-repeat"
      style={{ backgroundImage: "url('/assets/images/claimable-bg.png')" }}
    >
      <div className="relative">
        <h4 className="head-h4 text-center">MØRPHEUS CLAIMABLE</h4>

        <div className="lg:pt-[88px] pt-[50px] lg:pb-[60px] pb-[30px]">
          <Carousel maxCycle={currentCycle} onChange={setSelectedCycle} />
        </div>

        <p className="text-center text-primary/60 text-[12px] sm:text-[14px]">
          MØRPHEUS
        </p>

        <div className="p-[1px] bg-gradient-to-b from-primary/60 to-primary/5 rounded-[16px] mt-2">
          <div
            className="rounded-[16px]  bg-[#030D03] pt-[20px] pb-[15px] px-[13px]"
            style={{
              boxShadow: "0px 4.8px 4.8px 0px rgba(0, 0, 0, 0.25) inset",
            }}
          >
            <h5 className="text-white text-[18px] sm:text-[24px] text-center leading-none">
              {formatNumber(Number(formatUnits(amountToClaim, 18)))}
            </h5>

            <p className="border-[#12960A]/30 border-t text-primary/60 text-[14px] sm:text-[16px] font-medium urbanist-font pt-1.5 text-center mt-[11px] leading-none">
              ${Number(formatUnits(amountToClaim, 18)) * morpheusPrice}
            </p>
          </div>
        </div>
        {currentCycle == selectedCycle && Date.now() < endsAt * 1000 ? (
          <button
            className="text-primary text-[16px] sm:text-[20px] w-full mt-[22px] rounded-[16px]  p-[12px] border border-[#2D2F2D] leading-[24px]"
            style={{
              background: "linear-gradient(180deg, #2F2F2F 0%, #1B1B1B 100%)",
              boxShadow: "0px 4.8px 4.8px 0px rgba(0, 0, 0, 0.25) inset",
            }}
          >
            Claimable After:{" "}
            <span className="text-white/60">
              <Countdown targetDate={new Date(endsAt * 1000)} />
            </span>
          </button>
        ) : (
          <button
            className="text-white text-[16px] sm:text-[20px] w-full gd-btn mt-[22px] rounded-[16px] urbanist-font p-[12px] leading-none uppercase"
            disabled={!isConnected || isLoading}
            onClick={handleClaim}
          >
            {!isConnected
              ? "Please connect wallet..."
              : isLoading
              ? "Processing..."
              : "Claim"}
          </button>
        )}
      </div>
    </div>
  );
}
