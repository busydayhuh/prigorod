import { ErrorMessage, LinkElem, Loader } from "@/components/ui";
import { useFormLabelsUpdater } from "@/context/FormContext";
import { useLocation, useLocationRequest } from "@/context/LocationContext";
import { cn, formatDistance } from "@/lib/utils";
import { useNearest } from "@/services";
import { useFormContext } from "react-hook-form";
import City from "./City";

function NearestStations() {
  const locationRequested = useLocationRequest();
  const { locationDeclined } = useLocation();
  const { nearestStations, nearestError, isFetchingNearest } = useNearest();
  const { setValue } = useFormContext();
  const setFormLabels = useFormLabelsUpdater();

  return (
    <section className="flex flex-col gap-5 md:mt-20 mt-10">
      <h3 className="md:text-4xl text-2xl font-bold mb-3">Ближайшие станции</h3>
      <City />

      {nearestError ? (
        <ErrorMessage variant="general" />
      ) : (
        <div
          className={cn(
            "relative min-h-[0rem] h-transition pb-5",
            locationRequested && "min-h-[10rem]"
          )}
        >
          {isFetchingNearest && !locationDeclined && (
            <Loader className="md:top-2" />
          )}
          {locationDeclined && (
            <div className="table-row-base">
              Чтобы найти ближайшие станции, мы должны определить вашу локацию.
              Разрешите доступ к местоположению в настройках браузера и обновите
              страницу.
            </div>
          )}

          {nearestStations && (
            <div className="grid home-grid gap-3">
              {nearestStations.map((station) => (
                <div
                  key={station.code}
                  className="table-row-base flex flex-col gap-1 justify-center"
                >
                  <LinkElem
                    className="md:text-xl text:lg font-medium"
                    url={`/schedule?station=${station.code}&date=&name=${station.title}`}
                    onClick={() => {
                      setValue("from", station.code);
                      setFormLabels((prev) => ({
                        ...prev,
                        fromLabel: station.title,
                      }));
                    }}
                  >
                    {station.popular_title || station.title}
                  </LinkElem>
                  <div className="text-accent md:text-sm text-xs">
                    {formatDistance(station.distance)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}

export default NearestStations;
