import { formatUnits } from "viem";
import { IconsBurned } from "../../Icons";
import { useAppContext } from "../../utilities/contexts/AppContext";
import { formatNumber } from "../../utilities/helper";
import PieChartArea from "./PieChart";

export default function Burned() {
  const { morpheusTotalSupply, morpheusBurnt, titanXBalanceForRaffle } =
    useAppContext();

  return (
    <div
      className="box w-full  pt-[30px] sm:pb-[45px] pb-[20px] px-[10px] sm:px-[86px] relative overflow-hidden bg-cover bg-no-repeat leading-none"
      style={{ backgroundImage: "url('/assets/images/burned-bg.png')" }}
    >
      <div className="relative">
        <h4 className="head-h4 text-center">MØRPHEUS BURNED</h4>
        <div className="my-[24px] max-w-[260px] aspect-square  mx-auto">
          <PieChartArea
            percent={
              morpheusTotalSupply == 0n
                ? 0
                : (Number(morpheusBurnt) / Number(morpheusTotalSupply)) * 100
            }
          />
        </div>

        <div className="">
          <p className="text-center text-white text-[14px] sm:text-[16px] font-normal leading-none mb-[7px]">
            Total <span className="text-primary">MØRPHEUS</span> Minted
          </p>

          <p className="mt-[7px] dark-box p-[13px] text-primary text-[14px] text-center sm:text-[20px] font-normal">
            {formatNumber(Number(formatUnits(morpheusTotalSupply, 18)))}
          </p>
        </div>

        <div className="flex items-center gap-[5px] mt-[17px] justify-center">
          <IconsBurned />
          <p className="text-[10px] sm:text-[16px] text-white font-normal text-center leading-none m-0 mt-2 whitespace-nowrap">
            {formatNumber(
              morpheusTotalSupply == 0n
                ? 0
                : (Number(morpheusBurnt) / Number(morpheusTotalSupply)) * 100
            )}
            % <span className="text-primary">of</span> MØRPHEUS{" "}
            <span className="text-primary">have been </span>
            burned
          </p>
          <IconsBurned />
        </div>

        <div className="col-span-1 mt-10">
          <p className="text-center text-white text-[14px] sm:text-[16px] font-normal leading-none mb-[7px] sm:leading-[19px]">
            Total <span className="text-primary">TITANX</span> for Raffle
          </p>

          <p className="mt-[7px] dark-box p-[13px] text-primary text-[14px] text-center sm:text-[20px] font-normal">
            {formatNumber(
              Number(formatUnits(titanXBalanceForRaffle, 18)) * 0.2
            )}{" "}
            TITANX
          </p>
        </div>
      </div>
    </div>
  );
}
