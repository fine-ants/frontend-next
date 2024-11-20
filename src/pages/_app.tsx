import Layout from "@/components/Layout";
import { getAuthStatus } from "@/features/auth/api/apiRoutes";
import { authKeys } from "@/features/auth/api/queries/queryKeys";
import GlobalStyles from "@/styles/GlobalStyles";
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
  dehydrate,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppContext, AppInitialProps, AppProps } from "next/app";
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
  // TODO : api 환경 설정 끝나고 toast 컴포넌트와 함께 CUD 피드백 적용하기
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Layout>
          <main className={ibmPlexSansKR.className}>
            <GlobalStyles />
            <Component {...pageProps} class />
          </main>
        </Layout>
        <ReactQueryDevtools initialIsOpen={false} />
      </HydrationBoundary>
    </QueryClientProvider>
  );
}

App.getInitialProps = async (
  appContext: AppContext
): Promise<AppInitialProps> => {
  const { ctx, Component } = appContext;

  const cookies = ctx.req?.headers.cookie || "";
  const cookiesObject = cookies.split(";").reduce(
    (acc, cookie) => {
      const [key, value] = cookie.split("=").map((v) => v.trim());
      acc[key] = value;
      return acc;
    },
    {} as Record<string, string>
  );

  await queryClient.prefetchQuery({
    queryKey: authKeys.auth.queryKey,
    queryFn: () => getAuthStatus(cookiesObject),
  });

  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return {
    pageProps,
  };
};
