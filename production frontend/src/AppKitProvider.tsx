import { createAppKit } from "@reown/appkit/react";

import { WagmiProvider } from "wagmi";
import { AppKitNetwork, sepolia, mainnet } from "@reown/appkit/networks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { reownProjectId } from "./utilities/constants";
import { ReactNode } from "react";

const queryClient = new QueryClient();

const projectId = reownProjectId;

const metadata = {
  name: "Morpheus",
  description: "Morpheus",
  url: "https://morpheus.com",
  icons: ["https://avatars.githubusercontent.com/u/179229932"],
};

const networks: [AppKitNetwork, ...AppKitNetwork[]] = [sepolia, mainnet];

const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: true,
});

createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata,
  features: {
    analytics: false,
    email: false,
    socials: false,
    swaps: false,
  },
  themeMode: "dark",
  featuredWalletIds: [
    "c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96",
    "18388be9ac2d02726dbac9777c96efaac06d744b2f6d580fccdd4127a6d01fd1",
    "dd43441a6368ec9046540c46c5fdc58f79926d17ce61a176444568ca7c970dcd",
  ],
});

export function AppKitProvider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
