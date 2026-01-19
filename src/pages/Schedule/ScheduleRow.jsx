import {
  ClippedTextElem,
  PlatformBadgeElem,
  ThreadElem,
  TimeElem,
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

  console.log("carrier :>> ", carrier);

  return (
    <div
      className={cn(
        "table-row-base items-center schedule-grid",
        props.departed && "opacity-60",
      )}
    >
      <ThreadElem
        number={number}
        threadName={short_title}
        threadUrl={`/thread?uid=${uid}&date=${
          props.date || ""
        }&name=${title}&number=${number}`}
        variant="lg_thread"
        carrier={carrier.code === 153 ? "ЦППК" : carrier.title}
        expressName={express_type ? transport_subtype.title : null}
        className="self-center"
      />
      <div className="flex flex-col gap-1">
        <TimeElem
          timestamp={props.departure || props.arrival}
          date={props.date}
          className="text-[22px]"
        />
        <p className="text-muted-foreground">
          {props.departure ? "отправление" : "прибытие"}
        </p>
      </div>

      <div className="table-base-text max-w-full md:max-w-32">
        <ClippedTextElem
          text={
            props.except_days ?
              `${props.days}, кроме ${props.except_days}`
            : props.days
          }
        />
      </div>
      <div
        className={cn(
          "hidden lg:block table-base-text pl-3",
          !props.platform && "col-span-2",
        )}
      >
        {props.stops === "везде" ?
          "со всеми остановками"
        : <ClippedTextElem text={props.stops} />}
      </div>
      {props.platform && (
        <div className="md:place-content-center grid">
          <PlatformBadgeElem platform={props.platform} />
        </div>
      )}
    </div>
  );
}

export default ScheduleRow;
