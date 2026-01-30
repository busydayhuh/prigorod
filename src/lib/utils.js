import { clsx } from "clsx";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getFormattedTime(timestamp) {
  const fullDate = new Date(timestamp);
  return fullDate.toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function validateTime(timestamp) {
  const splitTime = timestamp.split(":");
  return `${splitTime[0]}:${splitTime[1]}`;
}

export function getHoursAndMinutes(seconds) {
  const totalSeconds = Number(seconds);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);

  const minutesStr = `${minutes} мин`;
  const hoursStr = `${hours} ч`;

  return hours ? `${hoursStr} ${minutes > 0 ? minutesStr : ""}` : minutesStr;
}

export function formatDate(date) {
  if (!date) return "";

  const normalizedDate = new Date(date);
  const weekDay = format(normalizedDate, "cccc", { locale: ru });
  const calendarDay = format(normalizedDate, "do MMMM", { locale: ru });

  return `${weekDay}, ${calendarDay}`;
}

export function formatDateForParams(date) {
  if (!date) return "";
  if (date instanceof Date) return format(date, "yyyy-MM-dd");

  return format(new Date(date), "yyyy-MM-dd");
}

export function formatDistance(distance) {
  if (Number(distance) > 1) return `${Number(distance).toFixed(1)} км`;
  return `${(Number(distance) * 1000).toFixed(0)} м`;
}

export function timeLeft(departure) {
  const now = new Date(Date.now());
  const normalizedDeparture = new Date(departure);

  const diff = (normalizedDeparture - now) / 1000;

  if (diff <= 0) return "сейчас";
  return `через ${getHoursAndMinutes(diff)}`;
}
