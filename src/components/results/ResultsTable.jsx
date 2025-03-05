/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shadcn/table";
import { Toggle } from "@/components/shadcn/toggle";
import ResultsRow from "./ResultsRow";
import { useSearchParams } from "react-router";
import useApi from "@/lib/api";
import { Eye, Rabbit } from "lucide-react";
import { filterExpress } from "@/lib/filters";
import { v4 as uuidv4 } from "uuid";
import { Button } from "../shadcn/button";

function ResultsTable() {
  const [searchParams] = useSearchParams();
  const { isLoading, error } = useApi("search", searchParams);

  const [isDepartedOpen, setIsDepartedOpen] = useState(false);
  const [expressOnly, setExpressOnly] = useState(false);

  return (
    <div className="w-[min(56rem,96%)] mx-auto">
      <Toggle
        className="data-[state=on]:bg-foreground data-[state=on]:text-background hover:bg-foreground hover:text-background"
        variant="outline"
        onClick={() => setExpressOnly((prev) => !prev)}
      >
        <Rabbit />
        Только экспресс
      </Toggle>
      <Toggle
        className="data-[state=on]:bg-foreground data-[state=on]:text-background hover:bg-foreground hover:text-background"
        variant="outline"
        onClick={() => setIsDepartedOpen((prev) => !prev)}
      >
        <Eye />
        Ушедшие
      </Toggle>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Отправление</TableHead>
            <TableHead>Время в пути</TableHead>
            <TableHead>Прибытие</TableHead>
            <TableHead>Поезд</TableHead>
            <TableHead>Цена</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell>
                <Loader />
              </TableCell>
            </TableRow>
          ) : error ? (
            <TableRow>
              <TableCell>Server Error</TableCell>
            </TableRow>
          ) : (
            <SearchResults
              isDepartedOpen={isDepartedOpen}
              expressOnly={expressOnly}
              searchParams={searchParams}
            />
          )}
        </TableBody>
      </Table>
    </div>
  );
}

function Loader() {
  return <div>Loading...</div>;
}

function SearchResults({ isDepartedOpen, expressOnly }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data } = useApi("search", searchParams);

  // Нет доступных прямых рейсов, но есть предложения
  if (data.suggestions && data.suggestions.length > 0) {
    return (
      <TableRow>
        <TableCell colSpan={5}>
          {`Не найдено прямых рейсов по запросу ${searchParams.get(
            "fromLabel"
          )} —
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
        </TableCell>
      </TableRow>
    );
  }

  // Нет доступных прямых рейсов и нет предложений
  if (data.suggestions && data.suggestions.length === 0) {
    return (
      <TableRow>
        <TableCell colSpan={5}>
          {`Не найдено прямых рейсов по запросу ${searchParams.get(
            "fromLabel"
          )} —
            ${searchParams.get(
              "toLabel"
            )}. Убедитесь, что станции выбраны верно.`}
        </TableCell>
      </TableRow>
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
        <TableRow colSpan={5}>
          <TableCell>На выбранную дату рейсов больше нет.</TableCell>
        </TableRow>
      ) : (
        filterExpress(data.future, expressOnly).map((segment) => {
          return <ResultsRow key={uuidv4()} {...segment} />;
        })
      )}
    </>
  );
}

export default ResultsTable;
