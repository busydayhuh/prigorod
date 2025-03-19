/* eslint-disable react/prop-types */
import { useState } from "react";
import { Toggles, FiltersGroup } from "@/components/ui/TableFilters";

import ResultsRow from "./ResultsRow";
import { useSearchParams } from "react-router";
import { useApi } from "@/services";

import { filterExpress } from "@/lib/filterExpress";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/shadcn/button";
import { DatePickerSchedule } from "@/components/DatePicker";
import { PageHead, Loader, ErrorMessage } from "@/components/ui";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

function ResultsTable() {
  const [searchParams] = useSearchParams();
  const { isLoading, error } = useApi("search", searchParams);

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
        error.status_code ? (
          <ErrorMessage variant="noStation" />
        ) : (
          <ErrorMessage variant="general" />
        )
      ) : (
        <div className="relative">
          {isLoading && <Loader />}
          <div
            className={cn(
              "table-body transition-opacity",
              isLoading && "opacity-20"
            )}
          >
            <SearchResults
              isDepartedOpen={tableFilters.isDepartedOpen}
              expressOnly={tableFilters.expressOnly}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function SearchResults({ isDepartedOpen, expressOnly }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data } = useApi("search", searchParams);

  if (!data) {
    return <div></div>;
  }

  // Нет доступных прямых рейсов, но есть предложения
  if (data.suggestions && data.suggestions.length > 0) {
    return (
      <ErrorMessage variant="noResults">
        {`Не найдено прямых рейсов по запросу ${searchParams.get("fromLabel")} —
            ${searchParams.get("toLabel")}. Возможно, вы искали `}
        <Button
          variant="link"
          className="p-0 inline has-[>svg]:px-0"
          onClick={() => {
            searchParams.set("to", data.suggestions[0].code);
            searchParams.set("toLabel", data.suggestions[0].title);

            setSearchParams(searchParams);
          }}
        >
          {`${searchParams.get("fromLabel")} — ${data.suggestions[0].title}`}
          <ArrowUpRight className="md:size-4 size-3 inline" />
        </Button>
      </ErrorMessage>
    );
  }

  // Нет доступных прямых рейсов и нет предложений
  if (data.suggestions && data.suggestions.length === 0) {
    return (
      <ErrorMessage variant="noResults">
        {`Не найдено прямых рейсов по запросу ${searchParams.get("fromLabel")} —
            ${searchParams.get(
              "toLabel"
            )}. Убедитесь, что станции выбраны верно.`}
      </ErrorMessage>
    );
  }

  // Есть прямые рейсы (основной кейс)
  const filteredFutureResults = expressOnly
    ? filterExpress(data.future, expressOnly)
    : data.future;

  return (
    <>
      {isDepartedOpen &&
        filterExpress(data.departed, expressOnly).map((segment) => {
          return <ResultsRow key={uuidv4()} departed={true} {...segment} />;
        })}

      {/* Если нет будущих рейсов, выводим сообщение */}
      {data.future.length === 0 ? (
        <ErrorMessage variant="noFutureResults" />
      ) : filteredFutureResults.length === 0 ? (
        <ErrorMessage variant="noExpress" />
      ) : (
        filteredFutureResults.map((segment) => {
          return <ResultsRow key={uuidv4()} {...segment} />;
        })
      )}
    </>
  );
}

export default ResultsTable;
