import ResultsBody from "@/components/ResultsBody";
import { getAPIParams } from "@/lib/getAPIParams";
import ResultsRow from "@/pages/Search/ResultsRow";
import SearchSuggestions from "@/pages/Search/SearchSuggestions";
import { useApi } from "@/services";
import { useState } from "react";
import { useSearchParams } from "react-router";

import { DatePicker } from "@/components/DatePicker";
import {
  ErrorMessage,
  FiltersGroup,
  Loader,
  PageHead,
  Toggles,
} from "@/components/ui";
import { v4 as uuidv4 } from "uuid";

function ResultsTable() {
  const [searchParams] = useSearchParams();
  const apiParams = getAPIParams(["from", "to", "date"], searchParams);
  const { data, isLoading, error } = useApi("search", apiParams);

  const [tableFilters, setTableFilters] = useState({
    isDepartedOpen: false,
    expressOnly: false,
  });

  return (
    <div className="w-main">
      <PageHead
        title={`${searchParams.get("fromLabel")} — ${searchParams.get(
          "toLabel"
        )}`}
        date={searchParams.get("date")}
      />

      <FiltersGroup>
        <DatePicker variant="asFilter" />
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
          {data && data.suggestions && <SearchSuggestions />}
          {data && !data.suggestions && (
            <ResultsBody
              route="search"
              isDepartedOpen={tableFilters.isDepartedOpen}
              expressOnly={tableFilters.expressOnly}
              renderRow={(segment, props) => {
                return <ResultsRow key={uuidv4()} {...segment} {...props} />;
              }}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default ResultsTable;
