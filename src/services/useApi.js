import useSWR from "swr";
import fetcher from "./fetcher";

export default function useApi(reqRoute, params = null) {
  const search = new URLSearchParams(params).toString();

  const url =
    search ?
      `https://prigorod-proxy-server.vercel.app/api/${reqRoute}?${search}`
    : `https://prigorod-proxy-server.vercel.app/api/${reqRoute}`;

  const { data, error, isLoading } = useSWR(url, fetcher, {
    keepPreviousData: true,
  });

  return { data, error, isLoading };
}
