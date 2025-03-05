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

function ThreadTable() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, isLoading, isError } = useApi("thread", searchParams);

  const [date, setDate] = useState({
    value: searchParams.get("date") || "",
    setValue(newValue) {
      setDate((prev) => ({
        ...prev,
        value: formatDateForParams(newValue),
      }));
      searchParams.set("date", formatDateForParams(newValue));
      setSearchParams(searchParams);
    },
  });

  return (
    <div className="w-[min(56rem,96%)] mx-auto">
      {!isLoading && (
        <>
          <Badge variant="secondary">{`№ ${data.number}`}</Badge>
          {!!data.express_type && <span>{data.transport_subtype.title}</span>}
          <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
            {data.title}
          </h3>
          <span>{data.days}</span>
          {!!data.except_days && <span>Исключения: {data.except_days}</span>}
        </>
      )}
      <DatePickerShedule date={date} />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Станция</TableHead>
            <TableHead>
              Прибытие
              <br />
              Отправление
            </TableHead>

            <TableHead>Стоянка</TableHead>
          </TableRow>
        </TableHeader>
        {isLoading ? (
          <TableBody>
            <TableRow>
              <TableCell>Loading...</TableCell>
            </TableRow>
          </TableBody>
        ) : (
          <TableBody>
            {data.stops.map((segment) => {
              return (
                <ThreadRow
                  key={uuidv4()}
                  date={searchParams.get("date")}
                  {...segment}
                />
              );
            })}
          </TableBody>
        )}
      </Table>
    </div>
  );
}

function ThreadRow(props) {
  return (
    <TableRow>
      <TableCell>
        <Link to={`/shedule?station=${props.station.code}&date=${props.date}`}>
          {props.station.title}
        </Link>
        <br />
        {!!props.platform && (
          <Badge variant="secondary">{props.platform}</Badge>
        )}
      </TableCell>
      <TableCell>
        {props.arrival && props.departure ? (
          <>
            <span className="text-xl text-muted-foreground">
              {getFormattedTime(props.arrival)}
            </span>
            <br />
            <span className="text-3xl font-medium">
              {getFormattedTime(props.departure)}
            </span>
          </>
        ) : (
          <span className="text-3xl font-medium">{`${
            getFormattedTime(props.arrival) || getFormattedTime(props.departure)
          }`}</span>
        )}
      </TableCell>

      <TableCell>
        {props.stop_time ? getHoursAndMinutes(props.stop_time) : ""}
      </TableCell>
    </TableRow>
  );
}

export default ThreadTable;
