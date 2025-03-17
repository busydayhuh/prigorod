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
import Loader from "../table-ui/Loader";
import { cn } from "@/lib/utils";

function SheduleTable() {
  const [searchParams] = useSearchParams();
  const { data, isLoading, error } = useApi("schedule", searchParams);

  const [tableFilters, setTableFilters] = useState({
    isDepartedOpen: false,
    expressOnly: false,
  });

  return (
    <div className="w-main">
      <PageHead
        title={searchParams.get("name")}
        date={searchParams.get("date")}
      />
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

      {error ? (
        <div>Server Error</div>
      ) : (
        <div className="relative">
          {isLoading && <Loader />}
          <div
            className={cn(
              "table-body transition-opacity",
              isLoading && "opacity-20"
            )}
          >
            {data &&
              tableFilters.isDepartedOpen &&
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

            {data &&
              filterExpress(data.schedule.future, tableFilters.expressOnly).map(
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
        </div>
      )}
    </div>
  );
}

export default SheduleTable;
