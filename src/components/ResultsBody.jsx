/* eslint-disable react/prop-types */
import { useApi } from "@/services";
import { useSearchParams } from "react-router";
import { filterExpress } from "@/lib/filterExpress";
import { cn } from "@/lib/utils";
import { ErrorMessage } from "@/components/ui";

function ResultsBody({ route, isDepartedOpen, expressOnly, renderRow }) {
  const [searchParams] = useSearchParams();
  const { data, isLoading } = useApi(route, searchParams);

  const filteredFutureResults = expressOnly
    ? filterExpress(data.future || data[route].future, expressOnly)
    : data.future || data[route].future;

  const filteredDepartedResults = expressOnly
    ? filterExpress(data.departed || data[route].future, expressOnly)
    : data.departed || data[route].future;

  return (
    <div
      className={cn("table-body transition-opacity", isLoading && "opacity-20")}
    >
      {isDepartedOpen &&
        filteredDepartedResults.map((segment) =>
          renderRow(segment, { departed: true })
        )}

      {expressOnly && filteredFutureResults.length === 0 ? (
        <ErrorMessage variant="noExpress" />
      ) : null}

      {!expressOnly && filteredFutureResults.length === 0 ? (
        <ErrorMessage variant="noFutureResults" />
      ) : null}

      {filteredFutureResults.length > 0 &&
        filteredFutureResults.map((segment) => renderRow(segment))}
    </div>
  );
}

export default ResultsBody;
