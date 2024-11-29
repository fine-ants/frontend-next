import Routes from "@/constants/Routes";
import { BASE_API_URL, CLIENT_URL } from "@/constants/config";
import { HTTPSTATUS } from "./types";

type FetcherOptions = RequestInit & {
  headers?: HeadersInit;
  cookies?: Record<string, string>;
};

type FetcherResponse<T> = {
  data: T;
  cookies: {
    accessToken: string | undefined;
    refreshToken: string | undefined;
  };
};

const getCookies = (response: Response) => {
  const setCookieHeader = response.headers.get("set-cookie");

  const cookies = setCookieHeader?.split(", ") || [];

  const accessToken = cookies.find((cookie) =>
    cookie.startsWith("accessToken")
  );
  const refreshToken = cookies.find((cookie) =>
    cookie.startsWith("refreshToken")
  );

  return { accessToken, refreshToken };
};

const handleError = async (response: Response) => {
  if (
    response.status === HTTPSTATUS.unAuthorized &&
    typeof window !== "undefined"
  ) {
    localStorage.removeItem("user");
    window.location.href = Routes.SIGNIN;
  }
  throw new Error(`HTTP error! status: ${response.status}`);
};

// 쿠키를 헤더에 추가
const addCookiesToHeaders = (
  headers: HeadersInit = {},
  cookies?: Record<string, string>
): HeadersInit => {
  if (!cookies) return headers;

  const cookieString = Object.entries(cookies)
    .map(([key, value]) => `${key}=${value}`)
    .join("; ");

  return {
    ...headers,
    Cookie: cookieString,
  };
};

// 데이터를 받지 않는 요청 (GET)
const requestWithoutData = async <T>(
  url: string,
  method: string,
  options: FetcherOptions
): Promise<FetcherResponse<T>> => {
  const fetchOptions: FetcherOptions = {
    ...options,
    method,
    headers: addCookiesToHeaders(
      {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      options.cookies
    ),
  };
  const response = await fetch(url, fetchOptions);

  if (!response.ok) {
    await handleError(response);
  }

  const json = await response.json();

  return { data: json, cookies: getCookies(response) };
};

// 데이터를 받는 요청 (POST, PUT, PATCH)
const requestWithData = async <T>(
  url: string,
  method: string,
  data?: Record<string, unknown> | FormData,
  options?: FetcherOptions
): Promise<FetcherResponse<T>> => {
  const fetchOptions: FetcherOptions = {
    ...options,
    method,
    headers: addCookiesToHeaders(
      {
        "Content-Type": "application/json",
        ...(options?.headers || {}),
      },
      options?.cookies
    ),
    ...(data ? { body: JSON.stringify(data) } : {}),
  };

  const response = await fetch(url, fetchOptions);

  if (!response.ok) {
    await handleError(response);
  }

  const json = await response.json();

  return { data: json, cookies: getCookies(response) };
};

const createFetcher = (
  baseURL: string,
  defaultOptions: FetcherOptions = {}
) => {
  return {
    get: <T>(
      url: string,
      options?: FetcherOptions
    ): Promise<FetcherResponse<T>> =>
      requestWithoutData<T>(`${baseURL}${url}`, "GET", {
        ...defaultOptions,
        ...options,
      }),
    delete: <T>(
      url: string,
      data?: Record<string, unknown> | FormData,
      options?: FetcherOptions
    ): Promise<FetcherResponse<T>> =>
      requestWithData<T>(`${baseURL}${url}`, "DELETE", data, {
        ...defaultOptions,
        ...options,
      }),
    post: <T>(
      url: string,
      data?: Record<string, unknown> | FormData,
      options?: FetcherOptions
    ): Promise<FetcherResponse<T>> =>
      requestWithData<T>(`${baseURL}${url}`, "POST", data, {
        ...defaultOptions,
        ...options,
      }),
    put: <T>(
      url: string,
      data: Record<string, unknown> | FormData,
      options?: FetcherOptions
    ): Promise<FetcherResponse<T>> =>
      requestWithData<T>(`${baseURL}${url}`, "PUT", data, {
        ...defaultOptions,
        ...options,
      }),
    patch: <T>(
      url: string,
      data: Record<string, unknown> | FormData,
      options?: FetcherOptions
    ): Promise<FetcherResponse<T>> =>
      requestWithData<T>(`${baseURL}${url}`, "PATCH", data, {
        ...defaultOptions,
        ...options,
      }),
  };
};

const fetcherBaseURL =
  process.env.NODE_ENV === "development"
    ? `${CLIENT_URL}/api/proxy`
    : `${BASE_API_URL}/api`;

export const fetcher = createFetcher(fetcherBaseURL, {
  credentials: "include",
});

export const proxyFetcher = createFetcher(`${BASE_API_URL}/api`, {
  credentials: "include",
});

export const clientFetcher = createFetcher(`${CLIENT_URL}/api`, {
  credentials: "include",
});

export const fetcherWithoutCredentials = createFetcher(`${BASE_API_URL}/api`, {
  credentials: "omit",
});
