import React, { useEffect, useState } from "react";
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
  const [isDepartedOpen, setIsDepartedOpen] = useState(false);

  const { data, isLoading, isError } = useApi("search", searchParams);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <div className="w-[min(56rem,96%)] mx-auto rounded-md border shadow-sm">
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
            data.departed.map((segment) => {
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

          {data.future.map((segment) => {
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
  );
}

export default ResultsTable;
