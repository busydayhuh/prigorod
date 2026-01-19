import {
  StationElem,
  ThreadElem,
  TravelTimeElem,
} from "@/components/ui/TableElements";
import { cn } from "@/lib/utils";
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
        props.departed && "opacity-50",
      )}
    >
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
      <ThreadElem
        number={number}
        threadName={short_title}
        threadUrl={`/thread?uid=${uid}&date=${date}&name=${title}&number=${number}`}
        variant="base_thread"
        carrier={carrier.title}
        isExpress={Boolean(express_type)}
        trainName={transport_subtype?.title || null}
        className="col-span-3 md:col-span-1 row-start-1 md:row-start-auto mb-2 md:mb-0 md:pl-4 md:font-normal font-medium"
      />
      {!!price && (
        <div
          className={cn(
            "flex justify-start md:justify-center items-center col-span-3 md:col-span-1 pt-3 md:pt-0 font-medium text-xl md:text-2xl",
            !!express_type && "text-accent",
          )}
        >{`${price} ₽`}</div>
      )}
    </div>
  );
}
export default ResultsRow;
