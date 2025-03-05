/* eslint-disable react/prop-types */
import { TableCell, TableRow } from "@/components/shadcn/table";
import { Badge } from "../shadcn/badge";
import { getFormattedTime } from "@/lib/utils";
import { Link } from "react-router";

function ScheduleRow(props) {
  const { number, title, short_title, express_type, uid, carrier } =
    props.thread;

  return (
    <TableRow className={props.departed ? "opacity-50" : ""}>
      <TableCell>
        <Link to={`/thread?uid=${uid}&date=${props.date || ""}`}>
          <Badge variant="secondary">{`№ ${number}`}</Badge>
          {short_title}
        </Link>
      </TableCell>
      <TableCell>
        {props.arrival && props.departure ? (
          <>
            <span className="text-xl text-muted-foreground">
              {props.date ? getFormattedTime(props.arrival) : props.arrival}
            </span>
            <br />
            <span className="text-3xl font-medium">
              {props.date ? getFormattedTime(props.departure) : props.departure}
            </span>
          </>
        ) : (
          <span className="text-3xl font-medium">{`${
            props.date
              ? getFormattedTime(props.arrival) ||
                getFormattedTime(props.departure)
              : props.arrival || props.departure
          }`}</span>
        )}
      </TableCell>
      <TableCell>
        {props.except_days
          ? `${props.days}, кроме ${props.except_days}`
          : props.days}
      </TableCell>
      <TableCell>
        {props.stops === "везде" ? "со всеми остановками" : props.stops}
      </TableCell>
      {!!props.platform && <TableCell>{props.platform}</TableCell>}
    </TableRow>
  );
}

export default ScheduleRow;
