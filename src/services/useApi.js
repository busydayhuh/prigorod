import useSWR from "swr";
import fetcher from "./fetcher";

export default function useApi(reqRoute, params = null) {
  const url = params
    ? `http://localhost:5050/api/${reqRoute}/?${params}`
    : `http://localhost:5050/api/${reqRoute}`;

  const { data, error, isLoading } = useSWR(url, fetcher, {
    keepPreviousData: true,
  });
  return { data, error, isLoading };
}

//https://octagonal-brindle-archeology.glitch.me/api?${params} - ACTUAL URL
