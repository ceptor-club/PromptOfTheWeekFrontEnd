import '../styles/globals.css';
import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/react';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { goerli, sepolia } from 'wagmi/chains';
import Layout from '../components/Layout';
// import Meta from "../components/Meta";

/* import { Oswald } from '@next/font/google';

const oswald = Oswald({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-oswald',
}); */

const chains = [goerli];
// const chains = [arbitrum, mainnet, polygon, goerli];
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;
// Wagmi client
const { provider } = configureChains(chains, [
  walletConnectProvider({ projectId: projectId }),
]);
const wagmiClient = createClient({
  autoConnect: false,
  connectors: modalConnectors({ appName: 'web3Modal', chains }),
  provider,
  version: '2',
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
      {/* <Meta /> */}

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
