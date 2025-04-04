import React, { useState } from "react";
import useGeocode from "@/services/useGeocode";
import { useNearest } from "@/services";
import { LinkElem, Loader, PageHead, ErrorMessage } from "@/components/ui";
import { formatDistance } from "@/lib/utils";
import { useLocation } from "@/context/LocationContext";
import rainbow from "@/assets/Rainbow.png";
import flower from "@/assets/SummertimeSadness.png";
import { Skeleton } from "@/components/shadcn/skeleton";

export default function Home() {
  const { geoAllowed } = useLocation();
  const { position, isFetchingLocation } = useGeocode();
  const { nearestStations, nearestError, isFetchingNearest } = useNearest();

  return (
    <div className="w-narrow md:mt-5 mt-10">
      {!isFetchingLocation && position && (
        <PageHead
          title={position.city}
          subdivision={
            position.principalSubdivision !== position.city
              ? position.principalSubdivision
              : ""
          }
          locality={
            position.locality !== position.city ? position.locality : ""
          }
          geoAllowed={geoAllowed}
        />
      )}
      {isFetchingLocation && <PageHead isFetching={isFetchingLocation} />}

      {nearestError ? (
        <ErrorMessage variant="general" />
      ) : (
        <div className="relative md:mt-10 min-h-[30rem]">
          {isFetchingNearest && <Loader />}

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
                  src={rainbow}
                  className="mx-auto w-[max(300px,60%)] hover:translate-y-1 transition-all aspect-[314/165]"
                />
              </div>
              <div className="md:col-start-3 md:row-start-1 row-span-2 sm:flex hidden items-center">
                <img
                  src={flower}
                  className="mx-auto w-[max(250px,80%)] hover:rotate-30 transition-all aspect-[65/61]"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function NearestLoader() {
  const NUM_OF_PLACEHOLDERS = 6;

  return (
    <div className="grid home-grid gap-3">
      {[...Array(NUM_OF_PLACEHOLDERS)].map((el, index) => (
        <Skeleton
          className="rounded-2xl bg-secondary/10 min-w-2xs min-h-40"
          key={index}
        />
      ))}
    </div>
  );
}
