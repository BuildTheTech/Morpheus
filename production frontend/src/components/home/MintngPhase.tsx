export default function MintingPhase() {
  return (
    <section className="2xl:pt-[290px] lg:pt-[200px] sm:pt-[150px] pt-[80px] relative overflow-hidden 2xl:mb-[144px] mb-[30px] sm:mb-[60px] ">
      <img
        src="assets/images/minting-phase-bg.png"
        alt=""
        className="absolute top-0 w-full left-0"
      />
      <div className="relative max-w-[1684px] lg:px-[48px] sm:px-[24px] px-[12px] mx-auto">
        <div className="flex flex-col xl:flex-row lg:items-start xl:gap-3 lg:gap-[20px] gap-[50px]">
          <div className="flex-1 flex justify-center w-full" data-aos="fade-up">
            <img
              src="assets/images/minting-phase.png"
              className="max-w-full w-full mx-auto"
              alt=""
            />
          </div>
          <div className="flex-1" data-aos="fade-up">
            <div className="xl:pt-4">
              <div>
                <h4 className="text-primary sen-font text-[16px] sm:text-[26px] leading-[110%] sm:leading-[39px] font-semibold">
                  The
                </h4>
                <h2 className="text-white leading-[120%] font-semibold text-[32px] sm:text-[80px] 2xl:text-[96px] sen-font xl:whitespace-nowrap">
                  MINTING PHASE
                </h2>
              </div>
            </div>

            <p className="text-primary text-[16px] sm:text-[20px] lg:text-[24px] leading-[125%]  urbanist-font font-medium ">
              The 14-day minting phase offers exclusive access to mint Morpheus:
            </p>

            <ul className="flex flex-col gap-[20px] sm:gap-[30px] sm:mt-[44px] mt-6 2xl:max-w-[660px]">
              {data.map((dt, i) => (
                <li
                  key={i}
                  className="text-[14px] sm:text-[20px] lg:text-[24px] leading-[125%] text-white flex items-start gap-[10px] sm:gap-5">
                  <img
                    src="assets/images/check-circle.svg"
                    className="w-[20px] sm:w-[32px]"
                    alt=""
                  />
                  <span>{dt}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

const data = [
  "Alternating Day Minting: Minting is open EVERY day, allowing for constant participation.",
  "A Leaderboard showcases top wallets, encouraging participants to strive for the top and engage deeply with the ecosystem.",
  "Instant Claim: Minted tokens are claimable at the end of each mint day—no waiting for weeks.",
];
