import React from "react";
import { MoralisProvider } from "react-moralis";
import { Toaster } from 'react-hot-toast';

import { Layout } from '../components';
import '../styles/globals.css';
import { StateContext } from '../context/StateContext';
import { ChakraProvider } from "@chakra-ui/react";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider resetCSS={false}>
      <StateContext>
        <MoralisProvider serverUrl={process.env.NEXT_PUBLIC_PARSE_SERVER_URL ??  ''} appId={process.env.NEXT_PUBLIC_PARSE_SERVER_APPLICATION_ID ?? ''}>
            <Layout>
              <Toaster />
              <Component {...pageProps} />
            </Layout>
        </MoralisProvider>
      </StateContext>
    </ChakraProvider>
  )
}

export default MyApp
