/* eslint-disable react/prop-types */
import React, { useState } from "react";
import {
  cn,
  getFormattedTime,
  getHoursAndMinutes,
  validateTime,
} from "@/lib/utils";
import { Link } from "react-router";
import { Badge } from "../shadcn/badge";
import { ArrowUpRight, Rabbit } from "lucide-react";

export function TimeElem({ timestamp, date = null, className = "" }) {
  return (
    <div className={`md:text-4xl text-3xl font-medium  ${className}`}>
      {!timestamp
        ? "—"
        : date
        ? getFormattedTime(timestamp)
        : validateTime(timestamp)}
    </div>
  );
}

export function LinkElem({ url, children, className = "" }) {
  return (
    <Link to={url}>
      <div className="justify-start inline p-0 gap-0.5 has-[>svg]:px-0">
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
  className = "",
}) {
  const threadVariants = {
    lg_thread: "text-m/1 font-medium md:text-xl/1 ",
    base_thread: "text-base/1 md:text-lg/1",
  };

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <div className="flex gap-1.5">
        <Badge
          className={cn("badge md:text-sm text-xs", expressName && "bg-accent")}
        >
          №{number}
        </Badge>
        {expressName && (
          <span className="md:text-sm text-xs text-accent">{expressName}</span>
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
    lg_station: "text-base font-medium md:text-lg md:font-normal",
    base_station: "text-sm md:text-base",
  };

  return (
    <div className="flex flex-col items-start md:gap-2 gap-1 md:pt-0 break-all">
      {!!time && <TimeElem timestamp={time} date={date}></TimeElem>}
      <LinkElem
        url={scheduleUrl}
        className={`${className} ${stationVariants[variant]}`}
      >
        {stationName}
      </LinkElem>
      {!!platform && (
        <div className="bg-foreground rounded-3xl text-secondary-foreground max-w-24 truncate px-1.5 py-1 text-xs font-medium">
          {platform}
        </div>
      )}
    </div>
  );
}

export function TravelTimeElem({ travelTime, isExpress = false }) {
  return (
    <div
      className={cn(
        "flex gap-2 text-sm md:text-base items-center justify-center lg:justify-start",
        isExpress && "text-accent"
      )}
    >
      {isExpress && <Rabbit className="size-4 md:block hidden" />}
      {getHoursAndMinutes(travelTime)}
    </div>
  );
}

export function ClippedTextElem({ text }) {
  const [open, setOpen] = useState(false);

  if (text.length < 30) return <div>{text}</div>;

  return (
    <div>
      <div className={open ? null : "line-clamp-1"}>{text}</div>
      <div
        onClick={() => setOpen((prev) => !prev)}
        className="text-sm text-accent cursor-pointer"
      >
        {open ? "- скрыть" : "+ посмотреть"}
      </div>
    </div>
  );
}
