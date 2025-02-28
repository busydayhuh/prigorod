import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shadcn/table";
import Row from "./Row";
import { Button } from "@/components/shadcn/button";
import { useSearchParams } from "react-router";
import useApi from "@/lib/api";

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
    <>
      <div className="w-[min(56rem,96%)] mx-auto rounded-md border shadow-sm">
        <Button
          className="max-w-[150px]"
          onClick={() => setExpressOnly((prev) => !prev)}
        >
          Только экспрессы
        </Button>
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
            {isDepartedOpen ? (
              filterResults(data.departed).map((segment) => {
                return (
                  <Row
                    key={`${segment.departure}${segment.thread.number}`}
                    departed={true}
                    {...segment}
                  />
                );
              })
            ) : (
              <TableRow>
                <TableCell className="w-[100px]">
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setIsDepartedOpen(true);
                    }}
                  >
                    Показать
                  </Button>
                </TableCell>
              </TableRow>
            )}

            {filterResults(data.future).map((segment) => {
              return (
                <Row
                  key={`${segment.departure}${segment.thread.number}`}
                  {...segment}
                />
              );
            })}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

export default ResultsTable;
