/* eslint-disable react/prop-types */
import React from "react";
import { cn, getFormattedTime } from "@/lib/utils";
import { Link } from "react-router";
import { Button } from "../shadcn/button";
import { Badge } from "../shadcn/badge";
import { ArrowUpRight, Rabbit, Snail } from "lucide-react";
import { getHoursAndMinutes } from "@/lib/utils";

export function TimeElem({ time, date = null }) {
  return (
    <span className="md:text-3xl text-2xl font-medium">
      {date ? getFormattedTime(time) : time}
    </span>
  );
}

export function LinkElem({ url, children, className }) {
  return (
    <Link to={url}>
      <Button variant="link" className={className}>
        {children}
      </Button>
      <ArrowUpRight />
    </Link>
  );
}

export function ThreadElem({
  number,
  threadName,
  threadUrl,
  expressName = null,
  variant,
}) {
  const threadVariants = {
    lg_tread: "text-base md:text-lg",
    base_thread: "text-sm md:text-base",
  };

  return (
    <div className="flex col gap-1.5">
      <div className="flex gap-1.5">
        <Badge className="text-sm">{number}</Badge>
        {!!expressName && (
          <span className="text-sm text-accent">{expressName}</span>
        )}
      </div>
      <LinkElem url={threadUrl} className={threadVariants[variant]}>
        {threadName}
      </LinkElem>
    </div>
  );
}

export function StationElem({
  scheduleUrl,
  stationName,
  platform,
  variant,
  time = null,
}) {
  const stationVariants = {
    lg_station: "text-base md:text-lg",
    base_station: "text-sm md:text-base",
  };

  return (
    <div className="flex col gap-1.5">
      {!!time && <TimeElem time={time}></TimeElem>}
      <LinkElem url={scheduleUrl} className={stationVariants[variant]}>
        {stationName}
      </LinkElem>
      <Badge>{platform}</Badge>
    </div>
  );
}

export function TravelTimeElem({ travelTime, isExpress = false }) {
  return (
    <div className={cn("flex gap-2 text-sm", isExpress && "text-accent")}>
      {isExpress ? <Rabbit /> : <Snail />}
      {getHoursAndMinutes(travelTime)}
    </div>
  );
}
