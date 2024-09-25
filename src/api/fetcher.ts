import Routes from "@/constants/Routes";
import { BASE_API_URL } from "@/constants/config";
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
  if (response.status === HTTPSTATUS.unAuthorized) {
    localStorage.removeItem("user");
    window.location.href = Routes.SIGNIN;
  }
  throw new Error(`HTTP error! status: ${response.status}`);
};

const createFetcher = (
  baseURL: string,
  defaultOptions: FetcherOptions = {}
) => {
  const request = async <T>(
    url: string,
    method: string,
    data?: any,
    options: FetcherOptions = {}
  ): Promise<FetcherResponse<T>> => {
    const fetchOptions: FetcherOptions = {
      ...defaultOptions,
      method,
      headers: {
        "Content-Type": "application/json",
        ...(defaultOptions.headers || {}),
        ...(options.headers || {}),
      },
      ...options,
    };

    if (data) {
      fetchOptions.body = JSON.stringify(data);
    }

    const response = await fetch(`${baseURL}${url}`, fetchOptions);

    if (!response.ok) {
      await handleError(response);
    }

    const json = await response.json();
    return { data: json };
  };

  return {
    get: <T>(
      url: string,
      options?: FetcherOptions
    ): Promise<FetcherResponse<T>> => request<T>(url, "GET", null, options),
    post: <T>(
      url: string,
      data: any,
      options?: FetcherOptions
    ): Promise<FetcherResponse<T>> => request<T>(url, "POST", data, options),
    put: <T>(
      url: string,
      data: any,
      options?: FetcherOptions
    ): Promise<FetcherResponse<T>> => request<T>(url, "PUT", data, options),
    delete: <T>(
      url: string,
      options?: FetcherOptions
    ): Promise<FetcherResponse<T>> => request<T>(url, "DELETE", null, options),
    patch: <T>(
      url: string,
      data: any,
      options?: FetcherOptions
    ): Promise<FetcherResponse<T>> => request<T>(url, "PATCH", data, options),
  };
};

export const fetcher = createFetcher(`${BASE_API_URL}/api`, {
  headers: { "Content-Type": "application/json" },
  credentials: "include",
});

export const fetcherWithoutCredentials = createFetcher(`${BASE_API_URL}/api`, {
  headers: { "Content-Type": "application/json" },
  credentials: "omit",
});
