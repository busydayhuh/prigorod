import { useState } from "react";

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
import { v4 as uuidv4 } from "uuid";
import PageHead from "../table-ui/PageHead";

function SheduleTable() {
  const [searchParams] = useSearchParams();
  const { data, isLoading, error } = useApi("schedule", searchParams);

  const [tableFilters, setTableFilters] = useState({
    isDepartedOpen: false,
    expressOnly: false,
  });

  return (
    <div className="w-main">
      <PageHead title={searchParams.get("name")} />
      <FiltersGroup>
        <SelectDirection />
        <DatePickerShedule />
        <Toggles
          name="expressOnly"
          tableFilters={tableFilters}
          setTableFilters={setTableFilters}
          className="md:ms-auto"
        />
        <Toggles
          name="isDepartedOpen"
          tableFilters={tableFilters}
          setTableFilters={setTableFilters}
        />
      </FiltersGroup>

      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Server Error</div>
      ) : (
        <div className="table-body">
          {tableFilters.isDepartedOpen &&
            filterExpress(data.schedule.departed, tableFilters.expressOnly).map(
              (segment) => {
                return (
                  <ScheduleRow
                    key={uuidv4()}
                    departed={true}
                    date={searchParams.get("date")}
                    {...segment}
                  />
                );
              }
            )}

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
        </div>
      )}
    </div>
  );
}

export default SheduleTable;
