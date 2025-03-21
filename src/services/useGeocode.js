import fetcher from "@/services/fetcher";
import useSWR from "swr";
import { useLocation } from "@/context/LocationContext";

function useGeocode() {
  const { coords } = useLocation();

  const url = `https://us1.api-bdc.net/data/reverse-geocode-client?latitude=${coords.latitude}&longitude=${coords.longitude}&localityLanguage=ru`;

  const {
    data: position,
    error: positionError,
    isLoading: positionLoading,
  } = useSWR(() => url, fetcher, {
    keepPreviousData: true,
    revalidateOnMount: true,
  });

  return {
    position,
    positionLoading,
    positionError,
  };
}

export default useGeocode;
