import { useGeocode } from "@/hooks/useGeocode";
import { useUserLocation } from "@/store/location/useUserLocation";
import { Loader2, Navigation, NavigationOff } from "lucide-react";

function City() {
  const { userPosition, isLocationRequested, setIsLocationRequested } =
    useUserLocation();
  const { geo, geoLoading, geoError } = useGeocode();

  return (
    <>
      {!isLocationRequested && (
        <div className="inline-flex items-start md:items-center gap-1.5 hover:text-accent">
          <Navigation className="mt-1 md:mt-0 size-5 md:size-4" />
          <button
            className="w-fit text-base text-left"
            onClick={() => setIsLocationRequested(true)}
          >
            <span className="box-decoration-slice suggestion-links">
              Найти ближайшие ко мне станции
            </span>
          </button>
        </div>
      )}
      {isLocationRequested && geoLoading && !userPosition.locationDeclined && (
        <div className="inline-flex items-center gap-1.5">
          <Loader2 className="size-4 animate-spin" />
          <span>Определяем локацию...</span>
        </div>
      )}
      {isLocationRequested && userPosition.locationDeclined && (
        <div className="inline-flex items-center gap-1.5">
          <NavigationOff className="size-4" />
          <span>Доступ к местоположению заблокирован</span>
        </div>
      )}
      {isLocationRequested && geo && (
        <div className="inline-flex items-center gap-1.5">
          <Navigation className="size-4" />
          {geo.city}
          {geo.principalSubdivision !== geo.city ?
            `, ${geo.principalSubdivision}`
          : ""}
          {geo.locality !== geo.city ? `, ${geo.locality}` : ""}
        </div>
      )}
      {isLocationRequested && userPosition.locationAllowed && geoError && (
        <div className="inline-flex items-center gap-1.5">
          <NavigationOff className="size-4" />
          <span>Не удалось определить локацию</span>
        </div>
      )}
    </>
  );
}

export default City;
