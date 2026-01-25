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
import { useApi } from "@/hooks/useApi";
import { cn } from "@/lib/utils";
import {
  useFormLabels,
  useFormLabelsUpdater,
} from "@/store/form/FormContextProvider";
import { useIsDesktopContext } from "@/store/WindowSizeContext";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Command as CommandPrimitive } from "cmdk";
import { Loader, X } from "lucide-react";
import { useRef, useState } from "react";
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

  const {
    data: stations,
    isLoading,
    isError: isApiError,
  } = useApi("stations_search", { q: query });

  const reset = () => {
    updateFormLabels((prev) => ({ ...prev, [`${field.name}Label`]: "" }));
  };

  const onInputBlur = (e) => {
    if (e.target.classList.contains("autocomplete-input")) {
      return;
    }

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

  const isDesktop = useIsDesktopContext();

  if (!isDesktop) {
    return (
      <Drawer open={open} onOpenChange={setOpen} direction="bottom">
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
          <DrawerContent>
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
              className="pt-4 pl-3 border-l-0"
            />

            <CommandList className="max-h-auto">
              {isLoading && (
                <CommandPrimitive.Loading>
                  <div className="flex justify-center items-center p-1 h-20 text-foreground">
                    <Loader className="animate-spin" />
                  </div>
                </CommandPrimitive.Loading>
              )}
              {!isLoading && stations ?
                stations.length > 0 ?
                  <StationsList
                    stations={stations}
                    onSelectItem={onSelectItem}
                    selectedLabel={selectedLabel}
                    query={query}
                  />
                : null
              : null}
              {isApiError && <ApiErrorMessage />}
              {!isLoading ?
                <CommandEmpty>{emptyMessage ?? "No items."}</CommandEmpty>
              : null}
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
          className="p-0 w-(--radix-popover-trigger-width) max-h-75 popover-borders"
        >
          <CommandList className="max-h-87.5">
            {isLoading && (
              <CommandPrimitive.Loading>
                <div className="flex justify-center items-center gap-1 p-1 h-20 text-foreground text-sm">
                  <Loader className="animate-spin" /> Ищем станции...
                </div>
              </CommandPrimitive.Loading>
            )}
            {!isLoading && stations ?
              stations.length > 0 ?
                <StationsList
                  stations={stations}
                  onSelectItem={onSelectItem}
                  selectedLabel={selectedLabel}
                  query={query}
                />
              : null
            : null}
            {isApiError && <ApiErrorMessage />}
            {!isLoading ?
              <CommandEmpty>{emptyMessage ?? "No items."}</CommandEmpty>
            : null}
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

  const input = useRef(null);
  return (
    <div className="relative">
      <CommandPrimitive.Input
        ref={input}
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
            "shadow-none py-4 pl-5 border-foreground md:border-r-3 border-b-3 md:border-b-0 focus-visible:outline-0 focus-visible:ring-0 lg:min-w-sm text-foreground focus-visible:placeholder:text-muted-foreground placeholder:text-foreground autocomplete-input",
            errors && "placeholder:text-accent",
            field.name === "to" && "pl-8 border-l-3 md:border-l-0",
            className,
          )}
        />
      </CommandPrimitive.Input>
      <div
        role="button"
        tabIndex="0"
        className={cn(
          "hidden top-5 md:top-[30%] right-5 z-100 absolute hover:bg-muted p-1 rounded-full transition-colors reset-btn",
          open && "block",
        )}
        onClick={(e) => {
          e.stopPropagation();
          reset();
          input.current.focus();
          setValue(field.name, "");
        }}
      >
        <X className="size-4" />
      </div>
    </div>
  );
}

function StationsList({ stations, onSelectItem, selectedLabel, query }) {
  return (
    <CommandGroup
      heading={!query && "Случайные станции"}
      className="p-0 **:[[cmdk-group-heading]]:font-normal"
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
            "px-2 py-1.5 pb-2 border-b-3 last:border-b-0 hover:text-foreground transition cursor-pointer",
            selectedLabel === option.title ? "bg-accent" : null,
          )}
        >
          <div className="m-0 pb-0 text-base">
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
    <span className="block text-muted-foreground text-xs">
      {!!settlement && `${settlement}`}
      {settlement && direction ? ", " : null}
      {!!direction && `${direction} напр.`}
    </span>
  );
}

function ApiErrorMessage() {
  return (
    <CommandPrimitive.Loading>
      <div className="flex justify-center py-2.5 text-accent">
        Невозможно загрузить список. Обновите страницу или попробуйте позже.
      </div>
    </CommandPrimitive.Loading>
  );
}
