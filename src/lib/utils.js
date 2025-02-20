import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getCodesMap(stations) {
  const codesMap = new Map();
  for (let station of stations) {
    codesMap.set(station.codes.yandex_code, station.title);
  }
  return codesMap;
}

export function getStationTitle(stations, value) {
  return stations.find(({ code }) => code === value).title;
}
