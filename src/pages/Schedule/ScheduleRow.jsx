/* eslint-disable react/prop-types */
import {
  ClippedTextElem,
  ThreadElem,
  TimeElem,
} from "@/components/ui/TableElements";
import BadgeTooltip from "@/components/ui/Tooltip";
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
        "schedule-grid table-row-base items-center",
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
        timestamp={props.departure}
        date={props.date}
        className="text-center md:text-left text-[22px]"
      />

      <div className="table-base-text md:col-span-1 col-span-3 max-w-32">
        <ClippedTextElem
          text={
            props.except_days
              ? `${props.days}, кроме ${props.except_days}`
              : props.days
          }
        />
      </div>
      <div className="table-base-text hidden md:block pl-3">
        {props.stops === "везде" ? (
          "со всеми остановками"
        ) : (
          <ClippedTextElem text={props.stops} />
        )}
      </div>
      {props.platform ? (
        <BadgeTooltip text={props.platform}>
          <div className="md:table-base-text text-center md:justify-self-center bg-foreground rounded-3xl text-secondary-foreground max-w-24 truncate px-1.5 py-1 text-xs md:text-sm self-center font-normal">
            {props.platform}
          </div>
        </BadgeTooltip>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default ScheduleRow;
