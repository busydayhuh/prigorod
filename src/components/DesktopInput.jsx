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
import { Command as CommandPrimitive } from "cmdk";
import { useState } from "react";

export function DesktopInput({ placeholder, field, formError, setFormValue }) {
  const { search, setSearch, stations, isLoading, error } = useStationSearch();
  const [open, setOpen] = useState(false);

  const onStationSelect = (code, title) => {
    setFormValue(field.name, code);
    setSearch(title);
    setOpen(false);
  };

  const clear = (e) => {
    // не сбрасывать текст, когда фокусируемся заново в том же инпуте
    if (e.relatedTarget?.name === field.name) return;
    setFormValue(field.name, "");
    setSearch("");
  };

  const closePopover = (e) => {
    if (e.target.name === field.name) e.preventDefault();
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <Command shouldFilter={false} value={search}>
        <PopoverAnchor asChild>
          <CommandPrimitive.Input
            {...field}
            placeholder={placeholder}
            onFocus={() => setOpen(true)}
            onKeyDown={(e) => setOpen(e.key !== "Escape")}
            value={search}
            onValueChange={setSearch}
            onBlur={(e) => clear(e)}
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
            <CommandGroup heading="Suggestions">
              {stations &&
                stations.map((station) => (
                  <CommandItem
                    key={station.code}
                    value={station.title}
                    onPointerDown={(e) => {
                      e.preventDefault();
                    }}
                    onSelect={(e) => {
                      onStationSelect(station.code, station.title);
                      console.log("select option :>> ", e);
                    }}
                  >
                    <span>{station.title}</span>
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </PopoverContent>
      </Command>
    </Popover>
  );
}
