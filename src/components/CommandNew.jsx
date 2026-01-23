import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/shadcn/command";
import { useStationSearch } from "@/hooks/useStationSearch";
import { CommandLoading } from "cmdk";
import { useState } from "react";
import { Input } from "./shadcn/input";

export function CommandNew({ placeholder, field, formError, setFormValue }) {
  const { search, setSearch, stations, isLoading, error } = useStationSearch();
  const [listOpen, setListOpen] = useState(false);

  console.log("search,  :>> ", search);

  const onStationSelect = (code, title) => {
    setFormValue(field.name, code);
    setSearch(title);
  };

  return (
    <Command className="border rounded-lg max-w-sm" shouldFilter={false}>
      <CommandInput asChild>
        <Input
          {...field}
          onMouseDown={() => setListOpen(true)}
          onBlur={() => setListOpen(false)}
          placeholder={formError ? formError.message : placeholder}
          onKeyDown={(e) => {
            setListOpen(true);
            setSearch(e.target.value);
          }}
        />
      </CommandInput>
      {listOpen && (
        <CommandList>
          {stations?.length === 0 && (
            <CommandEmpty>Станция не найдена</CommandEmpty>
          )}
          {isLoading && <CommandLoading />}
          {error && (
            <CommandEmpty>
              Невозможно загрузить список. Обновите страницу или попробуйте
              позже.
            </CommandEmpty>
          )}
          <CommandGroup heading="Suggestions">
            {stations &&
              stations.map((station) => (
                <CommandItem
                  key={station.code}
                  value={station.title}
                  onSelect={() => onStationSelect(station.code, station.title)}
                >
                  <span>{station.title}</span>
                </CommandItem>
              ))}
          </CommandGroup>
        </CommandList>
      )}
    </Command>
  );
}
