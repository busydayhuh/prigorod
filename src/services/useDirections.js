import useSWR from "swr";
import fetcher from "./fetcher";

export default function useDirections(station) {
  const url = `http://localhost:5050/api/directions?station=${station}`;
  const { data, error, isLoading } = useSWR(url, fetcher);
  return { data, error, isLoading };
}
