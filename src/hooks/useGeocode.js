import { fetcher } from "@/services/fetcher";
import { useUserLocation } from "@/store/location/useUserLocation";
import useSWR from "swr";

export function useGeocode() {
  const { userPosition, fetching } = useUserLocation();
  const url = `https://us1.api-bdc.net/data/reverse-geocode-client?latitude=${userPosition.coords?.latitude}&longitude=${userPosition.coords?.longitude}&localityLanguage=ru`;

  const {
    data: geo,
    error: geoError,
    isLoading,
  } = useSWR(() => (userPosition.coords ? url : null), fetcher);

  return {
    geo,
    geoError,
    geoLoading: isLoading || fetching,
  };
}
