/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { SessionProvider } from "next-auth/react"
import NextNprogress from 'nextjs-progressbar';
import '../styles/global.scss';

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url) => {
      // Gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <SessionProvider session={pageProps.session}>
      <NextNprogress
        color="#6B37FF"
        startPosition={0.3}
        stopDelayMs={200}
        height="1"
        options={{ easing: 'ease', speed: 500, showSpinner: false }}
      />
      <Component {...pageProps} />
    </SessionProvider>
    
  );
}
