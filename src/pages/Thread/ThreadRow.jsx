import { StationElem, TimeElem } from "@/components/ui/TableElements";
import { cn, getHoursAndMinutes } from "@/lib/utils";

export default function ThreadRow(props) {
  return (
    <div className="table-row-base thread-grid">
      <StationElem
        scheduleUrl={`/schedule?station=${props.station.code}&date=${props.date}&name=${props.station.title}`}
        stationName={props.station.short_title || props.station.title}
        platform={props.platform}
        variant="lg_station"
      />
      <TimeElem
        timestamp={props.arrival}
        date={props.date || ""}
        className={cn("text-base md:text-xl text-center")}
      />
      <div className="hidden md:block text-center">
        {props.stop_time ? getHoursAndMinutes(props.stop_time) : ""}
      </div>
      <TimeElem
        timestamp={props.departure}
        date={props.date || ""}
        className={cn("text-base md:text-xl text-center")}
      />
    </div>
  );
}
