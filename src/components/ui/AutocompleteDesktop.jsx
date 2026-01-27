import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/shadcn/command";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from "@/components/shadcn/popover";
import { useStationSearch } from "@/hooks/useStationSearch";
import { cn } from "@/lib/utils";
import { Command as CommandPrimitive } from "cmdk";
import { useRef, useState } from "react";

export function AutocompleteDesktop({
  onStationSelect,
  clear,
  placeholder,
  field,
  formError,
}) {
  const { search, setSearch, stations, isLoading, error } = useStationSearch(
    field.name,
  );
  const [open, setOpen] = useState(false);
  const inputRef = useRef(null);

  const onSelect = (code, title) => {
    onStationSelect(code, title);

    setOpen(false);
    inputRef.current?.blur();
  };

  const closePopover = (e) => {
    if (e.target.name === field.name) {
      e.preventDefault();
      return;
    }
    clear();
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <Command shouldFilter={false} value={search}>
        <PopoverAnchor asChild>
          <CommandPrimitive.Input
            {...field}
            ref={inputRef}
            placeholder={formError ? formError.message : placeholder}
            onFocus={() => setOpen(true)}
            onKeyDown={(e) => setOpen(e.key !== "Escape")}
            value={search}
            onValueChange={setSearch}
            className={cn(formError && "placeholder:text-accent")}
          />
        </PopoverAnchor>

        <PopoverContent
          asChild
          onOpenAutoFocus={(e) => e.preventDefault()}
          onPointerDownOutside={closePopover}
          onFocusOutside={closePopover}
          onInteractOutside={closePopover}
          className="p-0 w-(--radix-popover-trigger-width) max-h-75 popover-borders"
        >
          <CommandList className="max-h-87.5">
            <CommandGroup
              heading={search ? "Результаты поиска" : "Случайные станции"}
              className="p-0"
            >
              <StationItems
                stations={stations}
                isLoading={isLoading}
                error={error}
                onSelect={onSelect}
              />
            </CommandGroup>
          </CommandList>
        </PopoverContent>
      </Command>
    </Popover>
  );
}

export function StationItems({ stations, onSelect, isLoading, error }) {
  const infoClasses = "flex justify-center data-[disabled=true]:opacity-100";

  if (isLoading)
    return (
      <CommandItem disabled className={cn(infoClasses, "animate-pulse")}>
        <span>Поиск...</span>
      </CommandItem>
    );
  if (error)
    return (
      <CommandItem disabled className={infoClasses}>
        <span>
          Невозможно загрузить список. Обновите страницу или попробуйте позже
        </span>
      </CommandItem>
    );
  if (!stations?.length)
    return (
      <CommandItem disabled className={infoClasses}>
        <span>Станция не найдена</span>
      </CommandItem>
    );

  return (
    <>
      {stations.map((station, i) => (
        <CommandItem
          key={station.code}
          value={station.code}
          onPointerDown={(e) => {
            e.preventDefault();
          }}
          onSelect={() => {
            onSelect(station.code, station.title);
          }}
          className="flex-col items-start gap-0 px-2 py-1.5 pb-2 border-b-2 last:border-b-0 hover:text-foreground transition cursor-pointer"
        >
          <p className="text-base">{station.title}</p>
          <p className="text-muted-foreground text-xs">
            {station.settlement || ""}
            {station.settlement && station.direction && ", "}
            {station.direction && `${station.direction} напр.`}
          </p>
        </CommandItem>
      ))}
    </>
  );
}
