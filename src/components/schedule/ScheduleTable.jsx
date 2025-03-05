import { useState } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/shadcn/table";
import { Toggle } from "@/components/shadcn/toggle";
import { useSearchParams } from "react-router";
import useApi from "@/lib/api";
import { Eye, Rabbit, EyeClosed } from "lucide-react";
import ScheduleRow from "./ScheduleRow";
import { filterExpress } from "@/lib/filters";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/select";
import { DatePickerShedule } from "../DatePicker";
import { formatDateForParams } from "@/lib/utils";
import { v4 as uuidv4 } from "uuid";

function SheduleTable() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, isLoading, error } = useApi("schedule", searchParams);

  const [tableFilters, setTableFilters] = useState({
    isDepartedOpen: false,
    isExpressOnly: false,
  });

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
      <Toggle
        className="data-[state=on]:bg-foreground data-[state=on]:text-background hover:bg-foreground hover:text-background"
        variant="outline"
        onClick={() =>
          setTableFilters((prev) => ({
            ...prev,
            isExpressOnly: !prev.isExpressOnly,
          }))
        }
      >
        <Rabbit />
        Только экспресс
      </Toggle>
      <Toggle
        className="data-[state=on]:bg-foreground data-[state=on]:text-background hover:bg-foreground hover:text-background"
        variant="outline"
        onClick={() =>
          setTableFilters((prev) => ({
            ...prev,
            isDepartedOpen: !prev.isDepartedOpen,
          }))
        }
      >
        {tableFilters.isDepartedOpen ? <Eye /> : <EyeClosed />}
        Ушедшие
      </Toggle>
      <SelectDirection />
      <DatePickerShedule date={date} />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Поезд</TableHead>
            <TableHead>
              Прибытие
              <br />
              Отправление
            </TableHead>
            <TableHead>Дни следования</TableHead>
            <TableHead>Остановки</TableHead>
            <TableHead>Платформа</TableHead>
          </TableRow>
        </TableHeader>
        {isLoading ? (
          <TableBody>
            <TableRow>
              <TableCell>Loading...</TableCell>
            </TableRow>
          </TableBody>
        ) : error ? (
          <TableBody>
            <TableRow>
              <TableCell>Server Error</TableCell>
            </TableRow>
          </TableBody>
        ) : (
          <TableBody>
            {tableFilters.isDepartedOpen &&
              filterExpress(
                data.schedule.departed,
                tableFilters.isExpressOnly
              ).map((segment) => {
                return (
                  <ScheduleRow
                    key={uuidv4()}
                    departed={true}
                    date={searchParams.get("date")}
                    {...segment}
                  />
                );
              })}

            {filterExpress(
              data.schedule.future,
              tableFilters.isExpressOnly
            ).map((segment) => {
              return (
                <ScheduleRow
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

function SelectDirection() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, isLoading, error } = useApi("schedule", searchParams);
  const currentDirection = searchParams.get("direction") || "all";

  const directions = isLoading || error ? [] : data.directions;

  return (
    <Select
      defaultValue={currentDirection}
      onValueChange={(value) => {
        searchParams.set("direction", value);
        setSearchParams(searchParams);
      }}
    >
      <SelectTrigger className="w-[180px] focus-visible:ring-0">
        <SelectValue placeholder="Выберите направление" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {directions.map((dir) => (
            <SelectItem value={dir.code} key={dir.code}>
              {dir.title}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default SheduleTable;
