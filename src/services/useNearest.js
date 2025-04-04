import useSWR from "swr";
import fetcher from "./fetcher";
import { useLocation } from "@/context/LocationContext";
import { useState, useEffect } from "react";

export default function useNearest() {
  const { coords } = useLocation();
  const [isFetchingNearest, setIsFetchingNearest] = useState(true);

  useEffect(() => {
    if (coords) {
      setIsFetchingNearest(false);
    }
  }, [coords]);

  const url = `https://prigorod-proxy-server.glitch.me/api/nearest_stations?lat=${coords?.latitude}&lng=${coords?.longitude}`;

  const {
    data: nearestStations,
    nearestError,
    nearestLoading,
  } = useSWR(() => (coords ? url : null), fetcher, {
    keepPreviousData: true,
  });

  return { nearestStations, nearestError, isFetchingNearest };
}
