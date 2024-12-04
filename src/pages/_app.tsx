import Layout from "@/components/Layout";
import { getAuthStatus } from "@/features/auth/api/apiRoutes";
import { authKeys } from "@/features/auth/api/queries/queryKeys";
import { getUser } from "@/features/user/api";
import { userKeys } from "@/features/user/api/queries/queryKeys";
import GlobalStyles from "@/styles/GlobalStyles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
  dehydrate,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppContext, AppProps } from "next/app";
import App from "next/app";
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

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={pageProps.dehydratedState}>
        <Layout>
          <main className={ibmPlexSansKR.className}>
            <GlobalStyles />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Component {...pageProps} class />
            </LocalizationProvider>
          </main>
        </Layout>
        <ReactQueryDevtools initialIsOpen={false} />
      </HydrationBoundary>
    </QueryClientProvider>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const { ctx } = appContext;
  const appProps = await App.getInitialProps(appContext);

  if (ctx.req) {
    const cookies = ctx.req.headers.cookie || "";
    const cookiesObject = cookies.split(";").reduce(
      (acc, cookie) => {
        const [key, value] = cookie.split("=").map((v) => v.trim());
        acc[key] = value;
        return acc;
      },
      {} as Record<string, string>
    );

    const hasAccessToken = !!cookiesObject["accessToken"];
    const hasRefreshToken = !!cookiesObject["refreshToken"];

    if (hasAccessToken && hasRefreshToken) {
      await queryClient.prefetchQuery({
        queryKey: authKeys.authStatus.queryKey,
        queryFn: () => getAuthStatus(cookiesObject),
        gcTime: Infinity,
        staleTime: Infinity,
      });

      await queryClient.prefetchQuery({
        queryKey: userKeys.userInfo.queryKey,
        queryFn: () => getUser(cookiesObject),
        gcTime: Infinity,
        staleTime: Infinity,
      });
    }
  }

  return {
    ...appProps,
    pageProps: {
      ...appProps.pageProps,
      dehydratedState: dehydrate(queryClient),
    },
  };
};
