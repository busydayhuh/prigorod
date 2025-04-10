import React, { useEffect, useMemo, useState } from "react";
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
} from "@/components/shadcn/form";
import { DatePickerWithPresets } from "./DatePicker";
import { Search } from "lucide-react";

function Searchbar() {
  const [initialParams] = useSearchParams();

  const initialDate = useMemo(
    () =>
      initialParams.get("date") ? new Date(initialParams.get("date")) : null,
    [initialParams]
  );

  const [labels, setLabels] = useState({
    from: initialParams?.get("fromLabel") || "",
    to: initialParams?.get("toLabel") || "",
  });

  const form = useForm({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      from: initialParams?.get("from") || "",
      to: initialParams?.get("to") || "",
      date: initialDate,
    },
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (initialDate) form.setValue("date", initialDate);
  }, [initialDate, form]);

  function onSubmit(values) {
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
    <div className="absolute bottom-0 transform md:translate-y-[50%] translate-y-[70%] border-3 md:rounded-[5.6rem] rounded-4xl overflow-hidden bg-primary-foreground shadow-(--sb-shadow) max-w-5xl w-[96%] mx-auto md:pl-5 md:pr-2.5">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex flex-col md:flex-row md:items-center md:text-lg grow"
        >
          <div className="w-full flex items-center">
            <FormField
              control={form.control}
              name="from"
              render={({ field }) => (
                <FormItem className="grow md:grow-0">
                  <div>
                    <FormControl>
                      <AutoComplete
                        labels={labels}
                        setLabels={setLabels}
                        field={field}
                        setValue={form.setValue}
                        placeholder="откуда"
                        errors={form.formState.errors.from}
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
                className="absolute rounded-full transform left-1/2 md:translate-x-[-50%] translate-x-[-50%] translate-y-[-50%] hover:bg-foreground bg-foreground text-primary-foreground"
              >
                <ArrowLeftRight />
              </Button>
            </div>
            <FormField
              control={form.control}
              name="to"
              render={({ field }) => (
                <FormItem className="grow md:grow-0">
                  <div>
                    <FormControl>
                      <AutoComplete
                        labels={labels}
                        setLabels={setLabels}
                        field={field}
                        setValue={form.setValue}
                        placeholder="куда"
                        errors={form.formState.errors.to}
                      />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />
          </div>
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
            className="md:ms-auto md:rounded-[50%] h-14 md:h-12 md:w-12 bg-accent text-foreground hover:bg-accent/80"
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
