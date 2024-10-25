export default function Hero() {
  return (
    <section className="overflow-hidden relative">
      <div className="container ">
        <h1 className="text-center text-[#06AE0B] text-[32px] sm:text-[72px] lg:text-[84px] xl:text-[114px] xl:leading-[137px] leading-[120%] font-semibold sen-font  w-fit mx-auto morpheus-text-bg">
          MØRPHEUS
        </h1>

        <p className="text-center mx-auto max-w-[723px] text-white font-normal text-[16px] sm:text-[20px] lg:text-[24px] leading-[120%] relative z-2">
          Everything you know about liquidity, scarcity, and power within
          finance is about to be redefined.
        </p>

        <div className="w-fit mx-auto " data-aos="fade-up">
          <img
            src="assets/images/hero-man.png"
            className="hero-man-bg max-w-[1344px] w-full xl:-mt-8 relative z-1"
            alt=""
          />
          <img
            src="assets/images/bg-bottom-shape.png"
            alt=""
            className="absolute left-0 w-full bottom-0"
          />
        </div>
      </div>
    </section>
  );
}
