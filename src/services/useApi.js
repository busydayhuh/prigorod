import useSWR from "swr";
import fetcher from "./fetcher";

export default function useApi(reqRoute, params = null) {
  const url = params
    ? `prigorod-proxy-server.vercel.app/api/${reqRoute}/?${params}`
    : `prigorod-proxy-server.vercel.app/api/${reqRoute}`;

  const { data, error, isLoading } = useSWR(url, fetcher, {
    keepPreviousData: true,
  });
  return { data, error, isLoading };
}
