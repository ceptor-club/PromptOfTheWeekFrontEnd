import "../styles/globals.css";
import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { sepolia, goerli } from "wagmi/chains";
import Layout from "../components/Layout";
import SocketProvider from "../utils/socketContext";

const chains = [sepolia, goerli];
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;
const { provider } = configureChains(chains, [
  walletConnectProvider({ projectId: projectId }),
]);
const wagmiClient = createClient({
  autoConnect: false,
  connectors: modalConnectors({ appName: "web3Modal", chains }),
  provider,
  version: "2",
});

const ethereumClient = new EthereumClient(wagmiClient, chains);

function MyApp({ Component, pageProps }) {
  return (
    <>
      <SocketProvider>
        <WagmiConfig client={wagmiClient}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </WagmiConfig>
        <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
      </SocketProvider>
    </>
  );
}

export default MyApp;
