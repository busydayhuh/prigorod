import useSWR from "swr";
import fetcher from "./fetcher";
import useLocation from "@/hooks/useLocation";

export default function useNearest() {
  const location = useLocation();
  const url = `http://localhost:5050/api/nearest_stations?lat=${location.coords.latitude}&lng=${location.coords.longitude}`;

  const {
    data: nearestStations,
    nearestError,
    nearestLoading,
  } = useSWR(() => url, fetcher);

  return { nearestStations, nearestError, nearestLoading };
}
