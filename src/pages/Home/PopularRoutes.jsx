import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/shadcn/tabs";
import { LinkElem } from "@/components/ui";
import { useFormLabelsUpdater } from "@/context/FormContext";
import { usePrevSearchesUpdater } from "@/context/PrevSearchesContext";
import { allRoutes, moscowRoutes } from "@/lib/popularRoutes";
import { formatDateForParams } from "@/lib/utils";
import { EqualApproximately } from "lucide-react";
import { useFormContext } from "react-hook-form";
import HomeImage from "./HomeImage";

function PopularRoutes() {
  const today = formatDateForParams(new Date());
  const setPrevSearches = usePrevSearchesUpdater();

  const { setValue } = useFormContext();
  const updateFormLabels = useFormLabelsUpdater();

  function updateForm(from, to, fromLabel, toLabel) {
    setPrevSearches((prevSearches) => {
      return [
        {
          from: from,
          to: to,
          fromLabel: fromLabel,
          toLabel: toLabel,
        },
        ...prevSearches,
      ];
    });

    setValue("from", from);
    setValue("to", to);

    updateFormLabels({ fromLabel: fromLabel, toLabel: toLabel });
  }

  return (
    <section className="flex flex-col gap-5">
      <h3 className="md:text-4xl text-2xl font-bold mb-3">
        Популярные маршруты
      </h3>
      <div className="grid lg:grid-cols-[1fr_1fr] grid-cols-1 gap-15 lg:gap-10">
        <Tabs defaultValue="moscow" className="w-full">
          <TabsList className="bg-primary-foreground border-2 border-foreground rounded-2xl px-1 py-5 max-w-[100%] ">
            <TabsTrigger
              className="data-[state=active]:bg-foreground data-[state=active]:text-primary-foreground p-4 rounded-[0.8rem] font-normal md:text-sm text-xs"
              value="moscow"
            >
              в Московской обл.
            </TabsTrigger>
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-foreground data-[state=active]:text-primary-foreground p-4 rounded-[0.8rem] font-normal md:text-sm text-xs"
            >
              по всей стране
            </TabsTrigger>
          </TabsList>
          <TabsContent value="moscow">
            <div className="flex flex-col gap-3">
              {moscowRoutes.map(
                ({ title, desc, from, to, fromLabel, toLabel }) => {
                  return (
                    <div
                      className="table-row-base flex flex-col justify-start items-start gap-1"
                      key={title}
                    >
                      <LinkElem
                        className="md:text-xl text:lg font-medium"
                        url={`/results?from=${from}&to=${to}&date=${today}&fromLabel=${fromLabel}&toLabel=${toLabel}`}
                        onClick={() => updateForm(from, to, fromLabel, toLabel)}
                      >
                        {title}
                      </LinkElem>
                      <div className="text-accent md:text-sm text-xs flex items-baseline gap-1">
                        <EqualApproximately className="size-3" />
                        {desc}
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </TabsContent>
          <TabsContent value="all">
            <div className="flex flex-col gap-3">
              {allRoutes.map(
                ({ title, desc, from, to, fromLabel, toLabel }) => {
                  return (
                    <div
                      className="table-row-base flex flex-col justify-start items-start gap-1"
                      key={title}
                    >
                      <LinkElem
                        className="md:text-xl text:lg font-medium"
                        url={`/results?from=${from}&to=${to}&date=${today}&fromLabel=${fromLabel}&toLabel=${toLabel}`}
                        onClick={() => updateForm(from, to, fromLabel, toLabel)}
                      >
                        {title}
                      </LinkElem>
                      <div className="text-accent md:text-sm text-xs flex items-baseline gap-1">
                        <EqualApproximately className="size-3" />
                        {desc}
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </TabsContent>
        </Tabs>
        <HomeImage />
      </div>
    </section>
  );
}

export default PopularRoutes;
