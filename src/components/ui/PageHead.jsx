import { scrollToElement } from "@/lib/scrollToElement";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { CalendarSearch, Route, School } from "lucide-react";
import { useEffect } from "react";
import { useLocation } from "react-router";
import { Badge } from "../shadcn/badge";

export default function PageHead({
  number = "",
  title = "",
  days = "",
  exception = "",
  date = "",
  isExpress = false,
  subtypeName = "",
}) {
  const location = useLocation().pathname;
  const formatDate =
    date ?
      format(date, "do MMMM", {
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
      text: (
        <div className="flex flex-wrap items-baseline gap-2">
          {subtypeName && (
            <Badge
              className="mt-2 rounded-2xl text-sm"
              variant={isExpress ? "destructive" : "default"}
            >
              {subtypeName}
            </Badge>
          )}
          {days && (
            <p>
              действует {days}
              {exception && `, кроме ${exception}`}
            </p>
          )}
        </div>
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
  };

  useEffect(() => {
    scrollToElement(document.getElementById("heading"));
  }, []);

  return (
    <div
      id="heading"
      className={cn(
        "flex items-start gap-3 mb-5 md:mb-8",
        location === "/" && "md:mb-10",
      )}
    >
      <Icon>{variants[location].icon}</Icon>
      <div className="pl-2 md:pl-0">
        <h3 className="font-headers section-header">
          {variants[location].header}
        </h3>
        <div className="text-sm md:text-base">{variants[location].text}</div>
      </div>
    </div>
  );
}

function Icon({ children }) {
  return (
    <div className="hidden md:flex justify-center items-center bg-foreground px-2 rounded-full w-9 h-9 text-primary-foreground shrink-0">
      {children}
    </div>
  );
}
