export default function Titanx() {
  return (
    <section className="relative overflow-hidden xl:pt-[142px] pt-[60px] sm:pt-[100px] 2xl:mb-[144px] mb-[30px] sm:mb-[60px]">
      <img
        src="assets/images/titanx-bg.png"
        alt=""
        className="absolute top-0 w-full left-0"
      />
      <div className="max-w-[1624px] lg:px-[48px] sm:px-[24px] px-[12px] mx-auto relative">
        <div className="flex flex-col xl:flex-row lg:items-center xl:gap-[51px] lg:gap-[20px] gap-[50px]">
          <div className="flex-1" data-aos="fade-up">
            <img
              src="assets/images/titanx.png"
              className="max-w-full w-full "
              alt=""
            />
          </div>
          <div className="flex-1" data-aos="fade-up">
            <div className="flex items-center gap-2">
              <div>
                <h4 className="text-primary sen-font text-[16px] sm:text-[26px] lg:text-[32px] leading-[110%] sm:leading-[39px] font-semibold">
                  Minting <span className="text-white">MØRPHEUS</span> with
                </h4>
                <h2 className="text-white leading-[120%] font-semibold text-[48px] sm:text-[80px] xl:text-[96px] sen-font">
                  TITANX
                </h2>
              </div>

              <div>
                {" "}
                <img
                  src="assets/images/man-circle.png"
                  className="lg:w-[112px] xl:h-[112px] sm:w-[100px] sm:h-[100px] w-[60px] h-[60px] rounded-full aspect-square"
                  alt=""
                />
              </div>
            </div>

            <p className="text-primary text-[16px] sm:text-[20px] lg:text-[24px] leading-[125%]  urbanist-font font-medium max-w-[591px]">
              By converting your TITANX tokens, you begin your path towards
              minting Morpheus. Here’s how it works:
            </p>

            <ul className="flex flex-col gap-[20px] sm:gap-[30px] sm:mt-[44px] mt-6">
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
  "10% of your TITANX fuels the DragonX Vault, providing stability and cooperation between primary liquidity pairs, aiming to keep the ecosystem secure and stable.",
  "10% of your TITANX is used for a community raffle after the mint phase. Every 100 million TITANX spent secures one raffle entry for an individual user. No limit on entries. At the end of MINT phase, 10 winners wil split 10% of collected TITANX.",
  "8% is allocated to the Genesis Fund for continuous ecosystem growth and development",
  "72% purchases DragonX, with 20% of acquired DragonX burned to drive scarcity. The rest is used to buy and burn Morpheus, giving your tokens a foundation of value and scarcity.",
];
