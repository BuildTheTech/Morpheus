export default function BuyBurn() {
  return (
    <section className=" 2xl:pt-[290px] lg:pt-[200px] sm:pt-[150px] pt-[80px] relative overflow-hidden 2xl:mb-[144px] mb-[30px] sm:mb-[60px] ">
      <img
        src="assets/images/buy-burn-bg.png"
        alt=""
        className="absolute top-0 w-full left-0"
      />
      <div className="max-w-[1547px] lg:px-[48px] sm:px-[24px] px-[12px] mx-auto relative">
        <div
          className="flex flex-col-reverse xl:flex-row xl:items-end xl:gap-[51px] lg:gap-[20px] gap-[50px] xl:justify-end xl:relative
          ">
          <div
            className="flex-1 xl:w-fit 2xl:mr-[-220px] xl:mr-[-150px]  "
            data-aos="fade-up">
            <div className="xl:w-[100%] ">
              <div>
                <h4 className="text-primary sen-font text-[16px] sm:text-[26px] leading-[110%] sm:leading-[39px] font-semibold">
                  Daily
                </h4>
                <h2 className="text-white leading-[120%] font-semibold text-[32px] sm:text-[80px] xl:text-[96px] sen-font">
                  BUY & BURN
                </h2>
              </div>
              <p className="text-primary text-[16px] sm:text-[20px] lg:text-[24px] leading-[125%]  urbanist-font font-medium max-w-[655px]">
                To ensure the value of Morpheus continues to grow, a daily buy
                and burn mechanism is employed:
              </p>

              <ul className="flex flex-col gap-[20px] sm:gap-[30px] sm:mt-[44px] mt-6 2xl:max-w-[704px]">
                {data.map((dt, i) => (
                  <li
                    key={i}
                    className="text-[14px] sm:text-[20px] lg:text-[24px] leading-[125%] text-white flex items-start gap-[10px] sm:gap-5">
                    <img
                      src="assets/images/check-circle.svg"
                      className="w-[20px] sm:w-[32px] pb-8"
                      alt=""
                    />
                    <span>{dt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex-1 " data-aos="fade-up">
            <img
              src="assets/images/buy-burn.png"
              className=" w-full xl:w-[120%]  "
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  );
}

const data = [
  "DragonX tokens are used daily to buy Morpheus through the primary liquidity pool.",
  "All Morpheus tokens bought are burned, reducing overall supply and creating scarcity.",
  "The buy and burn is a publicly callable function, with no centralized control.",
];
