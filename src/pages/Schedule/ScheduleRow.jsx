/* eslint-disable react/prop-types */
import {
  ThreadElem,
  TimeElem,
  ClippedTextElem,
} from "@/components/ui/TableElements";
import { cn } from "@/lib/utils";

function ScheduleRow(props) {
  const {
    number,
    short_title,
    title,
    express_type,
    uid,
    carrier,
    transport_subtype,
  } = props.thread;

  return (
    <div
      className={cn(
        "schedule-grid table-row-base",
        props.departed && "opacity-60"
      )}
    >
      <ThreadElem
        number={number}
        threadName={short_title}
        threadUrl={`/thread?uid=${uid}&date=${
          props.date || ""
        }&name=${title}&number=${number}`}
        variant="lg_thread"
        carrier={carrier.title}
        expressName={express_type ? transport_subtype.title : null}
        className="md:row-span-1 row-span-2"
      />
      <TimeElem
        timestamp={props.arrival}
        date={props.date}
        className="text-foreground/40 text-center md:self-center self-end"
      />
      <TimeElem
        timestamp={props.departure}
        date={props.date}
        className="text-center md:self-center self-end"
      />

      <div className="table-base-text md:col-span-1 col-span-2">
        {props.except_days
          ? `${props.days}, кроме ${props.except_days}`
          : props.days}
      </div>
      <div className="table-base-text hidden md:block pl-3">
        {props.stops === "везде" ? (
          "со всеми остановками"
        ) : (
          <ClippedTextElem text={props.stops} />
        )}
      </div>
      <div className="table-base-text text-center ">
        {props.platform && <>{props.platform}</>}
      </div>
    </div>
  );
}

export default ScheduleRow;
