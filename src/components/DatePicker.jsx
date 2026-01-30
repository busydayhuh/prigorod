import { Button } from "@/components/shadcn/button";
import { Calendar } from "@/components/shadcn/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadcn/popover";
import { cn, formatDateForParams } from "@/lib/utils";
import { addDays, format, isToday } from "date-fns";
import { ru } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { useSearchParams } from "react-router";

export function DatePicker({ field, variant }) {
  const { setValue, formState, getValues } = useFormContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedDayName, setSelectedDayName] = useState(null);

  const errors = formState.errors.date;
  const dateValue = getValues("date");

  function presetActive(label) {
    const today = isToday(dateValue);
    if (selectedDayName === label) return true;
    if (today && label === "сегодня") return true;

    return false;
  }

  function setUrlDate(newDate) {
    searchParams.set("date", formatDateForParams(newDate));
    setSearchParams(searchParams);
  }

  const variants = {
    inForm: {
      className:
        "flex gap-1.5 items-center min-w-3xs pl-3 hover:bg-primary/90 md:self-stretch lg:min-w-2xs autocomplete-input data-[state=open]:bg-primary/60 transition-colors duration-250",
      popoverSideOffset: 0.5,
      onSelect: field?.onChange,
    },
    asFilter: {
      className:
        "oval-btn-icon hover:bg-muted h-9 px-3 py-2 whitespace-nowrap transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer",
      popoverSideOffset: 3,
      onSelect: setUrlDate,
    },
  };

  const presets = [
    { label: "сегодня", value: 0 },
    { label: "завтра", value: 1 },
  ];

  const handleClick = (e, dayName) => {
    const newDate = addDays(new Date(), +e.target.dataset.value);

    setValue("date", newDate);
    setSelectedDayName(dayName);

    if (variant === "asFilter") {
      setUrlDate(newDate);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          className={cn(
            variants[variant].className,
            errors && "text-destructive",
          )}
        >
          <CalendarIcon className="size-4" />
          {getValues("date") ?
            isToday(dateValue) ?
              "сегодня"
            : format(dateValue, "PPP", {
                locale: ru,
              })

          : <span>{errors ? errors.message : "дата"}</span>}
        </div>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="flex flex-col gap-1.5 p-3 w-auto popover-borders"
        sideOffset={variants[variant].popoverSideOffset}
      >
        <div className="flex gap-1.5">
          {presets.map(({ label, value }) => (
            <Button
              key={label}
              className={cn(
                "border-2 rounded-3xl text-sm font-medium text-foreground hover:text-foreground inline-flex gap-2 border-(--color-border) items-center bg-primary focus-visible:border-2 focus-visible:ring-ring/50 focus-visible:ring-[1px]",
                presetActive(label) && "bg-destructive hover:bg-destructive",
              )}
              type="button"
              size="sm"
              onClick={(e) => handleClick(e, label)}
              data-value={value}
            >
              {label}
            </Button>
          ))}
        </div>
        <Calendar
          locale={ru}
          mode="single"
          selected={dateValue}
          onSelect={variants[variant].onSelect}
          disabled={(date) => date < addDays(new Date(), -1)}
        />
      </PopoverContent>
    </Popover>
  );
}
