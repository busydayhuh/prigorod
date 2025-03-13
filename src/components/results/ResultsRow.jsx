/* eslint-disable react/prop-types */
import React from "react";
import { cn } from "@/lib/utils";
import {
  StationElem,
  ThreadElem,
  TravelTimeElem,
} from "../table-ui/TableElements";

function ResultsRow(props) {
  const { number, title, express_type, carrier, uid, transport_subtype } =
    props.thread;
  const price = props.tickets_info?.places[0]?.price?.whole;

  return (
    <div
      className={cn(
        "table-row-base results-grid shadow-(--row-shadow) md:items-center",
        props.departed && "opacity-50"
      )}
    >
      <StationElem
        scheduleUrl={`/schedule?station=${props.from.code}&date=${props.start_date}`}
        stationName={props.from.short_title || props.from.title}
        platform={props.departure_platform}
        variant="base_station"
        time={props.departure}
        date={props.start_date}
        className="max-w-[3rem] break-words "
      />
      <TravelTimeElem travelTime={props.duration} isExpress={!!express_type} />
      <StationElem
        scheduleUrl={`/schedule?station=${props.to.code}&date=${props.start_date}`}
        stationName={props.to.short_title || props.to.title}
        platform={props.arrival_platform}
        variant="base_station"
        time={props.arrival}
        date={props.start_date}
        className="pr-2"
      />
      <ThreadElem
        number={number}
        threadName={title}
        threadUrl={`/thread?uid=${uid}&date=${props.start_date || ""}`}
        variant="base_thread"
        carrier={carrier.title}
        expressName={express_type ? transport_subtype.title : null}
        className="row-start-1 md:row-start-auto col-span-3 md:col-span-1 border-b-2 md:border-b-0 pb-3 md:pb-0"
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
