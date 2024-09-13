import GlobalStyles from "@/styles/GlobalStyles";
import { AppCacheProvider } from "@mui/material-nextjs/v13-pagesRouter";
import type { AppProps } from "next/app";
import localFont from "next/font/local";

const ibmPlexSansKR = localFont({
  src: [
    {
      path: "../../public/fonts/IBMPlexSansKR-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/IBMPlexSansKR-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/IBMPlexSansKR-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/IBMPlexSansKR-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppCacheProvider>
      <main className={ibmPlexSansKR.className}>
        <GlobalStyles />
        <Component {...pageProps} class />
      </main>
    </AppCacheProvider>
  );
}
