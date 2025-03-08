/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
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
import useApi from "@/lib/api";
import { v4 as uuidv4 } from "uuid";

export function AutoComplete({
  emptyMessage = "Нет станций с таким именем.",
  placeholder = "Поиск...",
  field,
  setValue,
  labels,
  setLabels,
  errors,
}) {
  const [open, setOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState("");
  const [query, setQuery] = useState("");

  const {
    data: stations,
    isLoading,
    isError: isApiError,
  } = useApi("stations_search", new URLSearchParams({ q: query }));

  const reset = () => {
    setLabels((prev) => ({ ...prev, [field.name]: "" }));
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
      <Command shouldFilter={false}>
        <PopoverTrigger asChild>
          <CommandPrimitive.Input
            asChild
            value={labels[field.name]}
            onValueChange={(value) => {
              setQuery(value.trim().toLowerCase());
              setLabels((prev) => ({ ...prev, [field.name]: value }));
            }}
            onBlur={onInputBlur}
            onKeyDown={(e) => setOpen(e.key !== "Escape")}
          >
            <Input
              data-name={field.name}
              placeholder={placeholder}
              className={cn(
                "md:border-r-3 md:border-b-0 border-b-3 pl-5 py-4",
                errors && "bg-red-400",
                field.name === "to" && "md:pl-8"
              )}
            />
          </CommandPrimitive.Input>
        </PopoverTrigger>
        {!open && <CommandList aria-hidden="true" className="hidden" />}
        <PopoverContent
          asChild
          onOpenAutoFocus={(e) => e.preventDefault()}
          onInteractOutside={(e) => {
            if (
              e.target instanceof Element &&
              e.target.dataset.name === field.name
            ) {
              e.preventDefault();
            }
          }}
          className="w-[var(--radix-popover-trigger-width)] p-0"
        >
          <CommandList className="popover-borders">
            {isLoading && (
              <CommandPrimitive.Loading>
                <div className="py-2.5 flex justify-center text-accent">
                  <Loader2 className="animate-spin" />
                </div>
              </CommandPrimitive.Loading>
            )}
            {isApiError && (
              <CommandPrimitive.Loading>
                <div className="py-2.5 flex justify-center text-red-500">
                  Невозможно загрузить список. Обновите страницу или попробуйте
                  позже.
                </div>
              </CommandPrimitive.Loading>
            )}
            {!isLoading && stations.length > 0 ? (
              <CommandGroup>
                {stations.map((option) => (
                  <CommandItem
                    key={uuidv4()}
                    value={option.title}
                    onMouseDown={(e) => e.preventDefault()}
                    onSelect={() => {
                      onSelectItem(option.code, option.title);
                    }}
                    className={cn(
                      "px-4 py-2 rounded-xl",
                      selectedLabel === option.title ? "bg-accent" : null
                    )}
                  >
                    <div>
                      {option.title}
                      <br />
                      <OptionDescription {...option} />
                    </div>
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

function OptionDescription({ settlement, direction }) {
  return (
    <span className="text-neutral-600 text-xs">
      {!!settlement && `${settlement}`}
      {settlement && direction ? ", " : null}
      {!!direction && `${direction} напр.`}
    </span>
  );
}
