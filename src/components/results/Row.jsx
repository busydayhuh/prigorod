/* eslint-disable react/prop-types */
import React from "react";
import { TableCell, TableRow } from "@/components/shadcn/table";
import { Badge } from "../shadcn/badge";
import { getFormattedTime, getHoursAndMinutes } from "@/lib/utils";

function ResultsRow(props) {
  const { number, title, short_title, express_type, uid, carrier } =
    props.thread;
  const price = props.tickets_info?.places[0].price.whole;

  return (
    <TableRow className={props.departed ? "opacity-50" : ""}>
      <TableCell className="w-[100px]">
        <Stop
          time={getFormattedTime(props.departure)}
          stop={props.from.title}
          platform={props.departure_platform}
        />
      </TableCell>
      <TableCell className="">
        <TravelTime travelTime={getHoursAndMinutes(props.duration)} />
      </TableCell>
      <TableCell>
        <Stop
          time={getFormattedTime(props.arrival)}
          stop={props.to.title}
          platform={props.arrival_platform}
        />
      </TableCell>
      <TableCell>
        <Badge variant="secondary">{`№ ${number}`}</Badge>
        {title}
      </TableCell>
      {!!price && (
        <TableCell>
          <Badge variant="default" className="text-2xl">
            {`${price} ₽`}
          </Badge>
        </TableCell>
      )}
    </TableRow>
  );
}

function Stop({ time, stop, platform }) {
  return (
    <div className="flex flex-col align-top gap-1">
      <div className="text-3xl font-medium">{time}</div>
      <div className="text-sm text-muted-foreground">{stop}</div>
      {!!platform && <Badge variant="secondary">{platform}</Badge>}
    </div>
  );
}

function TravelTime({ travelTime }) {
  return (
    <div className="text-sm text-muted-foreground py-1 border-b-1 border-solid border-accent min-w-[75px] text-center">
      {travelTime}
    </div>
  );
}
export default ResultsRow;
