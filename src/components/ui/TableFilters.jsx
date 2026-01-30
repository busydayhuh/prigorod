import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/select";
import { cn } from "@/lib/utils";
import { Eye, EyeClosed, Rabbit } from "lucide-react";
import { useSearchParams } from "react-router";
import { Toggle } from "../shadcn/toggle";

export function FiltersGroup({ children, className }) {
  return (
    <div
      className={cn("flex flex-wrap items-center gap-2 mb-4 w-full", className)}
    >
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
      {name === "express" ?
        <>
          <Rabbit />
          только экспресс
        </>
      : <>
          {tableFilters.isDepartedOpen ?
            <Eye />
          : <EyeClosed />}
          ушедшие
        </>
      }
    </Toggle>
  );
}

export function SelectDirection({ directions }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateDirection = (value) => {
    searchParams.set("direction", value);
    setSearchParams(searchParams);
  };

  return (
    <Select
      value={searchParams.get("direction") || "all"}
      onValueChange={updateDirection}
    >
      <SelectTrigger className="focus-visible:ring-0 w-45 oval-btn-icon">
        <SelectValue
          placeholder="выберите направление"
          className="line-clamp-1"
        />
      </SelectTrigger>
      <SelectContent className="px-0 py-0 border-2 rounded-2xl">
        <SelectGroup>
          {directions ?
            directions.map((dir) => (
              <SelectItem
                className="first:rounded-t-2xl last:rounded-b-2xl transition cursor-pointer"
                value={dir.code.toString()}
                key={dir.code}
              >
                {dir.title}
              </SelectItem>
            ))
          : <SelectItem disabled>ошибка загрузки</SelectItem>}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
