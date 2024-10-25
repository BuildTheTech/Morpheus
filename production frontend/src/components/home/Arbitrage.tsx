export default function Arbitrage() {
  return (
    <section className="2xl:py-[290px] lg:py-[200px] sm:py-[150px] py-[80px] relative z-[3]  ">
      <div className="relative max-w-[1684px] lg:px-[48px] sm:px-[24px] px-[12px] mx-auto">
        <div className="flex flex-col xl:flex-row-reverse xl:items-start xl:gap-3 lg:gap-[20px] gap-y-[50px]">
          <div className="flex-1 flex justify-center w-full" data-aos="fade-up">
            <img
              src="assets/images/arbitrage.png"
              className="max-w-full w-full mx-auto"
              alt=""
            />
          </div>
          <div className="flex-1" data-aos="fade-up">
            <div className="xl:pt-[50px]">
              <div>
                <h4 className="text-primary sen-font text-[16px] sm:text-[26px] leading-[110%] sm:leading-[39px] font-semibold">
                  OPPORTUNITIES FOR
                </h4>
                <h2 className="text-white leading-[120%] font-semibold text-[32px] sm:text-[80px] 2xl:text-[96px] sen-font xl:whitespace-nowrap">
                  ARBITRAGE
                </h2>
              </div>
            </div>

            <p className="text-primary text-[16px] sm:text-[20px] lg:text-[24px] leading-[125%]  urbanist-font font-medium ">
              The evolving minting costs create unique arbitrage opportunities:
            </p>

            <ul className="flex flex-col gap-[20px] sm:gap-[30px] sm:mt-[44px] mt-6 2xl:max-w-[705px]">
              {data.map((dt, i) => (
                <li
                  key={i}
                  className="text-[14px] sm:text-[20px] lg:text-[24px] leading-[125%] text-white flex items-start gap-[10px] sm:gap-5"
                >
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
  "As minting becomes more expensive, buying Morpheus on the open market could be more cost-effective. Take advantage of price discrepancies to maximize your returns.",
  "Savvy traders can mint or buy low and sell high, leveraging market dynamics for profit.",
];
