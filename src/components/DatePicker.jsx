/* eslint-disable react/prop-types */
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/select";

export function DatePickerWithPresets({ field, setValue }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
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
        <Select
          onValueChange={(value) =>
            setValue("date", addDays(new Date(), parseInt(value)))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="День" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="0">Сегодня</SelectItem>
            <SelectItem value="1">Завтра</SelectItem>
            <SelectItem value="7">Через неделю</SelectItem>
          </SelectContent>
        </Select>
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
