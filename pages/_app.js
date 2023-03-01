import "../styles/globals.css";
import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { goerli } from "wagmi/chains";
import Layout from "../components/Layout";

const chains = [goerli];
// const chains = [arbitrum, mainnet, polygon, goerli];
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;
// Wagmi client
const { provider } = configureChains(chains, [
  walletConnectProvider({ projectId: projectId }),
]);
const wagmiClient = createClient({
  autoConnect: false,
  connectors: modalConnectors({ appName: "web3Modal", chains }),
  provider,
});

// Web3Modal Ethereum Client
const ethereumClient = new EthereumClient(wagmiClient, chains);

// const modalConfig = {
//   theme: "dark",
//   accentColor: "default",
//   ethereum: {

//   }

function MyApp({ Component, pageProps }) {
  return (
    <>
      <WagmiConfig client={wagmiClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </WagmiConfig>

      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  );
}

export default MyApp;
