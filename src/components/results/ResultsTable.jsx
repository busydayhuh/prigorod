/* eslint-disable react/prop-types */
import { useState } from "react";
import { Toggles, FiltersGroup } from "../table-ui/TableFilters";

import ResultsRow from "./ResultsRow";
import { useSearchParams } from "react-router";
import useApi from "@/lib/api";

import { filterExpress } from "@/lib/filters";
import { v4 as uuidv4 } from "uuid";
import { Button } from "../shadcn/button";
import { DatePickerShedule } from "../DatePicker";
import PageHead from "../table-ui/PageHead";

function ResultsTable() {
  const [searchParams] = useSearchParams();
  const { isLoading, error } = useApi("search", searchParams);

  const [tableFilters, setTableFilters] = useState({
    isDepartedOpen: false,
    expressOnly: false,
  });

  return (
    <div className="w-main">
      {!isLoading && (
        <PageHead
          title={`${searchParams.get("fromLabel")} — ${searchParams.get(
            "toLabel"
          )}`}
        />
      )}
      <FiltersGroup>
        <DatePickerShedule />
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

      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Server Error</div>
      ) : (
        <div className="table-body">
          <SearchResults
            isDepartedOpen={tableFilters.isDepartedOpen}
            expressOnly={tableFilters.expressOnly}
          />
        </div>
      )}
    </div>
  );
}

function SearchResults({ isDepartedOpen, expressOnly }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data } = useApi("search", searchParams);

  // Нет доступных прямых рейсов, но есть предложения
  if (data.suggestions && data.suggestions.length > 0) {
    return (
      <div>
        {`Не найдено прямых рейсов по запросу ${searchParams.get("fromLabel")} —
            ${searchParams.get("toLabel")}. Возможно, вы искали `}
        <Button
          variant="link"
          className="p-0"
          onClick={() => {
            searchParams.set("to", data.suggestions[0].code);
            searchParams.set("toLabel", data.suggestions[0].title);

            setSearchParams(searchParams);
          }}
        >
          {`${searchParams.get("fromLabel")} — ${data.suggestions[0].title}`}
        </Button>
      </div>
    );
  }

  // Нет доступных прямых рейсов и нет предложений
  if (data.suggestions && data.suggestions.length === 0) {
    return (
      <div>
        {`Не найдено прямых рейсов по запросу ${searchParams.get("fromLabel")} —
            ${searchParams.get(
              "toLabel"
            )}. Убедитесь, что станции выбраны верно.`}
      </div>
    );
  }

  // Есть прямые рейсы (основной кейс)
  return (
    <>
      {isDepartedOpen &&
        filterExpress(data.departed, expressOnly).map((segment) => {
          return <ResultsRow key={uuidv4()} departed={true} {...segment} />;
        })}

      {/* Если нет будущих рейсов, выводим сообщение */}
      {data.future.length === 0 ? (
        <div>На выбранную дату рейсов больше нет.</div>
      ) : (
        filterExpress(data.future, expressOnly).map((segment) => {
          return <ResultsRow key={uuidv4()} {...segment} />;
        })
      )}
    </>
  );
}

export default ResultsTable;
