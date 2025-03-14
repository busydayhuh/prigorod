/* eslint-disable react/prop-types */
import React from "react";
import {
  Route,
  CalendarSearch,
  School,
  Navigation,
  NavigationOff,
} from "lucide-react";

import { useLocation } from "react-router";

export default function PageHead({
  number = "",
  title,
  days = "",
  exception = "",
}) {
  const location = useLocation().pathname;
  const variants = {
    "/thread": {
      icon: <Route />,
      header: (
        <>
          маршрут поезда{" "}
          <span className="text-accent">
            №{number} {title}
          </span>
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
          расписание станции <span className="text-accent">{title}</span>
        </>
      ),
      text: <>отправление и прибытие по московскому времени</>,
    },

    "/results": {
      icon: <CalendarSearch />,
      header: (
        <>
          расписание электричек по маршруту{" "}
          <span className="text-accent">{title}</span>
        </>
      ),
      text: <>отправление и прибытие по московскому времени</>,
    },
  };

  return (
    <div className="page-head-container">
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
    <div className="h-9 w-9 bg-foreground rounded-full hidden md:flex items-center shrink-0 justify-center text-background px-2">
      {children}
    </div>
  );
}
