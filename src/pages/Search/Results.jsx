import { DatePicker } from "@/components/DatePicker";
import ResultsBody from "@/components/ResultsBody";
import { FiltersGroup, PageHead, Toggles } from "@/components/ui";
import { useApi } from "@/hooks/useApi";
import { useTableFilters } from "@/hooks/useTableFilters";
import { getAPIParams } from "@/lib/getAPIParams";
import ResultsRow from "@/pages/Search/ResultsRow";
import { useSearchParams } from "react-router";

function Results() {
  const [searchParams] = useSearchParams();

  const apiParams = getAPIParams(["from", "to", "date"], searchParams);
  const labels = {
    from: searchParams.get("fromLabel"),
    to: searchParams.get("toLabel"),
  };
  const date = searchParams.get("date");

  const { data, isLoading, error } = useApi("search", apiParams);
  const { tableFilters, setTableFilters } = useTableFilters();

  return (
    <div className="w-main">
      <PageHead title={`${labels.from} — ${labels.to}`} date={date} />

      <FiltersGroup>
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
        route="search"
        filters={tableFilters}
        data={data}
        error={error}
        isLoading={isLoading}
        noResultsText={
          <>
            Нет прямых рейсов по запросу <strong>{labels.from}</strong> —{" "}
            <strong>{labels.to}</strong>
          </>
        }
        renderRow={(segment, props, index) => {
          return (
            <ResultsRow
              key={
                segment.thread.uid + segment.thread.title + segment.departure
              }
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

export default Results;
