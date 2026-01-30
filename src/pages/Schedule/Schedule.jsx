import { DatePicker } from "@/components/DatePicker";
import ResultsBody from "@/components/ResultsBody";
import {
  FiltersGroup,
  PageHead,
  SelectDirection,
  Toggles,
} from "@/components/ui";
import { useApi } from "@/hooks/useApi";
import { useTableFilters } from "@/hooks/useTableFilters";
import { getAPIParams } from "@/lib/getAPIParams";
import ScheduleRow from "@/pages/Schedule/ScheduleRow";
import { useSearchParams } from "react-router";

function Schedule() {
  const [searchParams] = useSearchParams();
  const apiParams = getAPIParams(
    ["station", "date", "direction"],
    searchParams,
  );
  const { data, isLoading, error } = useApi("schedule", apiParams);
  const { tableFilters, setTableFilters } = useTableFilters();

  return (
    <div className="w-main">
      <PageHead
        title={searchParams.get("name")}
        date={searchParams.get("date")}
      />
      <FiltersGroup>
        <SelectDirection directions={data?.directions} />
        <DatePicker variant="asFilter" />
        <Toggles
          name="express"
          tableFilters={tableFilters}
          setTableFilters={setTableFilters}
          className="md:ms-auto"
        />
        <Toggles
          name="departed"
          tableFilters={tableFilters}
          setTableFilters={setTableFilters}
        />
      </FiltersGroup>

      <ResultsBody
        data={data}
        error={error}
        isLoading={isLoading}
        route="schedule"
        filters={tableFilters}
        noResultsText="На этой станции нет активных рейсов"
        renderRow={(segment, props, index) => {
          return (
            <ScheduleRow
              key={
                segment.thread.uid + segment.thread.title + segment.departure
              }
              date={searchParams.get("date")}
              {...segment}
              {...props}
              index={index}
            />
          );
        }}
      />
    </div>
  );
}

export default Schedule;
