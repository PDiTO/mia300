import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { mainnet } from "viem/chains";

const walletConnectProjectId = "7b89f04f8986abd750f74d7668f82275";

// Transports must be set for each chain

const config = getDefaultConfig({
  appName: "Demo",
  projectId: walletConnectProjectId,
  chains: [mainnet],
  ssr: true,
});

export { config };
