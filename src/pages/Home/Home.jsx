import React, { useState } from "react";
import useGeocode from "@/services/useGeocode";
import { useNearest } from "@/services";
import { LinkElem, Loader, PageHead, ErrorMessage } from "@/components/ui";
import { formatDistance } from "@/lib/utils";
import { useLocation } from "@/context/LocationContext";

export default function Home() {
  const { geoAllowed } = useLocation();
  const { position } = useGeocode();
  const { nearestStations, nearestError, nearestLoading } = useNearest();

  return (
    <div className="w-narrow md:mt-5">
      {!nearestLoading && position && (
        <PageHead title={position.city} geoAllowed={geoAllowed} />
      )}
      {nearestError ? (
        <ErrorMessage variant="general" />
      ) : (
        <div className="relative md:mt-10">
          {nearestLoading && <Loader />}
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
                  >
                    {station.popular_title || station.title}
                  </LinkElem>
                  <div className="text-accent md:text-lg text-base">
                    {formatDistance(station.distance)}
                  </div>
                </div>
              ))}
              <div className="row-start-2 justify-center sm:flex hidden items-center p-5">
                <img
                  src="/src/assets/Rainbow.png"
                  className="mx-auto w-[max(300px,60%)]"
                />
              </div>
              <div className="md:col-start-3 md:row-start-1 row-span-2 sm:flex hidden items-center">
                <img
                  src="/src/assets/SummertimeSadness.png"
                  className="mx-auto w-[max(250px,80%)]"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
