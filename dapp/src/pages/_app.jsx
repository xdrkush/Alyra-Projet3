import { useEffect, useState } from "react";

// Voting Contract Provider
import { VotingContractProvider } from "@/providers/VotingContractProvider";

// Chakra UI provider
import { ChakraProvider } from "@chakra-ui/react";
// layout
import MainLayout from "@/layouts/MainLayout";

// Rainbowkit
import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultWallets, RainbowKitProvider, lightTheme,} from "@rainbow-me/rainbowkit";

// Wagmi provider
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, hardhat } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

// wagmi config
const { chains, publicClient } = configureChains(
    [mainnet, polygon, optimism, arbitrum, hardhat],
    [publicProvider()]
);

const { connectors } = getDefaultWallets({
    appName: "My RainbowKit App",
    projectId: "YOUR_PROJECT_ID",
    chains,
});

const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
});

export default function App({ Component, pageProps }) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    return (
        <ChakraProvider>
            <WagmiConfig config={wagmiConfig}>
                <RainbowKitProvider
                    chains={chains}
                    theme={{
                        lightMode: lightTheme({
                            accentColor: "#2b6cb0",
                            overlayBlur: "small",
                            borderRadius: "large",
                        }),
                    }}
                >
                    {mounted && (
                        <VotingContractProvider>
                            <MainLayout>
                                <Component {...pageProps} />
                            </MainLayout>
                        </VotingContractProvider>
                    )}
                </RainbowKitProvider>
            </WagmiConfig>
        </ChakraProvider>
    );
}