import { Button } from "@/components/shadcn/button";
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
        <Button
          variant="destructive"
          className="shadow-(--sb-shadow) border-2 h-12 rounded-3xl md:h-14 font-headers text-sm w-fit font-normal"
          type="submit"
          onClick={() => setIsLocationRequested(true)}
        >
          определить мою локацию
        </Button>
      )}
      {isLocationRequested && geoLoading && !userPosition.locationDeclined && (
        <div className="inline-flex items-center gap-1.5 font-headers text-xs sm:text-sm md:text-base">
          <Loader2 className="size-4 animate-spin shrink-0" />
          <span>Определяем локацию...</span>
        </div>
      )}
      {isLocationRequested && userPosition.locationDeclined && (
        <div className="inline-flex items-center gap-1.5 bg-secondary px-3 py-2 border rounded-3xl font-headers text-xs sm:text-sm md:text-base">
          <NavigationOff className="size-4 shrink-0" />
          <span>Доступ к местоположению заблокирован</span>
        </div>
      )}
      {isLocationRequested && geo && (
        <div className="inline-flex items-center gap-2 bg-secondary px-3 py-2 border rounded-3xl font-headers text-xs sm:text-sm md:text-base">
          <Navigation className="size-4 shrink-0" />
          {geo.city}
          {geo.principalSubdivision !== geo.city ?
            `, ${geo.principalSubdivision}`
          : ""}
          {geo.locality !== geo.city ? `, ${geo.locality}` : ""}
        </div>
      )}
      {isLocationRequested && userPosition.locationAllowed && geoError && (
        <div className="inline-flex items-center gap-1.5 font-headers text-xs sm:text-sm md:text-base">
          <NavigationOff className="size-4" />
          <span>Не удалось определить локацию</span>
        </div>
      )}
    </>
  );
}

export default City;
