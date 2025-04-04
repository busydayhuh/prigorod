import fetcher from "@/services/fetcher";
import { useState, useEffect } from "react";
import useSWR from "swr";
import { useLocation } from "@/context/LocationContext";

function useGeocode() {
  const { coords } = useLocation();
  const [isFetchingLocation, setIsFetchingLocation] = useState(true);

  useEffect(() => {
    if (coords) {
      setIsFetchingLocation(false);
    }
  }, [coords]);

  const url = `https://us1.api-bdc.net/data/reverse-geocode-client?latitude=${coords?.latitude}&longitude=${coords?.longitude}&localityLanguage=ru`;

  const {
    data: position,
    error: positionError,
    isLoading: positionLoading,
  } = useSWR(() => (coords ? url : null), fetcher, {
    keepPreviousData: true,
    revalidateOnMount: true,
  });

  return {
    position,
    positionLoading,
    isFetchingLocation,
    positionError,
  };
}

export default useGeocode;
