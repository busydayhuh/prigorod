import {
  Command,
  CommandDialog,
  CommandGroup,
  CommandInput,
  CommandList,
} from "@/components/shadcn/command";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { DialogTitle } from "../shadcn/dialog";
import { Input } from "../shadcn/input";
import { StationItems } from "./AutocompleteDesktop";

export function AutocompleteMobile({
  searchState,
  placeholder,
  formError,
  onStationSelect,
  clear,
}) {
  const { search, stations, isLoading, error, setSearch } = searchState;
  const [open, setOpen] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  const onSelect = (code, title) => {
    onStationSelect(code, title);

    setIsSelected(true);
    setOpen(false);
  };

  const openChange = (nextOpen) => {
    if (open && !nextOpen && !isSelected) {
      clear();
    }

    setOpen(nextOpen);
  };

  return (
    <div>
      <Input
        onFocus={() => {
          setIsSelected(false);
          setOpen(true);
        }}
        value={search}
        readOnly={true}
        placeholder={formError ? formError.message : placeholder}
        className={cn(
          "autocomplete-input",
          formError && "placeholder:text-accent",
        )}
      />
      <CommandDialog open={open} onOpenChange={openChange}>
        <DialogTitle className="sr-only">Поиск станции</DialogTitle>
        <Command shouldFilter={false} value={search}>
          <CommandInput
            placeholder={placeholder}
            value={search}
            onValueChange={setSearch}
            className="border-b-muted"
          />
          <CommandList className="p-0 w-full h-75">
            <CommandGroup
              heading={search ? "Результаты поиска" : "Случайные станции"}
              className="p-0!"
            >
              <StationItems
                stations={stations}
                isLoading={isLoading}
                error={error}
                onSelect={onSelect}
              />
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </div>
  );
}
