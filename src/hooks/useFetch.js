import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function useFetch(reqRoute, params) {
  const searchParams = new URLSearchParams(params);
  const { data, error, isLoading } = useSWR(
    `http://localhost:5000/api/${reqRoute}/?${searchParams}`,
    fetcher
  );

  return { data, isLoading, isError: error };
}

//https://octagonal-brindle-archeology.glitch.me/api?${params} - ACTUAL URL
