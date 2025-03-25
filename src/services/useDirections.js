import useSWR from "swr";
import fetcher from "./fetcher";

export default function useDirections(station) {
  const url = `https://prigorod-proxy-server.glitch.me/api/directions?station=${station}`;
  const { data, error, isLoading } = useSWR(url, fetcher);
  return { data, error, isLoading };
}
