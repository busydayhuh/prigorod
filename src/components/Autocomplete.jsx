/* eslint-disable react/prop-types */
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Command as CommandPrimitive } from "cmdk";
import { Loader2 } from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "./shadcn/command";
import { Input } from "./shadcn/input";
import { Popover, PopoverContent, PopoverTrigger } from "./shadcn/popover";
import { Skeleton } from "./shadcn/skeleton";

export function AutoComplete({
  stations,
  isLoading,
  emptyMessage = "Нет станций с таким именем.",
  placeholder = "Поиск...",
  field,
  setValue,
  labels,
  setLabels,
}) {
  const [open, setOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState("");

  const reset = () => {
    setLabels((prev) => ({ ...prev, [field.name]: "" }));
  };

  const filter = (value, search) => {
    if (
      search &&
      value.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    )
      return 1;
    return 0;
  };

  const onInputBlur = (e) => {
    if (
      !e.relatedTarget?.hasAttribute("cmdk-list") &&
      labels[field.name] !== selectedLabel
    ) {
      reset();
    }
  };

  const onSelectItem = (code, title) => {
    setLabels((prev) => ({ ...prev, [field.name]: title }));

    setSelectedLabel(title);
    setValue(field.name, code);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <Command filter={filter}>
        <PopoverTrigger asChild>
          <CommandPrimitive.Input
            asChild
            value={labels[field.name]}
            onValueChange={(value) =>
              setLabels((prev) => ({ ...prev, [field.name]: value }))
            }
            onKeyDown={(e) => setOpen(e.key !== "Escape")}
            onBlur={onInputBlur}
          >
            <Input placeholder={placeholder} />
          </CommandPrimitive.Input>
        </PopoverTrigger>
        {!open && <CommandList aria-hidden="true" className="hidden" />}
        <PopoverContent
          asChild
          onOpenAutoFocus={(e) => e.preventDefault()}
          onInteractOutside={(e) => {
            if (
              e.target instanceof Element &&
              e.target.hasAttribute("cmdk-input")
            ) {
              e.preventDefault();
            }
          }}
          className="w-[var(--radix-popover-trigger-width)] p-0"
        >
          <CommandList>
            {isLoading && (
              <CommandPrimitive.Loading>
                <div className="py-2.5 flex justify-center text-accent">
                  <Loader2 className="animate-spin" />
                </div>
              </CommandPrimitive.Loading>
            )}
            {!isLoading && stations.length > 0 ? (
              <CommandGroup>
                {stations.map((option) => (
                  <CommandItem
                    key={option.code}
                    value={option.title}
                    onMouseDown={(e) => e.preventDefault()}
                    onSelect={() => {
                      onSelectItem(option.code, option.title);
                    }}
                    className={cn(
                      "px-4 py-2",
                      selectedLabel === option.title ? "bg-accent" : null
                    )}
                  >
                    {option.title}
                  </CommandItem>
                ))}
              </CommandGroup>
            ) : null}
            {!isLoading ? (
              <CommandEmpty>{emptyMessage ?? "No items."}</CommandEmpty>
            ) : null}
          </CommandList>
        </PopoverContent>
      </Command>
    </Popover>
  );
}
