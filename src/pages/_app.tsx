import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import MainLayout from "./layouts/MainLayout";
import { ListingsProvider } from "../contexts/ListingProvider";
import { TokenProvider } from "@/contexts/TokenProvider";
import { ToastContainer } from "react-toastify";

const DynamicDiditProviderComponent = dynamic(
  () =>
    import("../components/DiditProvider").then(
      (mod) => mod.DiditProviderComponent
    ),
  { ssr: false }
);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main>
      <div>
        <DynamicDiditProviderComponent>
          <ListingsProvider>
            <TokenProvider>
              <MainLayout>
                <Component {...pageProps} />
                <ToastContainer />
              </MainLayout>
            </TokenProvider>
          </ListingsProvider>
        </DynamicDiditProviderComponent>
      </div>
    </main>
  );
}
