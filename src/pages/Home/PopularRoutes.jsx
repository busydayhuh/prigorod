import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/shadcn/tabs";
import { LinkElem } from "@/components/ui";
import { allRoutes, moscowRoutes } from "@/lib/popularRoutes";
import { formatDateForParams } from "@/lib/utils";
import { usePrevSearches } from "@/store/form/usePrevSearches";
import { EqualApproximately } from "lucide-react";
import { useFormContext } from "react-hook-form";
import HomeImage from "./HomeImage";

function PopularRoutes() {
  const today = formatDateForParams(new Date());
  const { addPrevSearch } = usePrevSearches();
  const { reset } = useFormContext();

  function updateForm(from, to, fromLabel, toLabel) {
    addPrevSearch({
      from,
      to,
      fromLabel,
      toLabel,
    });

    reset((prev) => ({ ...prev, from, to, fromLabel, toLabel }), {
      keepDefaultValues: true,
    });
  }

  return (
    <section className="flex flex-col gap-5">
      <h3 className="mb-3 font-bold text-2xl md:text-4xl">
        Популярные маршруты
      </h3>
      <div className="gap-15 lg:gap-10 grid grid-cols-1 lg:grid-cols-[1fr_1fr]">
        <Tabs defaultValue="moscow" className="w-full">
          <TabsList className="bg-primary-foreground px-1 py-5 border-2 border-foreground rounded-2xl max-w-full">
            <TabsTrigger
              className="data-[state=active]:bg-foreground p-4 rounded-[0.8rem] font-normal data-[state=active]:text-primary-foreground text-xs md:text-sm"
              value="moscow"
            >
              в Московской обл.
            </TabsTrigger>
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-foreground p-4 rounded-[0.8rem] font-normal data-[state=active]:text-primary-foreground text-xs md:text-sm"
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
                        className="font-medium md:text-xl text:lg"
                        url={`/results?from=${from}&to=${to}&date=${today}&fromLabel=${fromLabel}&toLabel=${toLabel}`}
                        onClick={() => updateForm(from, to, fromLabel, toLabel)}
                      >
                        {title}
                      </LinkElem>
                      <div className="flex items-baseline gap-1 text-accent text-xs md:text-sm">
                        <EqualApproximately className="size-3" />
                        {desc}
                      </div>
                    </div>
                  );
                },
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
                        className="font-medium md:text-xl text:lg"
                        url={`/results?from=${from}&to=${to}&date=${today}&fromLabel=${fromLabel}&toLabel=${toLabel}`}
                        onClick={() => updateForm(from, to, fromLabel, toLabel)}
                      >
                        {title}
                      </LinkElem>
                      <div className="flex items-baseline gap-1 text-accent text-xs md:text-sm">
                        <EqualApproximately className="size-3" />
                        {desc}
                      </div>
                    </div>
                  );
                },
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
