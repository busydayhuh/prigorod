import { ErrorMessage, LinkElem, Loader } from "@/components/ui";
import { useNearest } from "@/hooks/useNearest";
import { cn, formatDistance } from "@/lib/utils";
import { useUserLocation } from "@/store/location/useUserLocation";
import { useFormContext } from "react-hook-form";
import City from "./City";

function NearestStations() {
  const { userPosition, isLocationRequested } = useUserLocation();
  const { nearestStations, nearestError, nearestLoading } = useNearest();
  const { reset } = useFormContext();

  return (
    <section className="flex flex-col gap-5 mt-10 md:mt-20">
      <h3 className="mb-3 font-bold text-2xl md:text-4xl">Ближайшие станции</h3>
      <City />

      {nearestError && isLocationRequested ?
        <ErrorMessage variant="general" />
      : <div
          className={cn(
            "relative pb-5 min-h-0 transition",
            isLocationRequested && "min-h-40",
          )}
        >
          {nearestLoading && !userPosition.locationDeclined && (
            <Loader className="md:top-2" />
          )}
          {userPosition.locationDeclined && (
            <div className="table-row-base">
              Чтобы найти ближайшие станции, мы должны определить вашу локацию.
              Разрешите доступ к местоположению в настройках браузера и обновите
              страницу.
            </div>
          )}

          {nearestStations && (
            <div className="gap-3 grid home-grid">
              {nearestStations.map((station) => (
                <div
                  key={station.code}
                  className="table-row-base flex flex-col justify-center gap-1"
                >
                  <LinkElem
                    className="font-medium md:text-xl text:lg"
                    url={`/schedule?station=${station.code}&date=&name=${station.title}`}
                    onClick={() => {
                      reset(
                        (prev) => ({
                          ...prev,
                          from: station.code,
                          to: "",
                          fromLabel: station.title,
                          toLabel: "",
                        }),
                        {
                          keepDefaultValues: true,
                        },
                      );
                    }}
                  >
                    {station.popular_title || station.title}
                  </LinkElem>
                  <div className="text-accent text-xs md:text-sm">
                    {formatDistance(station.distance)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      }
    </section>
  );
}

export default NearestStations;
