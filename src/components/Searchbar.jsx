import React, { useRef, useState } from "react";
import { ArrowLeftRight } from "lucide-react";
import { format } from "date-fns";
import { useNavigate, useSearchParams } from "react-router";
import { AutoComplete } from "./Autocomplete";
import { Button } from "@/components/shadcn/button";
import searchSchema from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/shadcn/form";
import { DatePickerWithPresets } from "./DatePicker";
import { Search } from "lucide-react";

function Searchbar() {
  const [initialParams] = useSearchParams();
  const initialDate = initialParams.get("date")
    ? new Date(initialParams.get("date"))
    : "";

  const [labels, setLabels] = useState({
    from: initialParams?.get("fromLabel") || "",
    to: initialParams?.get("toLabel") || "",
  });

  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);

  const form = useForm({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      from: initialParams?.get("from") || "",
      to: initialParams?.get("to") || "",
      date: initialDate || "",
    },
  });

  const navigate = useNavigate();

  function onSubmit(values) {
    console.log(values);
    const dateFormatted = format(new Date(values.date), "yyyy-MM-dd");

    const params = new URLSearchParams({
      ...values,
      date: dateFormatted,
      fromLabel: labels.from,
      toLabel: labels.to,
    });
    navigate(`/results?${params}`);
  }

  function handleSwap() {
    setLabels((prev) => ({ from: prev.to, to: prev.from }));

    const currents = form.getValues();
    form.setValue("from", currents.to);
    form.setValue("to", currents.from);
  }

  return (
    <div className="absolute bottom-0 transform translate-y-[50%] bordered shadow-(--sb-shadow) max-w-5xl w-[90%] mx-auto md:pl-5 md:pr-2.5">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="sb-flex-horizontal"
        >
          <FormField
            control={form.control}
            name="from"
            render={({ field }) => (
              <FormItem>
                <div>
                  <FormControl>
                    <AutoComplete
                      labels={labels}
                      setLabels={setLabels}
                      field={field}
                      setValue={form.setValue}
                      placeholder="откуда"
                      errors={form.formState.errors.from}
                      forRef={inputRef1}
                    />
                  </FormControl>
                </div>
              </FormItem>
            )}
          />
          <div className="relative">
            <Button
              type="button"
              onClick={handleSwap}
              size="lg"
              className="absolute rounded-full transform left-1/2 md:translate-x-[-50%] translate-x-[-50%] translate-y-[-50%] hover:bg-primary rotate-90 md:rotate-0"
            >
              <ArrowLeftRight />
            </Button>
          </div>
          <FormField
            control={form.control}
            name="to"
            render={({ field }) => (
              <FormItem>
                <div>
                  <FormControl>
                    <AutoComplete
                      labels={labels}
                      setLabels={setLabels}
                      field={field}
                      setValue={form.setValue}
                      placeholder="куда"
                      errors={form.formState.errors.to}
                      forRef={inputRef2}
                    />
                  </FormControl>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <div>
                  <FormControl>
                    <DatePickerWithPresets
                      field={field}
                      setValue={form.setValue}
                      errors={form.formState.errors.date}
                    />
                  </FormControl>
                </div>
              </FormItem>
            )}
          />
          <Button
            className="md:ms-auto md:rounded-[50%] h-14 md:h-12 md:w-12 bg-accent text-primary hover:bg-accent/80"
            type="submit"
          >
            <Search className="size-5" />
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default Searchbar;
