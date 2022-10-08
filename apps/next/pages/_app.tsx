import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';
import GithubCorner from 'react-github-corner';
import { ToastContainer } from 'react-toastify';
import {
  Chain,
  chain,
  configureChains,
  createClient,
  WagmiConfig,
} from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import '../styles/globals.css';
import styles from '../styles/Home.module.css';

import 'react-toastify/dist/ReactToastify.css';
import { SEO } from '../src/frontend/components/SEO';

const gnosisChain: Chain = {
  id: 100,
  name: 'Gnosis Chain',
  network: 'gnosis',
  nativeCurrency: {
    decimals: 18,
    name: 'XDAI',
    symbol: 'XDAI',
  },
  rpcUrls: {
    default: 'https://rpc.ankr.com/gnosis',
  },
  blockExplorers: {
    default: { name: 'GnosisScan', url: 'https://gnosisscan.io/' },
  },
  testnet: false,
};

const { chains, provider, webSocketProvider } = configureChains(
  [
    chain.mainnet,
    chain.polygon,
    chain.optimism,
    gnosisChain,
    // chain.arbitrum,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true'
      ? [chain.goerli, chain.kovan, chain.rinkeby, chain.ropsten]
      : []),
  ],
  [
    alchemyProvider({
      // This is Alchemy's default API key.
      // You can get your own at https://dashboard.alchemyapi.io
      apiKey: '_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC',
    }),
    publicProvider(),
  ],
);

const { connectors } = getDefaultWallets({
  appName: 'txn.xyz',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <SEO />
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <GithubCorner
            href="https://github.com/dawsbot/txn.xyz"
            size={'15vw'}
            bannerColor="#c400ec"
          />
          <Component {...pageProps} />

          <footer className={styles.footer}>
            <a
              href="https://twitter.com/dawsonbotsford"
              target="_blank"
              rel="noopener noreferrer"
            >
              Made with ❤️ by daws
            </a>
          </footer>
          <ToastContainer />
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
}

export default MyApp;