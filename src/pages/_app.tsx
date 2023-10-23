import "@/styles/globals.css";
import type { AppProps } from "next/app";
import MainLayout from "./layouts/MainLayout";
import DiditProvider from "./components/DiditProvider";
import Head from "next/head"; // Import the Head component

export default function App({ Component, pageProps }: AppProps) {
  return (
    // <DiditProvider>
    <MainLayout>
      <Head>
        <title>Liquid</title> {/* Set the title of your application */}
      </Head>
      <Component {...pageProps} />
    </MainLayout>
    // </DiditProvider>
  );
}
