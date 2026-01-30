import diamond from "@/assets/diamond.svg";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/shadcn/tabs";
import { LinkElem } from "@/components/ui";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { FadeIn } from "@/components/ui/FadeIn";
import { allRoutes, moscowRoutes } from "@/lib/popularRoutes";
import { formatDateForParams } from "@/lib/utils";
import { usePrevSearches } from "@/store/form/usePrevSearches";
import { Clock2, EqualApproximately } from "lucide-react";
import { useFormContext } from "react-hook-form";

function PopularRoutes() {
  const today = formatDateForParams(new Date());
  const { addPrevSearch } = usePrevSearches();
  const { reset } = useFormContext();
  const triggerClasses =
    "data-[state=active]:bg-foreground h-8 rounded-2xl font-normal data-[state=active]:text-background text-[0.6rem] md:text-sm font-headers";

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
    <FadeIn delay={300}>
      <section className="flex flex-col gap-2 lg:gap-5 bg-primary md:px-8 lg:px-10 pt-6 lg:pt-8 pb-12 pl-6 border-2 rounded-[40px] shadow-(--row-shadow)">
        <h3 className="mb-3 font-headers text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
          Самые популярные маршруты
        </h3>

        <Tabs defaultValue="moscow" className="w-full">
          <TabsList className="bg-background px-1 py-5 border-2 border-foreground rounded-3xl max-w-full">
            <TabsTrigger className={triggerClasses} value="moscow">
              в Московской обл.
            </TabsTrigger>
            <TabsTrigger value="all" className={triggerClasses}>
              по всей стране
            </TabsTrigger>
          </TabsList>
          <TabsContent value="moscow">
            <div className="flex flex-col gap-5 lg:gap-8 mt-3 md:mt-6 lg:mt-8">
              {moscowRoutes.map(
                ({ title, desc, from, to, fromLabel, toLabel }) => {
                  return (
                    <div key={title} className="flex items-baseline gap-3">
                      <img src={diamond} alt="diamond" className="w-4 lg:w-6" />
                      <div className="flex flex-col gap-1">
                        <LinkElem
                          className="flex items-baseline gap-4 lg:gap-2 font-headers md:text-xl text:lg shrink-0"
                          url={`/results?from=${from}&to=${to}&date=${today}&fromLabel=${fromLabel}&toLabel=${toLabel}`}
                          onClick={() =>
                            updateForm(from, to, fromLabel, toLabel)
                          }
                        >
                          {title}
                          <ArrowButton className="hidden md:flex" />
                        </LinkElem>

                        <div className="flex items-center gap-1 font-headers text-muted-foreground text-xs">
                          <Clock2 className="size-3" />
                          {desc}
                        </div>
                      </div>
                    </div>
                  );
                },
              )}
            </div>
          </TabsContent>
          <TabsContent value="all">
            <div className="flex flex-col gap-5 lg:gap-8 mt-3 md:mt-6 lg:mt-8">
              {allRoutes.map(
                ({ title, desc, from, to, fromLabel, toLabel }) => {
                  return (
                    <div key={title} className="flex items-baseline gap-3">
                      <img src={diamond} alt="diamond" className="w-4 lg:w-6" />
                      <div className="flex flex-col gap-1">
                        <LinkElem
                          className="flex items-baseline gap-4 lg:gap-2 font-headers md:text-xl text:lg shrink-0"
                          url={`/results?from=${from}&to=${to}&date=${today}&fromLabel=${fromLabel}&toLabel=${toLabel}`}
                          onClick={() =>
                            updateForm(from, to, fromLabel, toLabel)
                          }
                        >
                          {title}
                          <ArrowButton className="hidden md:flex" />
                        </LinkElem>

                        <div className="flex items-baseline gap-1 font-headers text-xs">
                          <EqualApproximately className="size-3" />
                          {desc}
                        </div>
                      </div>
                    </div>
                  );
                },
              )}
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </FadeIn>
  );
}

export default PopularRoutes;
