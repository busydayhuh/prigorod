import { useState } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/shadcn/table";
import {
  Toggles,
  SelectDirection,
  FiltersGroup,
} from "../table-ui/TableFilters";
import { useSearchParams } from "react-router";
import useApi from "@/lib/api";
import ScheduleRow from "./ScheduleRow";
import { filterExpress } from "@/lib/filters";

import { DatePickerShedule } from "../DatePicker";
import { formatDateForParams } from "@/lib/utils";
import { v4 as uuidv4 } from "uuid";

function SheduleTable() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, isLoading, error } = useApi("schedule", searchParams);

  const [tableFilters, setTableFilters] = useState({
    isDepartedOpen: false,
    expressOnly: false,
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
    <div className="w-[min(56rem,96%)] mx-auto mt-20">
      <Toggles
        name="expressOnly"
        tableFilters={tableFilters}
        setTableFilters={setTableFilters}
      />
      <Toggles
        name="isDepartedOpen"
        tableFilters={tableFilters}
        setTableFilters={setTableFilters}
      />
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
                tableFilters.expressOnly
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

            {filterExpress(data.schedule.future, tableFilters.expressOnly).map(
              (segment) => {
                return (
                  <ScheduleRow
                    key={uuidv4()}
                    date={searchParams.get("date")}
                    {...segment}
                  />
                );
              }
            )}
          </TableBody>
        )}
      </Table>
    </div>
  );
}

export default SheduleTable;
