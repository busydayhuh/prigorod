import useSWR from "swr";
import fetcher from "./fetcher";
import { useLocation } from "@/context/LocationContext";

export default function useNearest() {
  const location = useLocation();

  const url = `https://prigorod-proxy-server.glitch.me/api/nearest_stations?lat=${location.coords.latitude}&lng=${location.coords.longitude}`;

  const {
    data: nearestStations,
    nearestError,
    nearestLoading,
  } = useSWR(() => url, fetcher, {
    keepPreviousData: true,
  });

  return { nearestStations, nearestError, nearestLoading };
}
