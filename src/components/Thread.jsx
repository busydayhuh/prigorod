/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/shadcn/table";

import { Link, useSearchParams } from "react-router";
import useApi from "@/lib/api";

import { DatePickerShedule } from "./DatePicker";
import { formatDateForParams, getHoursAndMinutes } from "@/lib/utils";
import { v4 as uuidv4 } from "uuid";
import { getFormattedTime } from "@/lib/utils";
import { Badge } from "@/components/shadcn/badge";
import { FiltersGroup } from "./table-ui/TableFilters";
import { StationElem, TimeElem } from "./table-ui/TableElements";

function ThreadTable() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, isLoading, error } = useApi("thread", searchParams);

  return (
    <div className="w-main">
      {/* {!isLoading && (
        <>
          <Badge variant="secondary">{`№ ${data.number}`}</Badge>
          {!!data.express_type && <span>{data.transport_subtype.title}</span>}
          <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
            {data.title}
          </h3>
          <span>{data.days}</span>
          {!!data.except_days && <span>Исключения: {data.except_days}</span>}
        </>
      )} */}
      <FiltersGroup>
        <DatePickerShedule />
      </FiltersGroup>
      <div className="thread-grid text-base text-foreground/40">
        <div className="pl-10">станция</div>
        <div>прибытие</div>
        <div>отправление</div>
        <div className="hidden md:block">стоянка</div>
      </div>

      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Server Error</div>
      ) : (
        <div className="table-body">
          {data.stops.map((segment) => {
            return (
              <ThreadRow
                key={uuidv4()}
                date={searchParams.get("date")}
                {...segment}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

function ThreadRow(props) {
  return (
    <div className="thread-grid table-row-base">
      <StationElem
        scheduleUrl={`/schedule?station=${props.station.code}&date=${props.date}`}
        stationName={props.station.title}
        platform={props.platform}
        variant="lg_station"
      />
      <TimeElem
        time={props.arrival}
        date={props.date || Date.now()}
        className="text-foreground/40 text-center"
      />
      <TimeElem
        time={props.departure}
        date={props.date || Date.now()}
        className="text-center"
      />

      <div className="hidden md:block text-center">
        {props.stop_time ? getHoursAndMinutes(props.stop_time) : ""}
      </div>
    </div>
  );
}

export default ThreadTable;
