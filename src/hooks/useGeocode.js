import fetcher from "@/services/fetcher";
import useSWR from "swr";
import useLocation from "@/hooks/useLocation";

function useGeocode() {
  const location = useLocation();
  const url = `https://us1.api-bdc.net/data/reverse-geocode-client?latitude=${location.coords.latitude}&longitude=${location.coords.longitude}&localityLanguage=ru`;

  const {
    data: position,
    error: positionError,
    isLoading: positionLoading,
  } = useSWR(url, fetcher);

  return {
    position,
    positionLoading,
    positionError,
    geoAllowed: location.geoAllowed,
  };
}

export default useGeocode;
