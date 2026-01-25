import { fetcher } from "@/services/fetcher";
import useSWR from "swr";

export function useApi(reqRoute, params = null) {
  const search = params ? new URLSearchParams(params).toString() : null;

  const url =
    search ?
      `https://prigorod-proxy-server.vercel.app/api/${reqRoute}?${search}`
    : null;

  const { data, error, isLoading } = useSWR(url, fetcher, {
    keepPreviousData: true,
  });

  return { data, error, isLoading };
}
