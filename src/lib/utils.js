import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getFormattedTime(date) {
  const fullDate = new Date(date);

  return fullDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function getHoursAndMinutes(seconds) {
  const totalSeconds = Number(seconds);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);

  const minutesStr = `${minutes} мин.`;
  const hoursStr = `${hours} ч.`;

  return hours ? `${hoursStr} ${minutesStr}` : minutesStr;
}

export function formatDateForParams(date) {
  if (!date) return "";

  return format(new Date(date), "yyyy-MM-dd");
}
