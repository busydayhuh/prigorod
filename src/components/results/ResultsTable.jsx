import { useState } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shadcn/table";
import { Toggle } from "@/components/shadcn/toggle";
import ResultsRow from "./Row";
import { useSearchParams } from "react-router";
import useApi from "@/lib/api";
import { Eye, Rabbit } from "lucide-react";

function ResultsTable() {
  const [searchParams] = useSearchParams();
  const { data, isLoading, isError } = useApi("search", searchParams);

  const [isDepartedOpen, setIsDepartedOpen] = useState(false);
  const [expressOnly, setExpressOnly] = useState(false);

  const filterResults = (results) => {
    if (expressOnly) {
      const expressOnlyResults = results.filter((result) => {
        return result.thread.express_type;
      });

      return expressOnlyResults;
    }

    return results;
  };

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <div className="w-[min(56rem,96%)] mx-auto">
      <Toggle
        className="data-[state=on]:bg-foreground data-[state=on]:text-background hover:bg-foreground hover:text-background"
        variant="outline"
        onClick={() => setExpressOnly((prev) => !prev)}
      >
        <Rabbit />
        Только экспрессы
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
          {isDepartedOpen &&
            filterResults(data.departed).map((segment) => {
              return (
                <ResultsRow
                  key={`${segment.departure}${segment.thread.number}`}
                  departed={true}
                  {...segment}
                />
              );
            })}

          {filterResults(data.future).map((segment) => {
            return (
              <ResultsRow
                key={`${segment.departure}${segment.thread.number}`}
                {...segment}
              />
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

export default ResultsTable;
