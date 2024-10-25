export default function Mechanism() {
  return (
    <section className="2xl:pt-[290px] lg:pt-[200px] sm:pt-[150px] pt-[80px] relative overflow-hidden 2xl:mb-[144px] mb-[30px] sm:mb-[60px] ">
      <img
        src="assets/images/mechanism-bg.png"
        alt=""
        className="absolute top-0 w-full left-0"
      />
      <div className="max-w-[1520px] lg:px-[48px] sm:px-[24px] px-[12px] mx-auto relative">
        <div className="flex flex-col xl:flex-row-reverse lg:items-center xl:gap-0  gap-y-[50px]">
          <div className="flex-1 flex justify-center w-full" data-aos="fade-up">
            <img
              src="assets/images/mechanism.png"
              className="max-w-full w-full mx-auto"
              alt=""
            />
          </div>
          <div className="flex-1" data-aos="fade-up">
            <div className=" ">
              <div>
                <h4 className="text-primary sen-font text-[16px] sm:text-[26px] leading-[110%] sm:leading-[39px] font-semibold">
                  SCARCITY & REWARD
                </h4>
                <h2 className="text-white leading-[120%] font-semibold text-[48px] sm:text-[80px] 2xl:text-[96px] sen-font whitespace-nowrap">
                  MECHANISM
                </h2>
              </div>
            </div>

            <p className="text-primary text-[16px] sm:text-[20px] lg:text-[24px] leading-[125%]  urbanist-font font-medium ">
              With every passing day, the cost to mint Morpheus increases by 4%.
              This decay mechanism makes early participation more rewarding.
            </p>

            <ul className="flex flex-col gap-[20px] sm:gap-[30px] sm:mt-[44px] mt-6 2xl:max-w-[700px]">
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
  "Lower Cost, Greater Opportunity: Mint early to capitalize on lower costs before the rate climbs, capturing more value at a lower price.",
];
