import diamond from "@/assets/diamond.svg";
import pin from "@/assets/pin.svg";
import { LinkElem, Loader } from "@/components/ui";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { useNearest } from "@/hooks/useNearest";
import { cn, formatDateForParams, formatDistance } from "@/lib/utils";
import { useUserLocation } from "@/store/location/useUserLocation";
import { Ruler } from "lucide-react";
import { useFormContext } from "react-hook-form";
import City from "./City";

function NearestStations() {
  const { userPosition, isLocationRequested } = useUserLocation();
  const { nearestStations, nearestError, nearestLoading } = useNearest();
  const { reset } = useFormContext();
  const now = Date.now();

  return (
    <section className="flex flex-col gap-5 lg:col-span-2 bg-primary px-6 md:px-8 lg:px-10 pt-6 lg:pt-8 pb-12 border-2 rounded-[40px] shadow-(--row-shadow)">
      <h3 className="flex justify-between items-center font-headers text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
        Найти ближайшие станции
        <Diamonds className="hidden md:flex" />
      </h3>
      <p className="font-headers text-sm md:text-base">
        * требует разрешения на доступ к вашей геолокации
      </p>
      <div className="gap-x-4 gap-y-2 grid lg:grid-cols-[3fr_1fr] md:mt-2 lg:mt-4">
        <div className="space-y-5 md:space-y-8 lg:space-y-10">
          <City />

          {nearestError && isLocationRequested ?
            <div className="font-headers text-sm md:text-base">
              Что-то пошло не так. Обновите страницу и попробуйте повторить
              запрос позже
            </div>
          : <div
              className={cn(
                "relative lg:pb-5 min-h-0 transition",
                isLocationRequested && "min-h-40",
              )}
            >
              {nearestLoading && !userPosition.locationDeclined && (
                <Loader className="md:top-2" />
              )}
              {userPosition.locationDeclined && (
                <div className="font-headers text-sm md:text-base">
                  Чтобы найти ближайшие станции, мы должны определить вашу
                  локацию. Разрешите доступ к местоположению в настройках
                  браузера и обновите страницу
                </div>
              )}

              {nearestStations && (
                <div className="gap-4 md:gap-6 lg:gap-10 grid home-grid">
                  {nearestStations.map((station) => (
                    <div
                      key={station.code}
                      className="flex flex-col justify-center gap-1"
                    >
                      <LinkElem
                        className="flex items-center gap-2 font-headers md:text-xl text:lg"
                        url={`/schedule?station=${station.code}&date=${formatDateForParams(now)}&name=${station.title}`}
                        onClick={() => {
                          reset(
                            (prev) => ({
                              ...prev,
                              from: station.code,
                              to: "",
                              fromLabel: station.title,
                              toLabel: "",
                              date: formatDateForParams(now),
                            }),
                            {
                              keepDefaultValues: true,
                            },
                          );
                        }}
                      >
                        {station.popular_title || station.title}
                        <ArrowButton />
                      </LinkElem>
                      <div className="inline-flex items-center gap-2 font-headers text-muted-foreground text-xs md:text-sm">
                        <Ruler className="size-4" />
                        {formatDistance(station.distance)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          }
        </div>
        <img
          src={pin}
          alt="diamond"
          className="justify-self-end self-end w-full max-w-xs"
        />
      </div>
    </section>
  );
}

function Diamonds({ className }) {
  return (
    <div className={cn("flex items-center", className)}>
      <img src={diamond} alt="diamond" className="w-8 shrink-0" />
      <img src={diamond} alt="diamond" className="w-8 shrink-0" />
      <img src={diamond} alt="diamond" className="w-8 shrink-0" />
    </div>
  );
}

export default NearestStations;
