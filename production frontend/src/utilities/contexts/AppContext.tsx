import {
  createContext,
  useContext,
  ReactNode,
  useMemo,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useAccount, useBalance, useReadContract } from "wagmi";
import TokenABI from "../../abi/TokenABI.json";
import MorpheusMintingABI from "../../abi/MorpheusMintingABI.json";
import MorpheusBuyAndBurnABI from "../../abi/MorpheusBuyAndBurnABI.json";
import {
  buyAndBurnAddress,
  mintingAddress,
  moralisAPIKey,
  morpheusAddress,
  raffleAddress,
  titanXAddress,
} from "../constants";
import { formatUnits } from "viem";
import { Holder } from "../types";

export type AppContextType = {
  titanXPrice: number;
  morpheusPrice: number;

  topHolders: Holder[];

  currentCycle: number;
  currentRatio: number;

  startsAt: number;
  endsAt: number;

  morpheusTotalSupply: bigint;
  morpheusMinted: bigint;
  morpheusBurnt: bigint;
  titanXDeposited: bigint;
  dragonXBurnt: bigint;

  titanXBalanceOfBuyAndBurn: bigint;
  amountAllocated: bigint;
  dailyAllocation: bigint;
  lastBurnedIntervalStartTimestamp: bigint;

  titanXBalanceForRaffle: bigint;

  fetchTopHolders: () => void;
  refetchContractInfo: () => void;
};

const appContextDefaultValues: AppContextType = {
  titanXPrice: 0,
  morpheusPrice: 0,

  topHolders: [],

  currentCycle: 0,
  currentRatio: 0,

  startsAt: 0,
  endsAt: 0,

  morpheusTotalSupply: 0n,
  morpheusMinted: 0n,
  morpheusBurnt: 0n,
  titanXDeposited: 0n,
  dragonXBurnt: 0n,

  titanXBalanceOfBuyAndBurn: 0n,
  amountAllocated: 0n,
  dailyAllocation: 0n,
  lastBurnedIntervalStartTimestamp: 0n,

  titanXBalanceForRaffle: 0n,

  fetchTopHolders: () => {},
  refetchContractInfo: () => {},
};

export const AppContext = createContext<AppContextType>(
  appContextDefaultValues
);

export const useAppContext = () => {
  return useContext(AppContext);
};

type Props = {
  children: ReactNode;
};

export const AppProvider = ({ children }: Props) => {
  const [titanXPrice, setTitanXPrice] = useState(0);
  const [morpheusPrice, setMorpheusPrice] = useState(0);
  const [topHolders, setTopHolders] = useState<Holder[]>([]);

  const { chainId } = useAccount();

  const fetchTitanXPrice = useCallback(async () => {
    try {
      const rawResponse = await fetch(
        `https://api.geckoterminal.com/api/v2/simple/networks/eth/token_price/${titanXAddress}`
      );
      const response = await rawResponse.json();
      const price = Number(
        response.data.attributes.token_prices[titanXAddress.toLowerCase()]
      );

      setTitanXPrice(price || 0);
    } catch (e) {
      console.log(e);
    }
  }, [titanXAddress]);

  useEffect(() => {
    fetchTitanXPrice();
  }, [fetchTitanXPrice]);

  const fetchMorpheusPrice = useCallback(async () => {
    try {
      const rawResponse = await fetch(
        `https://api.geckoterminal.com/api/v2/simple/networks/eth/token_price/${morpheusAddress}`
      );
      const response = await rawResponse.json();
      const price = Number(
        response.data.attributes.token_prices[morpheusAddress.toLowerCase()]
      );

      setMorpheusPrice(price || 0);
    } catch (e) {
      console.log(e);
    }
  }, [morpheusAddress]);

  useEffect(() => {
    fetchMorpheusPrice();
  }, [fetchMorpheusPrice]);

  const fetchTopHolders = useCallback(async () => {
    try {
      const rawResponse = await fetch(
        `https://deep-index.moralis.io/api/v2.2/erc20/${morpheusAddress}/owners?chain=${
          chainId == 1 ? "eth" : "sepolia"
        }&order=DESC`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "X-API-Key": moralisAPIKey,
          },
        }
      );

      const response = await rawResponse.json();

      const holders: Holder[] = response.result.map(
        (h: { owner_address: string; balance: string }) => ({
          address: h.owner_address,
          amount: BigInt(h.balance),
        })
      );

      setTopHolders(holders);
    } catch (e) {
      console.log(e);
    }
  }, [morpheusAddress, chainId]);

  useEffect(() => {
    fetchTopHolders();
  }, [fetchTopHolders]);

  const currentCycleResult = useReadContract({
    abi: MorpheusMintingABI,
    address: mintingAddress,
    functionName: "getCurrentMintCycle",
    query: { refetchInterval: 60000 },
  });
  const currentCycle = Number(
    Array.isArray(currentCycleResult.data)
      ? ((currentCycleResult.data[0] || 0n) as bigint)
      : 0n
  );
  const startsAt = Number(
    Array.isArray(currentCycleResult.data)
      ? ((currentCycleResult.data[1] || 0n) as bigint)
      : 0n
  );
  const endsAt = Number(
    Array.isArray(currentCycleResult.data)
      ? ((currentCycleResult.data[2] || 0n) as bigint)
      : 0n
  );

  const currentRatioResult = useReadContract({
    abi: MorpheusMintingABI,
    address: mintingAddress,
    functionName: "getRatioForCycle",
    args: [currentCycle],
    query: { refetchInterval: 60000 },
  });
  const currentRatio =
    currentCycle == 0
      ? 0
      : Number(formatUnits((currentRatioResult.data || 0n) as bigint, 18));

  const morpheusMintedResult = useReadContract({
    abi: MorpheusMintingABI,
    address: mintingAddress,
    functionName: "totalMorpheusMinted",
    query: { refetchInterval: 60000 },
  });
  const morpheusMinted = (morpheusMintedResult.data || 0n) as bigint;

  const morpheusBurntResult = useReadContract({
    abi: MorpheusBuyAndBurnABI,
    address: buyAndBurnAddress,
    functionName: "totalMorpheusBurnt",
    query: { refetchInterval: 60000 },
  });
  const morpheusBurnt = (morpheusBurntResult.data || 0n) as bigint;

  const titanXDepositedResult = useReadContract({
    abi: MorpheusMintingABI,
    address: mintingAddress,
    functionName: "totalTitanXDeposited",
    query: { refetchInterval: 60000 },
  });
  const titanXDeposited = (titanXDepositedResult.data || 0n) as bigint;

  const dragonXBurntResult = useReadContract({
    abi: MorpheusBuyAndBurnABI,
    address: buyAndBurnAddress,
    functionName: "totalDragonxBurnt",
    query: { refetchInterval: 60000 },
  });
  const dragonXBurnt = (dragonXBurntResult.data || 0n) as bigint;

  const morpheusTotalSupplyResult = useReadContract({
    abi: TokenABI,
    address: morpheusAddress,
    functionName: "totalSupply",
    query: { refetchInterval: 60000 },
  });
  const morpheusTotalSupply = (morpheusTotalSupplyResult.data || 0n) as bigint;

  const titanXBalanceOfBuyAndBurnResult = useBalance({
    address: buyAndBurnAddress,
    token: titanXAddress,
    query: { refetchInterval: 60000 },
  });
  const titanXBalanceOfBuyAndBurn = (titanXBalanceOfBuyAndBurnResult.data
    ?.value || 0n) as bigint;

  const lastIntervalNumberResult = useReadContract({
    abi: MorpheusBuyAndBurnABI,
    address: buyAndBurnAddress,
    functionName: "lastIntervalNumber",
    query: { refetchInterval: 60000 },
  });
  const lastIntervalNumber = (lastIntervalNumberResult.data || 0n) as bigint;

  const intervalsResult = useReadContract({
    abi: MorpheusBuyAndBurnABI,
    address: buyAndBurnAddress,
    functionName: "intervals",
    args: [Number(lastIntervalNumber)], //
    query: { refetchInterval: 60000 },
  });
  const amountAllocated = Array.isArray(intervalsResult.data)
    ? ((intervalsResult.data[0] || 0n) as bigint)
    : 0n;

  const dailyAllocationResult = useReadContract({
    abi: MorpheusBuyAndBurnABI,
    address: buyAndBurnAddress,
    functionName: "DAILY_ALLOCATION",
    query: { refetchInterval: 60000 },
  });
  const dailyAllocation = (dailyAllocationResult.data || 0n) as bigint;

  const lastBurnedIntervalStartTimestampResult = useReadContract({
    abi: MorpheusBuyAndBurnABI,
    address: buyAndBurnAddress,
    functionName: "lastBurnedIntervalStartTimestamp",
    query: { refetchInterval: 60000 },
  });
  const lastBurnedIntervalStartTimestamp =
    (lastBurnedIntervalStartTimestampResult.data || 0n) as bigint;

  const titanXBalanceForRaffleResult = useBalance({
    address: raffleAddress,
    token: titanXAddress,
    query: { refetchInterval: 60000 },
  });
  const titanXBalanceForRaffle = (titanXBalanceForRaffleResult.data?.value ||
    0n) as bigint;

  const refetchContractInfo = () => {
    fetchTitanXPrice();
    fetchMorpheusPrice();
    fetchTopHolders();

    currentCycleResult.refetch();
    currentRatioResult.refetch();
    morpheusTotalSupplyResult.refetch();
    morpheusMintedResult.refetch();
    morpheusBurntResult.refetch();
    titanXDepositedResult.refetch();
    dragonXBurntResult.refetch();
    titanXBalanceOfBuyAndBurnResult.refetch();
    lastIntervalNumberResult.refetch();
    intervalsResult.refetch();
    dailyAllocationResult.refetch();
    lastBurnedIntervalStartTimestampResult.refetch();

    titanXBalanceForRaffleResult.refetch();
  };

  useEffect(() => {
    const interval = window.setInterval(fetchTopHolders, 300000);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  const value = useMemo(
    (): AppContextType => ({
      titanXPrice,
      morpheusPrice,

      topHolders,

      currentCycle,
      currentRatio,
      startsAt,
      endsAt,

      morpheusTotalSupply,
      morpheusMinted,
      morpheusBurnt,
      titanXDeposited,
      dragonXBurnt,

      titanXBalanceOfBuyAndBurn,
      amountAllocated,
      dailyAllocation,
      lastBurnedIntervalStartTimestamp,

      titanXBalanceForRaffle,

      fetchTopHolders,
      refetchContractInfo,
    }),
    [
      titanXPrice,
      morpheusPrice,

      topHolders,

      currentCycle,
      currentRatio,
      startsAt,
      endsAt,

      morpheusTotalSupply,
      morpheusMinted,
      morpheusBurnt,
      titanXDeposited,
      dragonXBurnt,

      titanXBalanceOfBuyAndBurn,
      amountAllocated,
      dailyAllocation,
      lastBurnedIntervalStartTimestamp,

      titanXBalanceForRaffle,

      fetchTopHolders,
      refetchContractInfo,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
