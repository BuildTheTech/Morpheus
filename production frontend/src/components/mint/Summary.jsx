export default function Summary() {
  return (
    <div
      className="box w-full pt-[30px] sm:pb-[45px] pb-[20px]  relative overflow-hidden bg-cover bg-no-repeat leading-none"
      style={{ backgroundImage: "url('/assets/images/summary-bg.png')" }}
    >
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
              1 <span className="text-primary">TitanX</span> = 0.65{" "}
              <span className="text-primary">MORPHEUS</span>
            </p>
            <p className="text-white text-[12px] sm:text-[14px] font-normal leading-none mt-[9px]">
              1 <span className="text-primary">MORPHEUS</span> = $0.0000019424
            </p>
          </div>
        </div>

        <div className="w-full h-[1px] bg-[#12960A]/50 mt-[28px] mb-[38px]" />
        {/*  */}
        <div className="px-[10px] sm:px-[45px]">
          <p className="text-center text-white text-[14px] sm:text-[16px] font-normal leading-none mb-[7px] sm:leading-[19px]">
            Mint Cycle Progress
          </p>

          <div className="flex justify-between gap-2 sm:gap-4 items-center">
            <span className="text-white text-[14px] sm:text-[16px] font-normal">
              0%
            </span>
            <div className="flex-1 w-full h-[10px] bg-[#08210A] rounded-[5px] overflow-hidden">
              <div className="w-[45%] h-full bg-primary rounded-[5px]" />
            </div>
            <span className="text-white text-[14px] sm:text-[16px] font-normal">
              100%
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-[15px] gap-y-[26px] mt-[24px]">
            {/* Minted */}
            <div className="col-span-1 sm:col-span-2">
              <p className="text-center text-white text-[14px] sm:text-[16px] font-normal leading-none mb-[7px]">
                Total <span className="text-primary">MORPHEUS</span> Minted
              </p>

              <p className="mt-[7px] dark-box p-[13px] text-primary text-[14px] text-center sm:text-[20px] font-normal">
                5,837,175,532,405 MORPHEUS
              </p>
            </div>
            {/* Burnt */}
            <div className="col-span-1 sm:col-span-2">
              <p className="text-center text-white text-[14px] sm:text-[16px] font-normal leading-none mb-[7px] sm:leading-[19px]">
                Total <span className="text-primary">MORPHEUS</span> Burnt{" "}
                <span className="text-primary">45%</span>
              </p>

              <p className="mt-[7px] dark-box p-[13px] text-primary text-[14px] text-center sm:text-[20px] font-normal">
                5,837,175,532,405 MORPHEUS
              </p>
            </div>
            {/* Deposited*/}
            <div className="col-span-1 sm:col-span-2">
              <p className="text-center text-white text-[14px] sm:text-[16px] font-normal leading-none mb-[7px] sm:leading-[19px]">
                Total <span className="text-primary">TITANX</span> Deposited
              </p>

              <p className="mt-[7px] dark-box p-[13px] text-primary text-[16px] text-center sm:text-[20px] font-normal">
                5,837,175,532,405 TITANX
              </p>
            </div>
            {/* TITANX*/}
            <div className="col-span-1 ">
              <p className="text-center text-white text-[14px] sm:text-[16px] font-normal leading-none mb-[7px] sm:leading-[19px]">
                Total <span className="text-primary">TITANX</span> Burned
              </p>

              <p className="mt-[7px] dark-box p-[13px] text-primary text-[14px] text-center sm:text-[20px] font-normal">
                5.563bn TITANX
              </p>
            </div>
            {/* DRAGONX*/}
            <div className="col-span-1">
              <p className="text-center text-white text-[14px] sm:text-[16px] font-normal leading-none mb-[7px] sm:leading-[19px]">
                Total <span className="text-primary">DRAGONX</span> Burned
              </p>

              <p className="mt-[7px] dark-box p-[13px] text-primary text-[14px] text-center sm:text-[20px] font-normal">
                5.563bn DRAGONX
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
