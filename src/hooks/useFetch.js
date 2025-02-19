import useSWR from "swr";
import fetcher from "./fetcher";

export default function useApi(reqRoute, params = null) {
  const searchParams = params ? new URLSearchParams(params) : "";
  const url = searchParams
    ? `http://localhost:5000/api/${reqRoute}/?${searchParams}`
    : `http://localhost:5000/api/${reqRoute}`;

  const { data, error, isLoading } = useSWR(url, fetcher);

  if (reqRoute === "stations_list") console.log("🤡 Запрос списка станций");

  return { data, isLoading, isError: error };
}

//https://octagonal-brindle-archeology.glitch.me/api?${params} - ACTUAL URL
