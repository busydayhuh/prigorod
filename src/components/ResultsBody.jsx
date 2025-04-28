/* eslint-disable react/prop-types */
import { ErrorMessage } from "@/components/ui";
import { cn } from "@/lib/utils";
import { useApi } from "@/services";
import { useSearchParams } from "react-router";

function ResultsBody({ route, isDepartedOpen, expressOnly, renderRow }) {
  const [searchParams] = useSearchParams();
  const { data, isLoading } = useApi(route, searchParams);

  const filterExpress = (results, expressOnly) => {
    if (expressOnly) {
      const expressOnlyResults = results.filter((result) => {
        return result.thread.express_type;
      });

      return expressOnlyResults;
    }

    return results;
  };

  function getFilteredResults(timeframe) {
    if (!data) return;

    return expressOnly
      ? filterExpress(data[timeframe] || data[route][timeframe], expressOnly)
      : data[timeframe] || data[route][timeframe];
  }

  return (
    <div
      className={cn("table-body transition-opacity", isLoading && "opacity-20")}
    >
      {data &&
        isDepartedOpen &&
        getFilteredResults("departed").map((segment) =>
          renderRow(segment, { departed: true })
        )}

      {data && expressOnly && getFilteredResults("future").length === 0 ? (
        <ErrorMessage variant="noExpress" />
      ) : null}

      {data && !expressOnly && getFilteredResults("future").length === 0 ? (
        <ErrorMessage variant="noFutureResults" />
      ) : null}

      {data &&
        getFilteredResults("future").length > 0 &&
        getFilteredResults("future").map((segment) => renderRow(segment))}
    </div>
  );
}

export default ResultsBody;
