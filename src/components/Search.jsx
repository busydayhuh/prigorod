import React, { useState } from "react";
import { ArrowLeftRight } from "lucide-react";
import { format } from "date-fns";
import { useNavigate, useSearchParams } from "react-router";
import useApi from "@/lib/api";
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
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";

function Search() {
  const [initialParams] = useSearchParams();
  const initialDate = initialParams.get("date")
    ? new Date(initialParams.get("date"))
    : "";

  const [labels, setLabels] = useState({
    from: initialParams?.get("fromLabel") || "",
    to: initialParams?.get("toLabel") || "",
  });

  const [settlements, setSettlements] = useState({
    fromSettlement: "",
    fromDirection: "",
    toDirection: "",
    toSettlement: "",
  });

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
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center text-2xl">
          Расписание электричек
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-row justify-center flex-wrap gap-1.5 items-start"
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
                        placeholder="Откуда"
                        errors={form.formState.errors.from}
                        settlements={settlements}
                        setSettlements={setSettlements}
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <Button type="button" onClick={handleSwap} size="sm">
              <ArrowLeftRight />
            </Button>
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
                        placeholder="Куда"
                        errors={form.formState.errors.to}
                        settlements={settlements}
                        setSettlements={setSettlements}
                      />
                    </FormControl>
                    <FormMessage />
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
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <Button className="font-bold" type="submit">
              Поиск
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter />
    </Card>
  );
}

export default Search;
