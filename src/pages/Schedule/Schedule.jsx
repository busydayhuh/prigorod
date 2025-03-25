import { useState } from "react";
import { useSearchParams } from "react-router";
import { useApi } from "@/services";
import { v4 as uuidv4 } from "uuid";

import ScheduleRow from "@/pages/Schedule/ScheduleRow";
import ResultsBody from "@/components/ResultsBody";
import { DatePickerSchedule } from "@/components/DatePicker";
import {
  PageHead,
  Loader,
  ErrorMessage,
  Toggles,
  SelectDirection,
  FiltersGroup,
} from "@/components/ui";

function ScheduleTable() {
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
        <DatePickerSchedule />
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
        error.status_code === 404 ? (
          <ErrorMessage variant="noStation" />
        ) : (
          <ErrorMessage variant="general" />
        )
      ) : (
        <div className="relative min-h-[30rem]">
          {isLoading && <Loader />}

          {data && (
            <ResultsBody
              route="schedule"
              isDepartedOpen={tableFilters.isDepartedOpen}
              expressOnly={tableFilters.expressOnly}
              renderRow={(segment, props) => {
                return (
                  <ScheduleRow
                    key={uuidv4()}
                    date={searchParams.get("date")}
                    {...segment}
                    {...props}
                  />
                );
              }}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default ScheduleTable;
