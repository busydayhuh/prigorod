/* eslint-disable react/prop-types */
import { TableCell, TableRow } from "@/components/shadcn/table";
import { Badge } from "../shadcn/badge";

function ScheduleRow(props) {
  const { number, title, short_title, express_type, uid, carrier } =
    props.thread;

  return (
    <TableRow className={props.departed ? "opacity-50" : ""}>
      <TableCell>
        <Badge variant="secondary">{`№ ${number}`}</Badge>
        {title}
      </TableCell>
      <TableCell>
        {props.arrival && props.departure ? (
          <>
            <span className="text-xl text-muted-foreground">
              {props.arrival}
            </span>
            <br />
            <span className="text-3xl font-medium">{props.departure}</span>
          </>
        ) : (
          <span className="text-3xl font-medium">{`${
            props.arrival || props.departure
          }`}</span>
        )}
      </TableCell>
      {!!props.platform && <TableCell>{props.platform}</TableCell>}
      <TableCell>
        {props.except_days
          ? `${props.days}, кроме ${props.except_days}`
          : props.days}
      </TableCell>
      <TableCell>
        {props.stops === "везде" ? "со всеми остановками" : props.stops}
      </TableCell>
    </TableRow>
  );
}

export default ScheduleRow;
