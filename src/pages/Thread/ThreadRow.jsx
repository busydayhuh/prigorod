/* eslint-disable react/prop-types */
import { getHoursAndMinutes, cn } from "@/lib/utils";
import { StationElem, TimeElem } from "@/components/table-ui/TableElements";

export default function ThreadRow(props) {
  return (
    <div className="thread-grid table-row-base">
      <StationElem
        scheduleUrl={`/schedule?station=${props.station.code}&date=${props.date}&name=${props.station.title}`}
        stationName={props.station.title}
        platform={props.platform}
        variant="lg_station"
      />
      <TimeElem
        timestamp={props.arrival}
        date={props.date || ""}
        className={cn(
          "text-foreground/40 md:text-center text-center",
          props.arrival && "text-right"
        )}
      />
      <TimeElem
        timestamp={props.departure}
        date={props.date || ""}
        className={cn(
          "md:text-center text-center",
          props.departure && "text-right"
        )}
      />

      <div className="hidden md:block text-center">
        {props.stop_time ? getHoursAndMinutes(props.stop_time) : ""}
      </div>
    </div>
  );
}
