import GlobalStyles from "@/styles/GlobalStyles";
import { AppCacheProvider } from "@mui/material-nextjs/v13-pagesRouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },

  // TODO : api 환경 설정 끝나고 toast 컴포넌트와 함께 적용하기
  // queryCache: new QueryCache({
  //   onError: (_, query) => {
  //     if (query.meta?.toastErrorMessage) {
  //       toast.error(query.meta.toastErrorMessage as string);
  //       return;
  //     }
  //   },
  // }),
  // mutationCache: new MutationCache({
  //   onSuccess: (_, __, ___, mutation) => {
  //     if (mutation.meta?.toastSuccessMessage) {
  //       toast.success(mutation.meta.toastSuccessMessage as string);
  //       return;
  //     }
  //   },
  //   onError: (_, __, ___, mutation) => {
  //     if (mutation.meta?.toastErrorMessage) {
  //       toast.error(mutation.meta.toastErrorMessage as string);
  //       return;
  //     }
  //   },
  // }),
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AppCacheProvider>
        <main className={ibmPlexSansKR.className}>
          <GlobalStyles />
          <Component {...pageProps} class />
        </main>
      </AppCacheProvider>
    </QueryClientProvider>
  );
}
