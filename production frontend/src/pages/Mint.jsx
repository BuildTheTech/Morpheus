import Burned from "../components/mint/Burned";
import Buy from "../components/mint/Buy";
import Claimable from "../components/mint/Claimable";
import Leaderboard from "../components/mint/Leaderboard";
import MintMorpheus from "../components/mint/MintMorpheus";
import Summary from "../components/mint/Summary";

export default function Mint() {
  return (
    <main className="my-[60px] sm:my-[100px] 2xl:my-[174px] 2xl:pt-[173px] lg:pt-[117px] pt-[82px]">
      <div className="container">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-[48px]">
          <MintMorpheus />
          <Claimable />
          <Summary />
          <Burned />
          <Buy />
          <Leaderboard />
        </div>
      </div>
    </main>
  );
}
