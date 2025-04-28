/* eslint-disable react/prop-types */
import useMediaQuery from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";
import { Command as CommandPrimitive } from "cmdk";
import { useState } from "react";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/shadcn/command";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/shadcn/drawer";
import { Input } from "@/components/shadcn/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadcn/popover";
import { useFormLabels, useFormLabelsUpdater } from "@/context/FormContext";
import { useApi } from "@/services";
import { Loader, X } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

export function AutoComplete({
  emptyMessage = "Нет станций с таким именем.",
  placeholder = "Поиск...",
  field,
}) {
  const [open, setOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState("");
  const [query, setQuery] = useState("");

  const formLabels = useFormLabels();
  const updateFormLabels = useFormLabelsUpdater();
  const { setValue } = useFormContext();

  console.log("open :>> ", open);

  const {
    data: stations,
    isLoading,
    isError: isApiError,
  } = useApi("stations_search", new URLSearchParams({ q: query }));

  const reset = () => {
    updateFormLabels((prev) => ({ ...prev, [`${field.name}Label`]: "" }));
  };

  const onInputBlur = (e) => {
    if (e.target.classList.contains("autocomplete-input")) {
      return;
    }
    console.log("e.target :>> ", e.target);
    console.log("blur");

    if (
      !e.relatedTarget?.hasAttribute("cmdk-list") &&
      formLabels[`${field.name}Label`] !== selectedLabel
    ) {
      reset();
      setValue(field.name, "");
    }
  };

  const onSelectItem = (code, title) => {
    setValue(field.name, code);
    updateFormLabels((prev) => ({ ...prev, [`${field.name}Label`]: title }));
    setSelectedLabel(title);

    setOpen(false);
  };

  const isDesktop = useMediaQuery("(width >= 48rem)");

  if (!isDesktop) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <Command shouldFilter={false}>
          <DrawerTrigger>
            <InputTrigger
              setQuery={setQuery}
              field={field}
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
              setQuery={setQuery}
              field={field}
              open={open}
              reset={reset}
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
                    query={query}
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
            setQuery={setQuery}
            field={field}
            open={open}
            reset={reset}
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
                  query={query}
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
  setQuery,
  field,
  open,
  reset,
  setOpen,
  onInputBlur,
  placeholder,
  className,
}) {
  const formLabels = useFormLabels();
  const updateFormLabels = useFormLabelsUpdater();
  const { formState, setValue } = useFormContext();
  const errors = formState.errors[field.name];
  return (
    <div className="relative">
      <CommandPrimitive.Input
        asChild
        value={formLabels[`${field.name}Label`]}
        onValueChange={(value) => {
          setQuery(value.trim().toLowerCase());
          updateFormLabels((prev) => ({
            ...prev,
            [`${field.name}Label`]: value,
          }));
        }}
        onBlur={onInputBlur}
        onKeyDown={(e) => setOpen(e.key !== "Escape")}
      >
        <Input
          data-name={field.name}
          placeholder={errors ? errors.message : placeholder}
          className={cn(
            "lg:min-w-sm md:border-r-3 md:border-b-0 border-foreground border-b-3 pl-5 py-4 text-foreground placeholder:text-foreground focus-visible:ring-0 focus-visible:outline-0 focus-visible:placeholder:text-muted-foreground shadow-none autocomplete-input",
            errors && "placeholder:text-accent",
            field.name === "to" && "pl-8 border-l-3 md:border-l-0",
            className
          )}
        />
      </CommandPrimitive.Input>
      <div
        role="button"
        tabIndex="0"
        className={cn(
          "reset-btn hidden absolute md:top-[30%] top-2 right-5 p-1 rounded-full hover:bg-muted transition-colors z-100",
          open && "block"
        )}
        onClick={(e) => {
          e.stopPropagation();
          reset();
          setValue(field.name, "");
        }}
      >
        <X className="size-4" />
      </div>
    </div>
  );
}

function StationsList({
  stations,
  onSelectItem,
  selectedLabel,
  query,
  className,
}) {
  return (
    <CommandGroup
      heading={!query && "Случайные станции"}
      className="p-0 [&_[cmdk-group-heading]]:font-normal"
    >
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
