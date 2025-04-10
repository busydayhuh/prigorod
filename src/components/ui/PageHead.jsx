/* eslint-disable react/prop-types */
import React from "react";
import {
  Route,
  CalendarSearch,
  School,
  MapPinCheck,
  MapPinOff,
  LocateFixedIcon,
  Map,
} from "lucide-react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

import { useLocation } from "react-router";
import { cn } from "@/lib/utils";

export default function PageHead({
  number = "",
  title = "",
  days = "",
  exception = "",
  date = "",
  geoAllowed = false,
  isFetching = false,
  locality = "",
  subdivision = "",
}) {
  const location = useLocation().pathname;
  const formatDate = date
    ? format(date, "do MMMM", {
        locale: ru,
      })
    : "все дни";

  const variants = {
    "/thread": {
      icon: <Route />,
      header: (
        <>
          маршрут поезда{" "}
          <span className="text-accent">
            №{number} {title}
          </span>{" "}
          на <span className="text-accent">{formatDate}</span>
        </>
      ),
      text: days && (
        <>
          действует {days}
          {exception && `, кроме ${exception}`}
        </>
      ),
    },

    "/schedule": {
      icon: <School />,
      header: (
        <>
          расписание станции <span className="text-accent">{title}</span> на{" "}
          <span className="text-accent">{formatDate}</span>
        </>
      ),
      text: <>отправление и прибытие по московскому времени</>,
    },

    "/results": {
      icon: <CalendarSearch />,
      header: (
        <>
          расписание электричек по маршруту{" "}
          <span className="text-accent">{title}</span> на{" "}
          <span className="text-accent">{formatDate}</span>
        </>
      ),
      text: <>отправление и прибытие по московскому времени</>,
    },

    "/": {
      icon: geoAllowed ? (
        <MapPinCheck />
      ) : isFetching ? (
        <LocateFixedIcon className="animate-pulse" />
      ) : (
        <MapPinOff />
      ),
      header: (
        <>
          {title ? (
            <>
              <span className="text-accent">
                {title}
                {(subdivision || locality) && `, ${subdivision || locality}`}
              </span>{" "}
              — ближайшие станции:
            </>
          ) : (
            <span>определяем локацию...</span>
          )}
        </>
      ),
      text: geoAllowed ? null : isFetching ? (
        <span className="text-foreground">найдём ближайшие к вам станции</span>
      ) : (
        <span className="text-foreground">
          доступ к местоположению запрещён, показана локация по умолчанию
        </span>
      ),
    },
  };

  return (
    <div
      className={cn(
        "flex gap-3 md:mb-8 items-start mb-5 mt-40 md:mt-20",
        location === "/" && "md:mb-10"
      )}
    >
      <Icon>{variants[location].icon}</Icon>
      <div className="pl-2 md:pl-0">
        <h3 className="md:text-3xl text-2xl font-medium mb-1.5">
          {variants[location].header}
        </h3>
        <div className="text-sm md:text-base">{variants[location].text}</div>
      </div>
    </div>
  );
}

function Icon({ children }) {
  return (
    <div className="h-9 w-9 bg-foreground rounded-full hidden md:flex items-center shrink-0 justify-center text-primary-foreground px-2">
      {children}
    </div>
  );
}
