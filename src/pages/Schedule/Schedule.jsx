import { DatePicker } from "@/components/DatePicker";
import ResultsBody from "@/components/ResultsBody";
import {
  FiltersGroup,
  PageHead,
  SelectDirection,
  Toggles,
} from "@/components/ui";
import { useTableFilters } from "@/hooks/useTableFilters";
import { getAPIParams } from "@/lib/getAPIParams";
import ScheduleRow from "@/pages/Schedule/ScheduleRow";
import { useApi } from "@/services";
import { useSearchParams } from "react-router";
import { v4 as uuidv4 } from "uuid";

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
    </div>
  );
}

export default Schedule;
