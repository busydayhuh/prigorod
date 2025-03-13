/* eslint-disable react/prop-types */
import React from "react";
import { cn, getFormattedTime, getHoursAndMinutes } from "@/lib/utils";
import { Link } from "react-router";
import { Badge } from "../shadcn/badge";
import { ArrowUpRight, Rabbit } from "lucide-react";

export function TimeElem({ time, date = null }) {
  return (
    <span className="md:text-4xl text-3xl font-medium">
      {date ? getFormattedTime(time) : time}
    </span>
  );
}

export function LinkElem({ url, children, className }) {
  return (
    <Link to={url}>
      <div className={`justify-start inline p-0 gap-0.5 has-[>svg]:px-0`}>
        <span
          className={`break-word hover:underline hover:underline-offset-4 ${className}`}
        >
          {children}
        </span>
        <ArrowUpRight className="md:size-4 size-3 inline" />
      </div>
    </Link>
  );
}

export function ThreadElem({
  number,
  threadName,
  threadUrl,
  expressName = null,
  variant,
  carrier = null,
  className,
}) {
  const threadVariants = {
    lg_thread: "text-lg md:text-xl",
    base_thread: "text-base md:text-lg",
  };

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <div className="flex gap-1.5">
        <Badge
          className={cn(
            "badge md:text-sm text-xs",
            !!expressName && "bg-accent text-foreground"
          )}
        >
          №{number}
        </Badge>
        {!!expressName && (
          <span className="text-sm text-accent">{expressName}</span>
        )}
      </div>
      <LinkElem url={threadUrl} className={threadVariants[variant]}>
        {threadName}
      </LinkElem>
      {!!carrier && (
        <div className="hidden md:block md:text-sm md:text-foreground/50">
          {carrier}
        </div>
      )}
    </div>
  );
}

export function StationElem({
  scheduleUrl,
  stationName,
  platform = null,
  variant,
  time = null,
  date = null,
  className = "",
}) {
  const stationVariants = {
    lg_station: "text-base md:text-lg",
    base_station: "text-sm md:text-base",
  };

  return (
    <div className="flex flex-col items-start md:gap-2 gap-1 pt-3 md:pt-0">
      {!!time && <TimeElem time={time} date={date}></TimeElem>}
      <LinkElem
        url={scheduleUrl}
        className={`${className} ${stationVariants[variant]}`}
      >
        {stationName}
      </LinkElem>
      {!!platform && <Badge className="badge text-xs">{platform}</Badge>}
    </div>
  );
}

export function TravelTimeElem({ travelTime, isExpress = false }) {
  return (
    <div
      className={cn(
        "flex gap-2 text-sm md:text-base items-center",
        isExpress && "text-accent"
      )}
    >
      {isExpress && <Rabbit className="size-4" />}
      {getHoursAndMinutes(travelTime)}
    </div>
  );
}
