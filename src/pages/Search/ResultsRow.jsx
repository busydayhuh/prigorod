import {
  StationElem,
  ThreadElem,
  TravelTimeElem,
} from "@/components/ui/TableElements";
import { cn, timeLeft } from "@/lib/utils";
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
        "table-row-base relative results-grid",
        props.departed ? "opacity-50" : "row-fade-in",
      )}
      style={{ animationDelay: `${props.index * 80}ms` }}
    >
      {props.index < 5 && (
        <div className="inline-flex -top-3 right-2 lg:right-auto lg:left-2 absolute items-center bg-secondary px-1.5 border rounded-3xl h-6 font-medium text-xs">
          {timeLeft(props.departure)}
        </div>
      )}
      <ThreadElem
        number={number}
        threadName={short_title}
        threadUrl={`/thread?uid=${uid}&date=${date}&name=${title}&number=${number}`}
        variant="base_thread"
        carrier={carrier.title}
        isExpress={Boolean(express_type)}
        trainName={transport_subtype?.title || null}
        className="col-span-3 lg:col-span-1 row-start-1 lg:row-start-auto mb-2 lg:mb-0 lg:pl-4 md:font-normal font-medium"
      />
      <StationElem
        scheduleUrl={`/schedule?station=${props.from.code}&date=${date}&name=${props.from.title}`}
        stationName={props.from.short_title || props.from.title}
        platform={props.departure_platform}
        variant="base_station"
        time={props.departure}
        date={date}
      />

      <TravelTimeElem
        travelTime={props.duration}
        isExpress={Boolean(express_type)}
      />

      <StationElem
        scheduleUrl={`/schedule?station=${props.to.code}&date=${date}&name=${props.to.title}`}
        stationName={props.to.short_title || props.to.title}
        platform={props.arrival_platform}
        variant="base_station"
        time={props.arrival}
        date={date}
      />

      {!!price && (
        <div
          className={cn(
            "flex justify-start lg:justify-center items-center col-span-3 lg:col-span-1 pt-3 lg:pt-0 font-medium text-xl md:text-2xl",
            !!express_type && "text-destructive",
          )}
        >{`${price} ₽`}</div>
      )}
    </div>
  );
}
export default ResultsRow;
