/* eslint-disable react/prop-types */
import { Toggle } from "../shadcn/toggle";
import { Rabbit, Eye, EyeClosed } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/select";
import { useSearchParams } from "react-router";
import { useDirections } from "@/services";

export function FiltersGroup({ children }) {
  return (
    <div className="flex w-full items-center gap-2 flex-wrap mb-4">
      {children}
    </div>
  );
}

export function Toggles({ name, tableFilters, setTableFilters, className }) {
  return (
    <Toggle
      className={`table-toggle oval-btn-icon ${className}`}
      onClick={() =>
        setTableFilters((prev) => ({
          ...prev,
          [name]: !prev[name],
        }))
      }
    >
      {name === "expressOnly" ? (
        <>
          <Rabbit />
          только экспресс
        </>
      ) : (
        <>
          {tableFilters.isDepartedOpen ? <Eye /> : <EyeClosed />}
          ушедшие
        </>
      )}
    </Toggle>
  );
}

export function SelectDirection() {
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    data: directions,
    isLoading,
    error,
  } = useDirections(searchParams.get("station"));

  const updateDirection = (value) => {
    searchParams.set("direction", value);
    setSearchParams(searchParams);
  };

  return (
    <Select
      value={searchParams.get("direction") || "all"}
      onValueChange={updateDirection}
    >
      <SelectTrigger className="w-[180px] focus-visible:ring-0 oval-btn-icon">
        <SelectValue placeholder="выберите направление" />
      </SelectTrigger>
      <SelectContent className="border-2 rounded-2xl py-0 px-0">
        <SelectGroup>
          {!isLoading && !error ? (
            directions.map((dir) => (
              <SelectItem
                className="transition cursor-pointer first:rounded-t-2xl last:rounded-b-2xl"
                value={dir.code.toString()}
                key={dir.code}
              >
                {dir.title}
              </SelectItem>
            ))
          ) : !error ? (
            <SelectItem disabled>загрузка...</SelectItem>
          ) : (
            <SelectItem disabled>ошибка загрузки</SelectItem>
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
