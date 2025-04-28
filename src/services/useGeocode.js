import { useLocation } from "@/context/LocationContext";
import fetcher from "@/services/fetcher";
import { useEffect, useState } from "react";
import useSWR from "swr";

function useGeocode() {
  const { coords } = useLocation();
  const [isFetchingGeo, setIsFetchingGeo] = useState(true);

  useEffect(() => {
    if (coords) {
      setIsFetchingGeo(false);
    }
  }, [coords]);

  const url = `https://us1.api-bdc.net/data/reverse-geocode-client?latitude=${coords?.latitude}&longitude=${coords?.longitude}&localityLanguage=ru`;

  const {
    data: geo,
    error: geoError,
    isLoading: geoLoading,
  } = useSWR(() => (coords ? url : null), fetcher);

  return {
    geo,
    geoError,
    isFetchingGeo,
  };
}

export default useGeocode;
