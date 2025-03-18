import { useState } from "react";
import { useSearchParams } from "react-router";
import { useApi } from "@/services";

import { filterExpress } from "@/lib/filterExpress";
import { cn } from "@/lib/utils";
import { v4 as uuidv4 } from "uuid";

import ScheduleRow from "@/pages/Schedule/ScheduleRow";
import { DatePickerShedule } from "@/components/DatePicker";
import {
  PageHead,
  Loader,
  ErrorMessage,
  Toggles,
  SelectDirection,
  FiltersGroup,
} from "@/components/table-ui";

function SheduleTable() {
  const [searchParams] = useSearchParams();
  const { data, isLoading, error } = useApi("schedule", searchParams);

  const [tableFilters, setTableFilters] = useState({
    isDepartedOpen: false,
    expressOnly: false,
  });

  const futureResults = (trains, expressOnly) => {
    if (trains.length === 0) return <ErrorMessage variant="noFutureResults" />;

    const filteredResults = expressOnly
      ? filterExpress(trains, expressOnly)
      : trains;

    if (filteredResults.length === 0)
      return <ErrorMessage variant="noExpress" />;

    return filteredResults.map((segment) => {
      return (
        <ScheduleRow
          key={uuidv4()}
          date={searchParams.get("date")}
          {...segment}
        />
      );
    });
  };

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
        <ErrorMessage variant="general" />
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
              futureResults(data.schedule.future, tableFilters.expressOnly)}
          </div>
        </div>
      )}
    </div>
  );
}

export default SheduleTable;
