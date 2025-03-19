/* eslint-disable react/prop-types */
import React from "react";
import { cn } from "@/lib/utils";
import {
  StationElem,
  ThreadElem,
  TravelTimeElem,
} from "@/components/ui/TableElements";
import { useSearchParams } from "react-router";

function ResultsRow(props) {
  const {
    number,
    short_title,
    title,
    express_type,
    carrier,
    uid,
    transport_subtype,
  } = props.thread;
  const price = props.tickets_info?.places[0]?.price?.whole;
  const [searchParams] = useSearchParams();
  const date = searchParams.get("date") || "";

  return (
    <div
      className={cn(
        "table-row-base results-grid",
        props.departed && "opacity-50"
      )}
    >
      <StationElem
        scheduleUrl={`/schedule?station=${props.from.code}&date=${date}&name=${props.from.title}`}
        stationName={props.from.short_title || props.from.title}
        platform={props.departure_platform}
        variant="base_station"
        time={props.departure}
        date={date}
        className="max-w-[3rem] break-words "
      />
      <TravelTimeElem travelTime={props.duration} isExpress={!!express_type} />
      <StationElem
        scheduleUrl={`/schedule?station=${props.to.code}&date=${date}&name=${props.to.title}`}
        stationName={props.to.short_title || props.to.title}
        platform={props.arrival_platform}
        variant="base_station"
        time={props.arrival}
        date={date}
        className="pr-2"
      />
      <ThreadElem
        number={number}
        threadName={short_title}
        threadUrl={`/thread?uid=${uid}&date=${date}&name=${title}&number=${number}`}
        variant="base_thread"
        carrier={carrier.title}
        expressName={express_type ? transport_subtype.title : null}
        className="row-start-1 md:row-start-auto col-span-3 md:col-span-1 font-medium md:font-normal pb-2 md:pb-0"
      />
      {!!price && (
        <div
          className={cn(
            "md:text-2xl text-xl flex items-center md:justify-center justify-end font-medium pt-3 md:pt-0 col-span-3 md:col-span-1",
            !!express_type && "text-accent"
          )}
        >{`${price} ₽`}</div>
      )}
    </div>
  );
}
export default ResultsRow;
