import { IconsBurned } from "../../Icons";
import PieChartArea from "./PieChart";

export default function Burned() {
  return (
    <div
      className="box w-full  pt-[30px] sm:pb-[45px] pb-[20px] px-[10px] sm:px-[86px] relative overflow-hidden bg-cover bg-no-repeat leading-none"
      style={{ backgroundImage: "url('/assets/images/burned-bg.png')" }}
    >
      <div className="relative">
        <h4 className="head-h4 text-center">MORPHEUS BURNED</h4>

        <div className="mb-[54px] sm:mt-[73px] mt-[50px] max-w-[260px] aspect-square  mx-auto">
          <PieChartArea />
        </div>

        <div className="">
          <p className="text-center text-white text-[14px] sm:text-[16px] font-normal leading-none mb-[7px]">
            Total <span className="text-primary">MORPHEUS</span> Minted
          </p>

          <p className="mt-[7px] dark-box p-[13px] text-primary text-[14px] text-center sm:text-[20px] font-normal">
            5,837,175,532,405
          </p>
        </div>

        <div className="flex items-center gap-[5px] mt-[17px] justify-center">
          <IconsBurned />
          <p className="text-[10px] sm:text-[16px] text-white font-normal text-center leading-none m-0 mt-2 whitespace-nowrap">
            45% <span className="text-primary">of</span> MORPHEUS{" "}
            <span className="text-primary">have been </span>
            burned
          </p>
          <IconsBurned />
        </div>
      </div>
    </div>
  );
}
