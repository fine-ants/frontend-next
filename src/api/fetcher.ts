import Routes from "@/constants/Routes";
import { BASE_API_URL, CLIENT_URL } from "@/constants/config";
import { HTTPSTATUS } from "./types";

type FetcherOptions = RequestInit & {
  next?: {
    revalidate?: number;
    noStore?: boolean;
  };
};

type FetcherResponse<T> = {
  data: T;
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

// 데이터를 받지 않는 요청 (GET, DELETE)
const requestWithoutData = async <T>(
  url: string,
  method: string,
  options: FetcherOptions
): Promise<FetcherResponse<T>> => {
  const fetchOptions: FetcherOptions = {
    ...options,
    method,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  };

  const response = await fetch(url, fetchOptions);

  if (!response.ok) {
    await handleError(response);
  }

  const json = await response.json();
  return { data: json };
};

// 데이터를 받는 요청 (POST, PUT, PATCH)
const requestWithData = async <T>(
  url: string,
  method: string,
  data?: {}, // data가 선택적이도록 수정
  options?: FetcherOptions
): Promise<FetcherResponse<T>> => {
  const fetchOptions: FetcherOptions = {
    ...options,
    method,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
    ...(data ? { body: JSON.stringify(data) } : {}), // data가 있을 때만 body 추가
  };

  const response = await fetch(url, fetchOptions);

  if (!response.ok) {
    await handleError(response);
  }

  const json = await response.json();
  return { data: json };
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
      options?: FetcherOptions
    ): Promise<FetcherResponse<T>> =>
      requestWithoutData<T>(`${baseURL}${url}`, "DELETE", {
        ...defaultOptions,
        ...options,
      }),
    post: <T>(
      url: string,
      data?: {}, // data를 선택적으로 받도록 수정
      options?: FetcherOptions
    ): Promise<FetcherResponse<T>> =>
      requestWithData<T>(`${baseURL}${url}`, "POST", data, {
        ...defaultOptions,
        ...options,
      }),
    put: <T>(
      url: string,
      data: {},
      options?: FetcherOptions
    ): Promise<FetcherResponse<T>> =>
      requestWithData<T>(`${baseURL}${url}`, "PUT", data, {
        ...defaultOptions,
        ...options,
      }),
    patch: <T>(
      url: string,
      data: {},
      options?: FetcherOptions
    ): Promise<FetcherResponse<T>> =>
      requestWithData<T>(`${baseURL}${url}`, "PATCH", data, {
        ...defaultOptions,
        ...options,
      }),
  };
};

export const fetcher = createFetcher(`${BASE_API_URL}/api`, {
  headers: { "Content-Type": "application/json" },
  credentials: "include",
});

export const fetcherAPIRoutes = createFetcher(`${CLIENT_URL}/api`, {
  headers: { "Content-Type": "application/json" },
  credentials: "include",
});

export const fetcherWithoutCredentials = createFetcher(`${BASE_API_URL}/api`, {
  headers: { "Content-Type": "application/json" },
  credentials: "omit",
});
