/* eslint-disable react/prop-types */
import { useState } from "react";
import { cn } from "@/lib/utils";
import useMediaQuery from "@/hooks/useMediaQuery";
import { Command as CommandPrimitive } from "cmdk";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/shadcn/command";
import { Input } from "@/components/shadcn/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadcn/popover";
import { useApi } from "@/services";
import { v4 as uuidv4 } from "uuid";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/shadcn/drawer";
import { Loader } from "lucide-react";

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
      setValue(field.name, "");
    }
  };

  const onSelectItem = (code, title) => {
    setLabels((prev) => ({ ...prev, [field.name]: title }));
    setSelectedLabel(title);
    setValue(field.name, code);
    setOpen(false);
  };

  const isDesktop = useMediaQuery("(width >= 48rem)");

  if (!isDesktop) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <Command shouldFilter={false}>
          <DrawerTrigger>
            <InputTrigger
              labels={labels}
              setLabels={setLabels}
              setQuery={setQuery}
              field={field}
              errors={errors}
              setOpen={setOpen}
              onInputBlur={onInputBlur}
              placeholder={placeholder}
            />
          </DrawerTrigger>

          {!open && <CommandList aria-hidden="true" className="hidden" />}
          <DrawerContent className="data-[vaul-drawer-direction=bottom]:rounded-t-2xl ">
            <VisuallyHidden>
              <DrawerTitle>Поиск станции</DrawerTitle>
            </VisuallyHidden>
            <InputTrigger
              labels={labels}
              setLabels={setLabels}
              setQuery={setQuery}
              field={field}
              errors={errors}
              setOpen={setOpen}
              onInputBlur={onInputBlur}
              placeholder={placeholder}
              className="pt-1 pl-3 border-l-0"
            />

            <CommandList className="max-h-auto">
              {isLoading && (
                <CommandPrimitive.Loading>
                  <div className="p-1 text-foreground flex items-center justify-center h-20">
                    <Loader className="animate-spin" />
                  </div>
                </CommandPrimitive.Loading>
              )}
              {!isLoading && stations ? (
                stations.length > 0 ? (
                  <StationsList
                    stations={stations}
                    onSelectItem={onSelectItem}
                    selectedLabel={selectedLabel}
                  />
                ) : null
              ) : null}
              {isApiError && <ApiErrorMessage />}
              {!isLoading ? (
                <CommandEmpty>{emptyMessage ?? "No items."}</CommandEmpty>
              ) : null}
            </CommandList>
          </DrawerContent>
        </Command>
      </Drawer>
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <Command shouldFilter={false}>
        <PopoverTrigger>
          <InputTrigger
            labels={labels}
            setLabels={setLabels}
            setQuery={setQuery}
            field={field}
            errors={errors}
            setOpen={setOpen}
            onInputBlur={onInputBlur}
            placeholder={placeholder}
          />
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
          className="w-[var(--radix-popover-trigger-width)] p-0 popover-borders max-h-[300px]"
        >
          <CommandList className="max-h-[350px]">
            {isLoading && (
              <CommandPrimitive.Loading>
                <div className="p-1 text-foreground flex items-center justify-center h-20 gap-1 text-sm">
                  <Loader className="animate-spin" /> Ищем станции...
                </div>
              </CommandPrimitive.Loading>
            )}
            {!isLoading && stations ? (
              stations.length > 0 ? (
                <StationsList
                  stations={stations}
                  onSelectItem={onSelectItem}
                  selectedLabel={selectedLabel}
                />
              ) : null
            ) : null}
            {isApiError && <ApiErrorMessage />}
            {!isLoading ? (
              <CommandEmpty>{emptyMessage ?? "No items."}</CommandEmpty>
            ) : null}
          </CommandList>
        </PopoverContent>
      </Command>
    </Popover>
  );
}

function InputTrigger({
  labels,
  setLabels,
  setQuery,
  field,
  errors,
  setOpen,
  onInputBlur,
  placeholder,
  className,
}) {
  return (
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
        placeholder={errors ? errors.message : placeholder}
        className={cn(
          "md:border-r-3 md:border-b-0 border-foreground border-b-3 pl-5 py-4 text-foreground placeholder:text-foreground focus-visible:ring-0 focus-visible:placeholder:text-muted-foreground shadow-none",
          errors && "placeholder:text-accent",
          field.name === "to" && "pl-8 border-l-3 md:border-l-0",
          className
        )}
      />
    </CommandPrimitive.Input>
  );
}

function StationsList({ stations, onSelectItem, selectedLabel, className }) {
  return (
    <CommandGroup className="p-0">
      {stations.map((option) => (
        <CommandItem
          key={uuidv4()}
          value={option.title}
          onMouseDown={(e) => e.preventDefault()}
          onSelect={() => {
            onSelectItem(option.code, option.title);
          }}
          className={cn(
            "px-2 py-1.5 pb-2 border-b-3 last:border-b-0 transition cursor-pointer hover:text-foreground",
            selectedLabel === option.title ? "bg-accent" : null
          )}
        >
          <div className="text-base pb-0 m-0 ">
            {option.title}
            <OptionDescription {...option} />
          </div>
        </CommandItem>
      ))}
    </CommandGroup>
  );
}

function OptionDescription({ settlement, direction }) {
  return (
    <span className="text-muted-foreground text-xs block">
      {!!settlement && `${settlement}`}
      {settlement && direction ? ", " : null}
      {!!direction && `${direction} напр.`}
    </span>
  );
}

function ApiErrorMessage() {
  return (
    <CommandPrimitive.Loading>
      <div className="py-2.5 flex justify-center text-accent">
        Невозможно загрузить список. Обновите страницу или попробуйте позже.
      </div>
    </CommandPrimitive.Loading>
  );
}
