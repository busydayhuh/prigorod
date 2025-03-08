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

export function DatePickerWithPresets({ field, setValue, errors }) {
  const [selectedDayName, setSelectedDayName] = useState(null);

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
            "flex gap-1.5 items-center border-b-3 min-w-3xs pl-5 pr-15 py-4 hover:bg-transparent md:border-0 md:self-stretch lg:min-w-xs",
            errors && "border-red-500"
          )}
        >
          <CalendarIcon className="size-4" />
          {field.value ? (
            format(field.value, "PPP", {
              locale: ru,
            })
          ) : (
            <span>дата</span>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="flex flex-col space-y-2 p-6 popover-borders w-auto"
        sideOffset={0}
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

export function DatePickerShedule({ date }) {
  const [selectedDayName, setSelectedDayName] = useState(null);

  const handleClick = (e, dayName) => {
    if (!e.target.dataset.value) {
      date.setValue("");
      return;
    }

    const diffInDays = +e.target.dataset.value;

    date.setValue(addDays(new Date(), diffInDays));
    setSelectedDayName(dayName);
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className="min-w-[180px] justify-start text-left font-normal shadow-none"
        >
          <CalendarIcon />
          {date.value ? (
            format(date.value, "PPP", {
              locale: ru,
            })
          ) : (
            <span>все дни</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="flex w-auto flex-col space-y-2 p-2"
      >
        <div className="flex w-auto gap-1.5">
          <Button
            className="shadow-none"
            type="button"
            size="sm"
            variant={selectedDayName === "today" ? "default" : "outline"}
            onClick={(e) => handleClick(e, "today")}
            data-value="0"
          >
            сегодня
          </Button>
          <Button
            className="shadow-none"
            type="button"
            size="sm"
            variant={selectedDayName === "tomorrow" ? "default" : "outline"}
            onClick={(e) => handleClick(e, "tomorrow")}
            data-value="1"
          >
            завтра
          </Button>
          <Button
            className="shadow-none"
            type="button"
            size="sm"
            variant={selectedDayName === "all" ? "default" : "outline"}
            onClick={(e) => handleClick(e, "all")}
            data-value={null}
          >
            все дни
          </Button>
        </div>

        <div className="rounded-md border">
          <Calendar
            locale={ru}
            mode="single"
            selected={date.value}
            onSelect={date.setValue}
            disabled={(date) => date < addDays(new Date(), -1)}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
