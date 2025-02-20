import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function useApi(reqRoute, params = null) {
  const searchParams = params ? new URLSearchParams(params) : "";
  const url = searchParams
    ? `http://localhost:5000/api/${reqRoute}/?${searchParams}`
    : `http://localhost:5000/api/${reqRoute}`;

  const { data, error, isLoading } = useSWR(url, fetcher);

  return { data, isLoading, isError: error };
}

//https://octagonal-brindle-archeology.glitch.me/api?${params} - ACTUAL URL
