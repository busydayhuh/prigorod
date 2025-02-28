import { useState } from "react";
import {
  Table,
  TableBody,
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

function ResultsTable() {
  const [searchParams] = useSearchParams();
  const { data, isLoading, isError } = useApi("search", searchParams);

  const [isDepartedOpen, setIsDepartedOpen] = useState(false);
  const [expressOnly, setExpressOnly] = useState(false);

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
          {isDepartedOpen &&
            filterExpress(data.departed, expressOnly).map((segment) => {
              return (
                <ResultsRow
                  key={`${segment.departure}${segment.thread.number}`}
                  departed={true}
                  {...segment}
                />
              );
            })}

          {filterExpress(data.future, expressOnly).map((segment) => {
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
