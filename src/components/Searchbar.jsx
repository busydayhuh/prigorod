import { Button } from "@/components/shadcn/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/shadcn/form";
import { scrollToElement } from "@/lib/scrollToElement";
import { formatDateForParams } from "@/lib/utils";
import { usePrevSearches } from "@/store/form/usePrevSearches";
import { ArrowLeftRight } from "lucide-react";
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
    scrollToElement(document.getElementById("heading"));
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
      <div className="space-y-4 w-full">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="gap-2 grid lg:grid-cols-[6fr_3fr] w-full"
          >
            <div className="items-center gap-0.5 lg:gap-2 grid lg:grid-cols-[1fr_0fr_1fr] w-full">
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
                  className="top-1/2 lg:top-0 left-1/2 lg:left-0 absolute lg:relative bg-foreground hover:bg-foreground rounded-full text-background rotate-90 lg:rotate-0 -translate-x-1/2 -translate-y-1/2 lg:translate-x-0 lg:translate-y-0"
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
            <div className="flex items-center gap-2">
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
                variant="destructive"
                className="shadow-(--sb-shadow) border-2 h-12 rounded-3xl md:h-14 font-headers text-sm"
                type="submit"
              >
                найти
              </Button>
            </div>
          </form>
        </Form>
        <PrevSearches />
      </div>
    </>
  );
}

export default Searchbar;
