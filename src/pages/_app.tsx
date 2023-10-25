import "@/styles/globals.css";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import MainLayout from "./layouts/MainLayout";
import { ListingsProvider } from "../contexts/ListingProvider";

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
        <ListingsProvider>
          <DynamicDiditProviderComponent>
            <MainLayout>
              <Component {...pageProps} />
            </MainLayout>
          </DynamicDiditProviderComponent>
        </ListingsProvider>
      </div>
    </main>
  );
}
