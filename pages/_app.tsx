import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

import Login from "../components/Login";
import Sidebar from "../components/layout/Sidebar";
import Widgets from "../components/layout/Widgets";
import { AuthModalProvider } from "../utils/modalContext";

import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  if (!pageProps.session && pageProps.providers) {
    return <Login providers={pageProps.providers} />;
  }

  return (
    <SessionProvider session={pageProps.session}>
      <AuthModalProvider>
        <main className="bg-black min-h-screen flex max-w-[1500px] mx-auto">
          <Sidebar />
          <Component {...pageProps} />
          <Widgets
            trendingResults={pageProps.trendingResults}
            followResults={pageProps.followResults}
          />
        </main>
      </AuthModalProvider>
    </SessionProvider>
  );
}

export default MyApp;
