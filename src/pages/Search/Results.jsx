import { useState } from "react";
import ResultsRow from "@/pages/Search/ResultsRow";
import SearchSuggestions from "@/pages/Search/SearchSuggestions";
import ResultsBody from "@/components/ResultsBody";
import { useSearchParams } from "react-router";
import { useApi } from "@/services";
import { v4 as uuidv4 } from "uuid";
import { DatePickerSchedule } from "@/components/DatePicker";
import {
  PageHead,
  Loader,
  ErrorMessage,
  Toggles,
  FiltersGroup,
} from "@/components/ui";

function ResultsTable() {
  const [searchParams] = useSearchParams();
  const { data, isLoading, error } = useApi("search", searchParams);

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
        <div className="relative">
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
