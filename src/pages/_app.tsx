import "@/styles/globals.css";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import MainLayout from "./layouts/MainLayout";

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
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        </DynamicDiditProviderComponent>
      </div>
    </main>
  );
}
