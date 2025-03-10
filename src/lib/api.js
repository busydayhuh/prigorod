import useSWR from "swr";

export const fetcher = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  return await res.json();
};

export function useDirections(station) {
  const url = `http://localhost:5050/api/directions?station=${station}`;
  const { data, error, isLoading } = useSWR(url, fetcher);
  return { data, error, isLoading };
}

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
