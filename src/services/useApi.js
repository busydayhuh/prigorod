import useSWR from "swr";
import fetcher from "./fetcher";

export default function useApi(reqRoute, params = null) {
  const url = params
    ? `https://prigorod-proxy-server.glitch.me/api/${reqRoute}/?${params}`
    : `https://prigorod-proxy-server.glitch.me/api/${reqRoute}`;

  const { data, error, isLoading } = useSWR(url, fetcher, {
    keepPreviousData: true,
  });
  return { data, error, isLoading };
}

//https://octagonal-brindle-archeology.glitch.me/api?${params} - ACTUAL URL
