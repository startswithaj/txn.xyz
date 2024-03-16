import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';
import GithubCorner from 'react-github-corner';
import { ToastContainer } from 'react-toastify';
// import { configureChains, createConfig, http, mainnet, WagmiConfig, WagmiProvider } from 'wagmi';
// import { publicProvider } from 'wagmi/providers/public';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import '../styles/globals.css';
import styles from '../styles/Home.module.css';

import Script from 'next/script';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
// import { arbitrum, bsc, gnosis, optimism, polygon } from 'viem/chains';
import { z } from 'zod';
import { SEO } from '../src/frontend/components/SEO';
import { gtag } from '../src/frontend/utils/analytics/gtag';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { http } from 'viem';
import { mainnet } from 'viem/chains';
import { WagmiProvider } from 'wagmi';

// const bscChain: Chain = {
//   id: 56,
//   name: 'Binance Smart Chain',
//   network: 'bsc',
//   nativeCurrency: {
//     decimals: 18,
//     name: 'BNB',
//     symbol: 'BNB',
//   },
//   rpcUrls: {
//     default: 'https://bscrpc.com',
//   },
//   blockExplorers: {
//     default: { name: 'BSCScan', url: 'https://bscscan.com/' },
//   },
//   testnet: false,
// };
// const gnosisChain: Chain = {
//   id: 100,
//   name: 'Gnosis Chain',
//   network: 'gnosis',
//   nativeCurrency: {
//     decimals: 18,
//     name: 'XDAI',
//     symbol: 'XDAI',
//   },
//   rpcUrls: {
//     default: 'https://rpc.ankr.com/gnosis',
//   },
//   blockExplorers: {
//     default: { name: 'GnosisScan', url: 'https://gnosisscan.io/' },
//   },
//   testnet: false,
// };

const walletConnectProjectId = z
  .string()
  .parse(process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID);

// const { chains, publicClient } = configureChains(
//   [mainnet, polygon, optimism, arbitrum, bsc, gnosis],
//   [publicProvider()],
// );

// const { connectors } = getDefaultWallets({
//   appName: 'txn.xyz',
//   projectId: walletConnectProjectId,
//   chains,
// });

// const wagmiConfig = createConfig({
//   autoConnect: true,
//   connectors,
//   publicClient,
// });

const config = getDefaultConfig({
  appName: 'txn.xyz',
  projectId: walletConnectProjectId,
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(),
  },
});
const queryClient = new QueryClient();

// const queryClient = new QueryClient();

// const { chains, provider, webSocketProvider } = configureChains(
//   [
//     chain.mainnet,
//     chain.polygon,
//     chain.optimism,
//     gnosisChain,
//     bscChain,
//     // chain.arbitrum,
//     ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true'
//       ? [chain.goerli, chain.kovan, chain.rinkeby, chain.ropsten]
//       : []),
//   ],
//   [
//     alchemyProvider({
//       // This is Alchemy's default API key.
//       // You can get your own at https://dashboard.alchemyapi.io
//       apiKey: '_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC',
//     }),
//     publicProvider(),
//   ],
// );

// const { connectors } = getDefaultWallets({
//   appName: 'txn.xyz',
//   chains,
// });

// const wagmiClient = createClient({
//   autoConnect: true,
//   connectors,
//   provider,
//   webSocketProvider,
// });

const TopNav = styled.header`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffde59;
  color: rgb(72, 72, 72);
  font-weight: bold
  font-size: 22px;
`;
function MyApp({ Component, pageProps }: AppProps) {
  gtag.useGtag();
  return (
    <>
      <SEO />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_G_TAG_ID}`}
      />
      <Script
        id="gtag-fn"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${process.env.NEXT_PUBLIC_G_TAG_ID}', {
          page_path: window.location.pathname,
        });
      `,
        }}
      />
      <a
        href="https://e95799bb.sibforms.com/serve/MUIEAFEU_lFBb8Ks-vTDFBBPIK6BGIhOKSWtTVyNwsITdZs4EmCMVfr08CT2sSnJf6rjE2LYXlisFNgaPrZG3ekl58RQ7kuks2aMYjMtUGLoA13omLnWl9q1aQiGn4eqbTs8L3bxPdTP_BQAEBohfmSYuTunj5cOhBvBt7wak1b_nxcguy5ZKrTD_NssmH3RODhTSKBScGgthPHX"
        target="_blank"
        rel="noreferrer"
      >
        <TopNav>Subscribe</TopNav>
      </a>

      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider coolMode>
            <GithubCorner
              href="https://github.com/dawsbot/txn.xyz"
              size={'15vw'}
              bannerColor="#FFDE59"
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
        </QueryClientProvider>
      </WagmiProvider>
    </>
  );
}

export default MyApp;
