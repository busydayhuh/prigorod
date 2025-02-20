import React, { useMemo, useState } from "react";
import { ArrowLeftRight } from "lucide-react";
import { useNavigate } from "react-router";
import useApi from "@/lib/api";
import { AutoComplete } from "./Autocomplete";
import { Button } from "@/components/shadcn/button";
import searchSchema from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/form";

function Search() {
  const form = useForm({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      from: "",
      to: "",
      // date: "",
    },
  });
  const navigate = useNavigate();

  const { data: stations, isLoading, isError } = useApi("stations_list");
  const [labels, setLabels] = useState({ from: "", to: "" });

  function onSubmit(values) {
    console.log("submitted");
    console.log(values);
  }

  function handleSwap() {
    setLabels((prev) => ({ from: prev.to, to: prev.from }));

    const currents = form.getValues();
    form.setValue("from", currents.to);
    form.setValue("to", currents.from);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="from"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <AutoComplete
                    labels={labels}
                    setLabels={setLabels}
                    field={field}
                    setValue={form.setValue}
                    fieldName="from"
                    stations={stations}
                    isLoading={isLoading}
                    placeholder="Откуда"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="button" onClick={handleSwap}>
            <ArrowLeftRight />
          </Button>
          <FormField
            control={form.control}
            name="to"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <AutoComplete
                    labels={labels}
                    setLabels={setLabels}
                    field={field}
                    setValue={form.setValue}
                    stations={stations}
                    isLoading={isLoading}
                    placeholder="Куда"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="font-bold" type="submit">
            Поиск
          </Button>
        </form>
      </Form>
    </>
  );
}

export default Search;
