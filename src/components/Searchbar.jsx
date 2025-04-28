import { Button } from "@/components/shadcn/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/shadcn/form";
import { useFormLabels, useFormLabelsUpdater } from "@/context/FormContext";
import {
  usePrevSearches,
  usePrevSearchesUpdater,
} from "@/context/PrevSearchesContext";
import { formatDateForParams } from "@/lib/utils";
import { ArrowLeftRight, Search } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router";
import { AutoComplete } from "./Autocomplete";
import { DatePicker } from "./DatePicker";
import PrevSearches from "./ui/PrevSearches";

function Searchbar() {
  const prevSearches = usePrevSearches();
  const setPrevSearches = usePrevSearchesUpdater();
  const navigate = useNavigate();

  const formLabels = useFormLabels();
  const updateFormLabels = useFormLabelsUpdater();

  const form = useFormContext();

  function onSubmit(values) {
    const params = new URLSearchParams({
      ...values,
      date: formatDateForParams(values.date),
      fromLabel: formLabels.fromLabel,
      toLabel: formLabels.toLabel,
    });

    setPrevSearches((prevSearches) => {
      return [
        {
          from: values.from,
          to: values.to,
          fromLabel: formLabels.fromLabel,
          toLabel: formLabels.toLabel,
        },
        ...prevSearches,
      ];
    });

    navigate(`/results?${params}`);
  }

  function handleSwap() {
    updateFormLabels((prev) => ({
      fromLabel: prev.toLabel,
      toLabel: prev.fromLabel,
    }));

    const currents = form.getValues();
    form.setValue("from", currents.to);
    form.setValue("to", currents.from);
  }

  return (
    <>
      <div className="border-3 md:rounded-[5.6rem] rounded-4xl overflow-hidden bg-primary-foreground shadow-(--sb-shadow) max-w-6xl w-[96%] mx-auto md:pl-5 md:pr-2.5">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full flex flex-col md:flex-row md:items-center md:text-lg grow"
          >
            <div className="w-full lg:w-auto flex items-center">
              <FormField
                control={form.control}
                name="from"
                render={({ field }) => (
                  <FormItem className="grow md:grow-0">
                    <div>
                      <FormControl>
                        <AutoComplete
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
                  className="absolute rounded-full transform left-1/2 md:translate-x-[-50%] translate-x-[-50%] translate-y-[-50%] hover:bg-foreground bg-foreground text-primary-foreground z-10"
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
                      <DatePicker field={field} variant="inForm" />
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
      <PrevSearches prevSearches={prevSearches} />
    </>
  );
}

export default Searchbar;
