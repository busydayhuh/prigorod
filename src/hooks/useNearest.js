import { useApi } from "@/hooks/useApi";
import { useUserLocation } from "@/store/location/useUserLocation";

export function useNearest() {
  const { userPosition, fetching, isLocationRequested } = useUserLocation();

  const params =
    (
      fetching ||
      !isLocationRequested ||
      userPosition.locationDeclined ||
      !userPosition.coords
    ) ?
      null
    : {
        lat: userPosition.coords?.latitude,
        lng: userPosition.coords?.longitude,
      };

  const {
    data: nearestStations,
    error: nearestError,
    isLoading,
  } = useApi("nearest_stations", params, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    nearestStations,
    nearestError,
    nearestLoading: isLoading || fetching,
  };
}
