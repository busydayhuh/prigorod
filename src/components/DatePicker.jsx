/* eslint-disable react/prop-types */
import { useState } from "react";
import { addDays, format } from "date-fns";
import { ru } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/shadcn/button";
import { Calendar } from "@/components/shadcn/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadcn/popover";
import { useLocation, useSearchParams } from "react-router";
import { formatDateForParams } from "@/lib/utils";

export function DatePickerWithPresets({ field, setValue, errors }) {
  const [selectedDayName, setSelectedDayName] = useState(null);
  const location = useLocation().pathname;

  const handleClick = (e, dayName) => {
    const diffInDays = +e.target.dataset.value;

    setValue("date", addDays(new Date(), diffInDays));
    setSelectedDayName(dayName);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          className={cn(
            "hidden md:flex gap-1.5 items-center border-b-3 min-w-3xs pl-5 pr-15 py-4 hover:bg-transparent md:border-0 md:self-stretch lg:min-w-xs",
            errors && "text-accent",
            location === "/" && "flex"
          )}
        >
          <CalendarIcon className="size-4" />
          {field.value ? (
            format(field.value, "PPP", {
              locale: ru,
            })
          ) : (
            <span>{errors ? errors.message : "дата"}</span>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="flex flex-col gap-4 p-6 pt-3 popover-borders w-auto"
        sideOffset={0.5}
      >
        <div className="flex w-auto gap-1.5 mb-3">
          <Button
            className={cn(
              "oval-btn-icon bg-background hover:bg-accent",
              selectedDayName === "today" && "bg-accent"
            )}
            type="button"
            size="sm"
            onClick={(e) => handleClick(e, "today")}
            data-value="0"
          >
            сегодня
          </Button>
          <Button
            className={cn(
              "oval-btn-icon bg-background hover:bg-accent",
              selectedDayName === "tomorrow" && "bg-accent"
            )}
            type="button"
            size="sm"
            onClick={(e) => handleClick(e, "tomorrow")}
            data-value="1"
          >
            завтра
          </Button>
        </div>

        <Calendar
          locale={ru}
          mode="single"
          selected={field.value}
          onSelect={field.onChange}
          disabled={(date) => date < addDays(new Date(), -1)}
        />
      </PopoverContent>
    </Popover>
  );
}

export function DatePickerSchedule() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedDayName, setSelectedDayName] = useState(null);

  const initialDate = searchParams.get("date");

  const setNewDate = (newDate) => {
    searchParams.set("date", formatDateForParams(newDate));
    setSearchParams(searchParams);
  };

  const handleClick = (e, dayName) => {
    setSelectedDayName(dayName);

    if (!e.target.dataset.value) {
      setNewDate("");
      return;
    }

    const diffInDays = +e.target.dataset.value;
    setNewDate(addDays(new Date(), diffInDays));
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="oval-btn-icon hover:bg-muted">
          <CalendarIcon className="size-4" />
          {initialDate ? (
            format(initialDate, "PPP", {
              locale: ru,
            })
          ) : (
            <span>все дни</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="flex flex-col gap-6 p-3 pb-6 w-auto border-2 rounded-2xl"
        sideOffset={3}
      >
        <div className="flex w-auto gap-1.5">
          <Button
            className={cn(
              "oval-btn-icon bg-background hover:bg-accent",
              selectedDayName === "today" && "bg-accent"
            )}
            type="button"
            size="sm"
            onClick={(e) => handleClick(e, "today")}
            data-value="0"
          >
            сегодня
          </Button>
          <Button
            className={cn(
              "oval-btn-icon bg-background hover:bg-accent",
              selectedDayName === "tomorrow" && "bg-accent"
            )}
            type="button"
            size="sm"
            onClick={(e) => handleClick(e, "tomorrow")}
            data-value="1"
          >
            завтра
          </Button>
          <Button
            className={cn(
              "oval-btn-icon bg-background hover:bg-accent",
              selectedDayName === "all" && "bg-accent"
            )}
            type="button"
            size="sm"
            onClick={(e) => handleClick(e, "all")}
            data-value={null}
          >
            все дни
          </Button>
        </div>

        <Calendar
          locale={ru}
          mode="single"
          selected={new Date(initialDate)}
          onSelect={setNewDate}
          disabled={(date) => date < addDays(new Date(), -1)}
        />
      </PopoverContent>
    </Popover>
  );
}
