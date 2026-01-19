import { Badge } from "@/components/shadcn/badge";
import {
  cn,
  getFormattedTime,
  getHoursAndMinutes,
  validateTime,
} from "@/lib/utils";
import { Rabbit } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import BadgeTooltip from "./Tooltip";

export function TimeElem({ timestamp, date = null, className = "" }) {
  return (
    <div
      className={`lg:text-4xl md:text-3xl text-2xl font-medium font-headers  ${className}`}
    >
      {!timestamp ?
        "—"
      : date ?
        getFormattedTime(timestamp)
      : validateTime(timestamp)}
    </div>
  );
}

export function LinkElem({ url, children, className = "", onClick = null }) {
  return (
    <Link to={url} onClick={onClick}>
      <div className="gap-0.5 p-0 has-[>svg]:px-0">
        <p
          className={`hover:underline hover:underline-offset-4 break-word ${className}`}
        >
          {children}
        </p>
      </div>
    </Link>
  );
}

export function ThreadElem({
  number,
  threadName,
  threadUrl,
  trainName = null,
  isExpress = false,
  variant,
  carrier = null,
  className = "",
}) {
  const threadVariants = {
    lg_thread: "text-m/tight font-medium md:text-xl/tight font-headers",
    base_thread: "text-base/1 md:text-lg/tight font-headers",
  };

  return (
    <div className={`flex flex-col gap-2.5  ${className}`}>
      <div className="flex items-center gap-1.5">
        <Badge
          className={cn(
            "font-semibold text-xs md:text-sm badge",
            isExpress && "bg-accent",
          )}
        >
          # {number}
        </Badge>
        {trainName && (
          <BadgeTooltip text={trainName}>
            <div
              className={cn(
                "max-w-55 text-xs md:text-sm truncate",
                isExpress && "text-accent",
              )}
            >
              {trainName}
            </div>
          </BadgeTooltip>
        )}
      </div>
      <LinkElem url={threadUrl} className={threadVariants[variant]}>
        {threadName}
      </LinkElem>
      {!!carrier && (
        <div className="hidden md:block md:text-foreground/50 md:text-sm">
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
    lg_station: "text-base font-medium md:text-lg md:font-normal font-headers",
    base_station: "text-xs md:text-base font-headers",
  };

  return (
    <div className="flex flex-col items-start gap-1 md:gap-2 md:pt-0 wrap-break-word">
      {Boolean(time) && <TimeElem timestamp={time} date={date}></TimeElem>}
      <LinkElem
        url={scheduleUrl}
        className={`${className} ${stationVariants[variant]}`}
      >
        {stationName}
      </LinkElem>
      {Boolean(platform) && <PlatformBadgeElem platform={platform} />}
    </div>
  );
}

export function TravelTimeElem({ travelTime, isExpress = false }) {
  return (
    <div
      className={cn(
        "flex justify-center md:justify-start items-center gap-2 text-sm md:text-base",
        isExpress && "text-accent",
      )}
    >
      {isExpress && <Rabbit className="hidden md:block size-4" />}
      {getHoursAndMinutes(travelTime)}
    </div>
  );
}

export function ClippedTextElem({ text }) {
  const [open, setOpen] = useState(false);

  if (text.length < 50) return <div>{text}</div>;

  return (
    <div>
      <div
        className={cn(
          "h-transition",
          open ? "max-h-80" : "line-clamp-1 max-h-6",
        )}
      >
        {text}
      </div>
      <div
        onClick={() => setOpen((prev) => !prev)}
        className="text-accent text-sm cursor-pointer"
      >
        {open ? "— скрыть" : "+ посмотреть"}
      </div>
    </div>
  );
}

export function PlatformBadgeElem({ platform }) {
  return (
    <BadgeTooltip text={platform}>
      <div className="md:justify-self-center self-center bg-foreground px-1.5 py-1 rounded-3xl w-fit max-w-full font-medium text-secondary-foreground text-xs lg:text-sm line-clamp-1">
        {platform}
      </div>
    </BadgeTooltip>
  );
}
