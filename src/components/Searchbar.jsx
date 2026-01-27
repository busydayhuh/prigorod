import { Button } from "@/components/shadcn/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/shadcn/form";
import { formatDateForParams } from "@/lib/utils";
import { usePrevSearches } from "@/store/form/usePrevSearches";
import { ArrowLeftRight, Search } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router";
import { DatePicker } from "./DatePicker";
import { Autocomplete } from "./ui/Autocomplete";
import PrevSearches from "./ui/PrevSearches";

function Searchbar() {
  const navigate = useNavigate();
  const form = useFormContext();
  const { addPrevSearch } = usePrevSearches();

  function onSubmit(values) {
    const params = new URLSearchParams({
      ...values,
      date: formatDateForParams(values.date),
    });

    addPrevSearch({ ...values, date: undefined });
    navigate(`/results?${params}`);
  }

  function handleSwap() {
    form.reset(
      (prev) => ({
        ...prev,
        from: prev.to,
        to: prev.from,
        fromLabel: prev.toLabel,
        toLabel: prev.fromLabel,
      }),
      { keepDefaultValues: true },
    );
  }

  return (
    <>
      <div className="border-3 md:rounded-[5.6rem] rounded-4xl overflow-hidden bg-primary-foreground shadow-(--sb-shadow) max-w-6xl w-[96%] mx-auto md:pl-5 md:pr-2.5">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex md:flex-row flex-col md:items-center w-full md:text-lg grow"
          >
            <div className="flex items-center w-full lg:w-auto">
              <FormField
                control={form.control}
                name="from"
                render={({ field }) => (
                  <FormItem className="grow md:grow-0">
                    <div>
                      <FormControl>
                        <Autocomplete
                          field={field}
                          setFormValue={form.setValue}
                          placeholder="откуда"
                          formError={form.formState.errors.from}
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
                  className="left-1/2 z-10 absolute bg-foreground hover:bg-foreground rounded-full text-primary-foreground translate-x-[-50%] translate-y-[-50%] md:translate-x-[-50%] transform"
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
                        <Autocomplete
                          field={field}
                          setFormValue={form.setValue}
                          placeholder="куда"
                          formError={form.formState.errors.to}
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
              className="bg-accent hover:bg-accent/80 md:ms-auto md:rounded-[50%] md:w-12 h-14 md:h-12 text-foreground"
              type="submit"
            >
              <Search className="size-5" />
            </Button>
          </form>
        </Form>
      </div>
      <PrevSearches />
    </>
  );
}

export default Searchbar;
