/* eslint-disable react/prop-types */
import { useSearchParams } from "react-router";
import useApi from "@/lib/api";

import { DatePickerShedule } from "./DatePicker";
import { cn, getHoursAndMinutes } from "@/lib/utils";
import { v4 as uuidv4 } from "uuid";

import { FiltersGroup } from "./table-ui/TableFilters";
import { StationElem, TimeElem } from "./table-ui/TableElements";
import PageHead from "./table-ui/PageHead";

function ThreadTable() {
  const [searchParams] = useSearchParams();
  const { data, isLoading, error } = useApi("thread", searchParams);

  return (
    <div className="w-narrow">
      <PageHead
        number={searchParams.get("number")}
        title={searchParams.get("name")}
        isExpress={data?.transport_subtype?.title}
        days={data?.days}
        exception={data?.except_days}
      />

      <FiltersGroup>
        <DatePickerShedule />
      </FiltersGroup>

      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Server Error</div>
      ) : (
        <>
          <div className="thread-grid table-headers">
            <div></div>
            <div>прибытие</div>
            <div>отправление</div>
            <div className="md:block hidden">стоянка</div>
          </div>
          <div className="table-body w-narrow">
            {data.stops.map((segment) => {
              return (
                <ThreadRow key={uuidv4()} date={data.start_date} {...segment} />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

function ThreadRow(props) {
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

export default ThreadTable;
