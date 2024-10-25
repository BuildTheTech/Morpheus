import Footer from "../components/global/Footer";
import Header from "../components/global/Header";
import Arbitrage from "../components/home/Arbitrage";
import BuyBurn from "../components/home/BuyBurn";
import Ecosystem from "../components/home/Ecosystem";
import Hero from "../components/home/Hero";
import Liquidity from "../components/home/Liquidity";
import Mechanism from "../components/home/Mechanism";
import MintingPhase from "../components/home/MintngPhase";
import Titanx from "../components/home/Titanx";
import MatrixCode from "../matrix/MatrixCode";

export default function Home() {
  return (
    <>
      <main className=" 2xl:pt-[157px] lg:pt-[117px] pt-[102px]">
        <Header />
        <MatrixCode />
        <Hero />
        <div className="bg-black relative z-1">
          <Ecosystem />
          <Titanx />
          <BuyBurn />
          <MintingPhase />
          <Mechanism />
          <Liquidity />
          <Arbitrage />
        </div>
      </main>
      <div className="bg-black relative z-1">
        <img
          src="assets/images/arbitrage-bg.png"
          alt=""
          className="absolute bottom-0 w-full left-0 z-1"
        />
        <div className="relative z-2">
          <Footer />
        </div>
      </div>
    </>
  );
}
