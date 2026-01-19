import { ErrorMessage, Loader } from "@/components/ui";
import { useTableFilters } from "@/hooks/useTableFilters";
import { cn } from "@/lib/utils";
import { useMemo } from "react";

function ResultsBody({
  route,
  renderRow,
  data,
  error,
  noResultsText,
  isLoading,
  filters,
}) {
  const { getFilteredResults } = useTableFilters();
  const results = useMemo(
    () =>
      data ?
        getFilteredResults(data.schedule, route, filters.express)
      : { future: [], departed: [] },
    [data, filters, getFilteredResults, route],
  );

  if (!data && isLoading)
    return (
      <div className="relative">
        <Loader />
      </div>
    );
  if (!data && error) return <ErrorMessage variant="general" />;
  if (data)
    return (
      <div className="relative">
        {isLoading && <Loader />}
        <div
          className={cn(
            "table-body relative transition-opacity",
            isLoading && "opacity-20",
          )}
        >
          <DepartedResultsBoundary results={results} filters={filters}>
            {(departedResults) =>
              departedResults.map((segment) =>
                renderRow(segment, { departed: true }),
              )
            }
          </DepartedResultsBoundary>

          <FutureResultsBoundary
            results={results}
            filters={filters}
            noResultsText={noResultsText}
          >
            {(futureResults) =>
              futureResults.map((segment) => renderRow(segment))
            }
          </FutureResultsBoundary>
        </div>
      </div>
    );
}

function FutureResultsBoundary({ results, filters, noResultsText, children }) {
  const noFutureTrains =
    results.future.length === 0 && results.departed.length !== 0;
  const noResults =
    results.future.length === 0 && results.departed.length === 0;

  if (noFutureTrains) return <ErrorMessage variant="noFutureResults" />;
  if (noResults && filters.express) return <ErrorMessage variant="noExpress" />;
  if (noResults)
    return <ErrorMessage variant="noResults">{noResultsText}</ErrorMessage>;

  return children(results.future);
}

function DepartedResultsBoundary({ results, filters, children }) {
  if (!filters.departed) return null;
  if (results.departed.length === 0)
    return (
      <div className="flex justify-center w-full">
        Нет ушедших поездов на эту дату
      </div>
    );

  return children(results.departed);
}

export default ResultsBody;
