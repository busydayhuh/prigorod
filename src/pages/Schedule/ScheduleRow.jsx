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
        className="self-center"
      />
      <TimeElem
        timestamp={props.arrival}
        date={props.date}
        className="text-foreground/40 text-center self-center text-[22px]"
      />
      <TimeElem
        timestamp={props.departure}
        date={props.date}
        className="text-center text-[22px] self-center"
      />

      <div className="table-base-text md:col-span-1 col-span-3 max-w-32">
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
      {props.platform ? (
        <div className="md:table-base-text text-center md:justify-self-center bg-foreground rounded-3xl text-secondary-foreground max-w-24 truncate px-1.5 py-1 text-xs md:text-sm self-center font-medium">
          {props.platform}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default ScheduleRow;
