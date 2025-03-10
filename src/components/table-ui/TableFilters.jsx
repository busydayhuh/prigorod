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
import { useDirections } from "@/lib/api";

export function FiltersGroup({ children }) {
  return <div className="flex items-center gap-2">{children}</div>;
}

export function Toggles({ name, tableFilters, setTableFilters }) {
  return (
    <Toggle
      className="table-toggle oval-btn-icon"
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
      <SelectContent className="border-2 rounded-2xl">
        <SelectGroup>
          {!isLoading ? (
            directions.map((dir) => (
              <SelectItem
                className="rounded-[0.8rem] transition cursor-pointer"
                value={dir.code.toString()}
                key={dir.code}
              >
                {dir.title}
              </SelectItem>
            ))
          ) : (
            <SelectItem disabled>загрузка...</SelectItem>
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
