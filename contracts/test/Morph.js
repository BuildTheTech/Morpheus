const { ethers, network } = require("hardhat");
const { expect } = require("chai");

async function forkEthereumMainnet() {
  console.log("Forking Ethereum Mainnet...");

  await network.provider.request({
    method: "hardhat_reset",
    params: [
      {
        forking: {
          jsonRpcUrl: "https://rpc.ankr.com/eth",
        },
      },
    ],
  });
}

async function fundWallets(wallets, ethAmount, titanXAmount, richAccount) {
  console.log("Funding wallets...");

  await network.provider.request({
    method: "hardhat_impersonateAccount",
    params: [richAccount],
  });

  const richSigner = await ethers.provider.getSigner(richAccount);

  for (const wallet of wallets) {
    const hexBalance = ethers.toBeHex(ethAmount);
    console.log(`Funding wallet ${wallet.address} with 1 ETH...`);
    await network.provider.send("hardhat_setBalance", [
      wallet.address,
      hexBalance,
    ]);

    const titanXAddress = "0xF19308F923582A6f7c465e5CE7a9Dc1BEC6665B1";
    const titanX = await ethers.getContractAt("ERC20", titanXAddress);
    console.log(
      `Transferring ${ethers.formatUnits(titanXAmount)} TitanX to wallet ${
        wallet.address
      }...`
    );
    await titanX.connect(richSigner).transfer(wallet.address, titanXAmount);
  }

  console.log(`Stopping impersonation for ${richAccount}...`);
  await network.provider.request({
    method: "hardhat_stopImpersonatingAccount",
    params: [richAccount],
  });
}

async function deployMorpheusContracts() {
  console.log("Deploying Morpheus contract...");

  // Fetch the current block timestamp from the network
  const currentTimestamp = (await ethers.provider.getBlock("latest")).timestamp;

  console.log(`Current network timestamp: ${currentTimestamp}`);

  const Morpheus = await ethers.getContractFactory("Morpheus");

  // Deploy the contract using the current timestamp
  const morpheus = await Morpheus.deploy(
    currentTimestamp, // Use current block timestamp
    currentTimestamp, // Use current block timestamp
    "0x25215d9ba4403b3DA77ce50606b54577a71b7895",
    "0xF19308F923582A6f7c465e5CE7a9Dc1BEC6665B1",
    "0x96a5399D07896f757Bd4c6eF56461F58DB951862",
    "0xe5e0C13133782d967B002B3400E6Ebea5d9814C0"
  );

  // Fetch Morpheus contract's minting and buyAndBurn addresses
  const morpheusMintingAddress = await morpheus.minting();
  console.log(
    `MorpheusMinting contract deployed at: ${morpheusMintingAddress}`
  );

  const morpheusBuyAndBurnAddress = await morpheus.buyAndBurn();
  console.log(
    `MorpheusBuyAndBurn contract deployed at: ${morpheusBuyAndBurnAddress}`
  );

  // Return the contract instances and addresses
  return {
    morpheus,
    morpheusMintingAddress,
    morpheusBuyAndBurnAddress,
  };
}

async function mintTokens(morpheusMintingAddress, wallets, cycleId) {
  console.log(`Minting for cycle ${cycleId}...`);

  const morpheusMinting = await ethers.getContractAt(
    "MorpheusMinting",
    morpheusMintingAddress
  );

  const mintAmount = ethers.parseUnits("1000000000", 18);
  const titanXAddress = "0xF19308F923582A6f7c465e5CE7a9Dc1BEC6665B1";
  const titanX = await ethers.getContractAt("ERC20", titanXAddress);

  for (const wallet of wallets) {
    const titanXSigner = titanX.connect(wallet);
    await titanXSigner.approve(morpheusMintingAddress, mintAmount);

    const morpheusSigner = morpheusMinting.connect(wallet);
    await morpheusSigner.mint(mintAmount);
  }

  if (cycleId < 6) {
    console.log("Advancing time by 24 hours...");
    await network.provider.send("evm_increaseTime", [24 * 60 * 60]);
    await network.provider.send("evm_mine");
  }

  if (cycleId > 5) {
    console.log("Advancing time by 30 minutes...");
    await network.provider.send("evm_increaseTime", [30 * 60]);
    await network.provider.send("evm_mine");
  }
}

async function checkAmountToClaim(morpheusMintingAddress, wallets, cycleId) {
  console.log(`Checking amountToClaim for cycle ${cycleId}...`);

  const morpheusMinting = await ethers.getContractAt(
    "MorpheusMinting",
    morpheusMintingAddress
  );

  for (const wallet of wallets) {
    const amountToClaim = await morpheusMinting.amountToClaim(
      wallet.address,
      cycleId
    );
    console.log(
      `Wallet ${wallet.address} has ${ethers.formatUnits(
        amountToClaim
      )} Morpheus to claim for cycle ${cycleId}.`
    );
  }
}

async function claimTokens(morpheusMintingAddress, wallets, cycleId) {
  console.log(`Claiming tokens for cycle ${cycleId}...`);

  const morpheusMinting = await ethers.getContractAt(
    "MorpheusMinting",
    morpheusMintingAddress
  );

  for (const wallet of wallets) {
    const morpheusSigner = morpheusMinting.connect(wallet);
    await morpheusSigner.claim(cycleId);
  }
}

async function addLiquidityToMorpheusDragonxPool(morpheusBuyAndBurnAddress) {
  console.log("Adding liquidity to Morpheus/DragonX pool...");

  const morpheusBuyAndBurn = await ethers.getContractAt(
    "MorpheusBuyAndBurn",
    morpheusBuyAndBurnAddress
  );
  const richAccount = "0xe5e0C13133782d967B002B3400E6Ebea5d9814C0";

  const currentBlock = await ethers.provider.getBlock("latest");
  const currentTimestamp = currentBlock.timestamp;

  const deadline = currentTimestamp + 60 * 10;

  console.log(
    `Setting deadline to: ${deadline} (current block timestamp + 10 minutes)`
  );

  await network.provider.request({
    method: "hardhat_impersonateAccount",
    params: [richAccount],
  });

  const richSigner = await ethers.provider.getSigner(richAccount);

  await morpheusBuyAndBurn
    .connect(richSigner)
    .addLiquidityToMorpheusDragonxPool(deadline);

  console.log("Liquidity added.");

  await network.provider.request({
    method: "hardhat_stopImpersonatingAccount",
    params: [richAccount],
  });
}

async function checkUniswapV3PairBalances(morpheus) {
  console.log("Checking UniswapV3 pair balances...");

  const dragonXPool = await morpheus.dragonXMorpheusPool();
  console.log(`MORPH/DRAGONX Pool Address: ${dragonXPool}`);

  const pairContract = await ethers.getContractAt(
    "IUniswapV3Pool",
    dragonXPool
  );

  const slot0 = await pairContract.slot0();
  const liquidity = await pairContract.liquidity();

  console.log(`Current sqrtPriceX96: ${slot0.sqrtPriceX96.toString()}`);
  console.log(`Current liquidity: ${ethers.formatUnits(liquidity, 18)}`);

  // Get the token addresses
  const token0Address = await pairContract.token0();
  const token1Address = await pairContract.token1();

  console.log(`Token 0 Address: ${token0Address}`);
  console.log(`Token 1 Address: ${token1Address}`);

  // Get the balance of both tokens in the pool
  const token0 = await ethers.getContractAt(
    "@openzeppelin/contracts/token/ERC20/IERC20.sol:IERC20",
    token0Address
  );
  const token1 = await ethers.getContractAt(
    "@openzeppelin/contracts/token/ERC20/IERC20.sol:IERC20",
    token1Address
  );

  const token0Balance = await token0.balanceOf(pairContract);
  const token1Balance = await token1.balanceOf(pairContract);

  console.log(`${token0Address} Balance: ${token0Balance}`);
  console.log(`${token1Address} Balance: ${token1Balance}`);
}

async function swapTitanXForDragonXAndMorpheusAndBurn(
  morpheusBuyAndBurnAddress,
  morpheus
) {
  console.log("Swapping TitanX for Morpheus and DragonX, and burning...");

  const morpheusBuyAndBurn = await ethers.getContractAt(
    "MorpheusBuyAndBurn",
    morpheusBuyAndBurnAddress
  );

  const titanXAddress = "0xF19308F923582A6f7c465e5CE7a9Dc1BEC6665B1";
  const titanX = await ethers.getContractAt("ERC20", titanXAddress);

  const richAccount = "0xe5e0C13133782d967B002B3400E6Ebea5d9814C0";
  const dragonXPool = await morpheus.dragonXMorpheusPool();

  const pairContract = await ethers.getContractAt(
    "IUniswapV3Pool",
    dragonXPool
  );

  // Get the TitanX/DragonX pool address
  const titanXDragonXPool = "0x25215d9ba4403b3DA77ce50606b54577a71b7895"; // Replace with your actual TitanX/DragonX Uniswap V3 pool address
  const titanXDragonXPairContract = await ethers.getContractAt(
    "IUniswapV3Pool",
    titanXDragonXPool
  );

  const token0Address = await pairContract.token0();
  const token1Address = await pairContract.token1();

  const token0 = await ethers.getContractAt("ERC20", token0Address);
  const token1 = await ethers.getContractAt("ERC20", token1Address);

  // Log the TitanX balance before the swap
  let titanXBalanceBefore = await titanX.balanceOf(morpheusBuyAndBurnAddress);
  console.log(`TitanX balance before swap: ${titanXBalanceBefore}`);

  // Log the Morpheus and DragonX balances in the Morpheus/DragonX pool before swap
  const token0BalanceBefore = await token0.balanceOf(dragonXPool);
  const token1BalanceBefore = await token1.balanceOf(dragonXPool);
  console.log(
    `Morpheus/DragonX Pool: Morpheus balance before swap: ${ethers.formatUnits(
      token0BalanceBefore,
      18
    )}`
  );
  console.log(
    `Morpheus/DragonX Pool: DragonX balance before swap: ${ethers.formatUnits(
      token1BalanceBefore,
      18
    )}`
  );

  // Log the TitanX and DragonX balances in the TitanX/DragonX pool before swap
  const titanXBalanceInPoolBefore = await titanX.balanceOf(titanXDragonXPool);
  const dragonXBalanceInPoolBefore = await token1.balanceOf(titanXDragonXPool);

  console.log(
    `TitanX/DragonX Pool: TitanX balance before swap: ${ethers.formatUnits(
      titanXBalanceInPoolBefore,
      18
    )}`
  );
  console.log(
    `TitanX/DragonX Pool: DragonX balance before swap: ${ethers.formatUnits(
      dragonXBalanceInPoolBefore,
      18
    )}`
  );

  const currentBlock = await ethers.provider.getBlock("latest");
  const currentTimestamp = currentBlock.timestamp;

  const deadline = currentTimestamp + 60 * 10; // Set deadline to 10 minutes from now

  console.log(
    `Setting deadline to: ${deadline} (current block timestamp + 10 minutes)`
  );

  await network.provider.request({
    method: "hardhat_impersonateAccount",
    params: [richAccount],
  });

  const richSigner = await ethers.provider.getSigner(richAccount);

  // Execute the swap
  await morpheusBuyAndBurn
    .connect(richSigner)
    .swapTitanXForDragonXAndMorpheusAndBurn(deadline);

  console.log("TitanX swapped for Morpheus and DragonX, and burned.");

  // Stop impersonating the rich account
  await network.provider.request({
    method: "hardhat_stopImpersonatingAccount",
    params: [richAccount],
  });

  // Log the TitanX balance after the swap
  let titanXBalanceAfter = await titanX.balanceOf(morpheusBuyAndBurnAddress);
  console.log(`TitanX balance after swap: ${titanXBalanceAfter}`);

  // Log the Morpheus and DragonX balances in the Morpheus/DragonX pool after swap
  const token0BalanceAfter = await token0.balanceOf(dragonXPool);
  const token1BalanceAfter = await token1.balanceOf(dragonXPool);
  console.log(
    `Morpheus/DragonX Pool: Morpheus balance after swap: ${ethers.formatUnits(
      token0BalanceAfter,
      18
    )}`
  );
  console.log(
    `Morpheus/DragonX Pool: DragonX balance after swap: ${ethers.formatUnits(
      token1BalanceAfter,
      18
    )}`
  );

  // Log the TitanX and DragonX balances in the TitanX/DragonX pool after swap
  const titanXBalanceInPoolAfter = await titanX.balanceOf(
    titanXDragonXPairContract
  );
  const dragonXBalanceInPoolAfter = await token1.balanceOf(
    titanXDragonXPairContract
  );
  console.log(
    `TitanX/DragonX Pool: TitanX balance after swap: ${ethers.formatUnits(
      titanXBalanceInPoolAfter,
      18
    )}`
  );
  console.log(
    `TitanX/DragonX Pool: DragonX balance after swap: ${ethers.formatUnits(
      dragonXBalanceInPoolAfter,
      18
    )}`
  );

  // Calculate and log the changes in balances for TitanX/DragonX pool
  const titanXChange = titanXBalanceInPoolAfter - titanXBalanceInPoolBefore;
  const dragonXChange = dragonXBalanceInPoolAfter - dragonXBalanceInPoolBefore;

  console.log(
    `TitanX/DragonX Pool: TitanX balance change: ${ethers.formatUnits(
      titanXChange,
      18
    )}`
  );
  console.log(
    `TitanX/DragonX Pool: DragonX balance change: ${ethers.formatUnits(
      dragonXChange,
      18
    )}`
  );
}

describe("Deployment and 14 Cycles of Minting/Claiming with Liquidity Check", function () {
  this.timeout(100000000); // Increase the timeout to 2 minutes

  let wallets;
  let morpheus;
  let morpheusMintingAddress;
  let morpheusBuyAndBurnAddress;
  const ethAmount = ethers.parseEther("1");
  const titanXAmount = ethers.parseUnits("14000000000", 18);
  const richAccount = "0xe5e0C13133782d967B002B3400E6Ebea5d9814C0";

  before(async function () {
    await forkEthereumMainnet();

    wallets = Array.from({ length: 10 }, () =>
      ethers.Wallet.createRandom().connect(ethers.provider)
    );

    await fundWallets(wallets, ethAmount, titanXAmount, richAccount);

    const contracts = await deployMorpheusContracts();
    morpheus = contracts.morpheus; // Store the morpheus contract
    morpheusMintingAddress = contracts.morpheusMintingAddress;
    morpheusBuyAndBurnAddress = contracts.morpheusBuyAndBurnAddress;
  });

  it("Should perform 14 cycles of minting, liquidity check after cycle 5, and claiming", async function () {
    const totalCycles = 14;
    const buyAndBurnIterations = 48; // Number of times buyAndBurn should be called per cycle

    for (let cycleId = 1; cycleId <= totalCycles; cycleId++) {
      console.log(`\n------ Cycle ${cycleId} ------`);

      await mintTokens(morpheusMintingAddress, wallets, cycleId);

      await checkAmountToClaim(morpheusMintingAddress, wallets, cycleId);

      if (cycleId === 5) {
        // After cycle 5, add liquidity to Morpheus/DragonX pool
        await addLiquidityToMorpheusDragonxPool(morpheusBuyAndBurnAddress);

        // Pass the morpheus contract to checkUniswapV3PairBalances
        await checkUniswapV3PairBalances(morpheus);
      }

      if (cycleId >= 6) {
        console.log(`Starting buy-and-burn iterations for cycle ${cycleId}...`);

        // Call buyAndBurn function 48 times every 30 minutes
        for (let i = 1; i <= buyAndBurnIterations; i++) {
          console.log(`Iteration ${i}: Calling buy and burn...`);

          await swapTitanXForDragonXAndMorpheusAndBurn(
            morpheusBuyAndBurnAddress,
            morpheus
          );

          console.log("Advancing time by 30 minutes...");
          await network.provider.send("evm_increaseTime", [30 * 60]); // 30 minutes
          await network.provider.send("evm_mine");
        }

        console.log(`Completed buy-and-burn iterations for cycle ${cycleId}.`);
      }

      // After the buy and burn process, claim the tokens
      await claimTokens(morpheusMintingAddress, wallets, cycleId);

      if (cycleId === 14) {
        const totalDays = 1; // Set to 180 days
        const buyAndBurnIterations = 48 * totalDays; // 180 days, 48 iterations per day (every 30 minutes)

        console.log(
          `Starting buy-and-burn process for a total of ${totalDays} days...`
        );

        for (let i = 1; i <= buyAndBurnIterations; i++) {
          console.log(`Iteration ${i}: Calling buy and burn...`);

          await swapTitanXForDragonXAndMorpheusAndBurn(
            morpheusBuyAndBurnAddress,
            morpheus
          );

          console.log("Advancing time by 30 minutes...");
          await network.provider.send("evm_increaseTime", [30 * 60]); // 30 minutes
          await network.provider.send("evm_mine");
        }

        console.log(`Completed buy-and-burn process for ${totalDays} days.`);

        // Call the burnFees function at the end of the process
        console.log("Calling burnFees to ensure fees are properly burned...");
        const morpheusBuyAndBurn = await ethers.getContractAt(
          "MorpheusBuyAndBurn",
          morpheusBuyAndBurnAddress
        );

        await morpheusBuyAndBurn.burnFees();
        console.log("burnFees function executed successfully.");
      }
    }
  });
});
