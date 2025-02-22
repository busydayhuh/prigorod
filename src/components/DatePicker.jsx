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

export function DatePickerWithPresets({ field, setValue }) {
  const [selectedDayName, setSelectedDayName] = useState(null);

  const handleClick = (e, dayName) => {
    const diffInDays = +e.target.dataset.value;

    setValue("date", addDays(new Date(), diffInDays));
    setSelectedDayName(dayName);
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "min-w-[180px] justify-start text-left font-normal shadow-none",
            !field.value && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {field.value ? (
            format(field.value, "PPP", {
              locale: ru,
            })
          ) : (
            <span>Дата</span>
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
        </div>

        <div className="rounded-md border">
          <Calendar
            locale={ru}
            mode="single"
            selected={field.value}
            onSelect={field.onChange}
            disabled={(date) => date < addDays(new Date(), -1)}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
