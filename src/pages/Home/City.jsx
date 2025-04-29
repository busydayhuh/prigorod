import {
  useLocation,
  useLocationRequest,
  useLocationRequestUpdater,
} from "@/context/LocationContext";
import { useGeocode } from "@/services";
import { Loader2, Navigation, NavigationOff } from "lucide-react";

function City() {
  const setLocationRequest = useLocationRequestUpdater();
  const locationRequested = useLocationRequest();
  const { locationAllowed, locationDeclined } = useLocation();
  const { geo, isFetchingGeo, geoError } = useGeocode();

  return (
    <>
      {!locationRequested && (
        <div className="inline-flex gap-1.5 md:items-center items-start hover:text-accent">
          <Navigation className="size-5 md:size-4 mt-1 md:mt-0" />
          <button
            className="text-base w-fit text-left"
            onClick={() => setLocationRequest(true)}
          >
            <span className="suggestion-links box-decoration-slice">
              Найти ближайшие ко мне станции
            </span>
          </button>
        </div>
      )}
      {locationRequested && isFetchingGeo && !locationDeclined && (
        <div className="inline-flex gap-1.5 items-center">
          <Loader2 className="animate-spin size-4" />
          <span>Определяем локацию...</span>
        </div>
      )}
      {locationRequested && locationDeclined && (
        <div className="inline-flex items-center gap-1.5">
          <NavigationOff className="size-4" />
          <span>Доступ к местоположению заблокирован</span>
        </div>
      )}
      {locationRequested && geo && (
        <div className="inline-flex items-center gap-1.5">
          <Navigation className="size-4" />
          {geo.city}
          {geo.principalSubdivision !== geo.city
            ? `, ${geo.principalSubdivision}`
            : ""}
          {geo.locality !== geo.city ? `, ${geo.locality}` : ""}
        </div>
      )}
      {locationRequested && locationAllowed && geoError && (
        <div className="inline-flex items-center gap-1.5">
          <NavigationOff className="size-4" />
          <span>Не удалось определить локацию</span>
        </div>
      )}
    </>
  );
}

export default City;
