import { Button } from "@/components/shadcn/button";
import { ErrorMessage } from "@/components/ui";
import { getAPIParams } from "@/lib/getAPIParams";
import { cn } from "@/lib/utils";
import { useApi } from "@/services";
import { ArrowUpRight } from "lucide-react";
import { useSearchParams } from "react-router";

export default function SearchSuggestions() {
  const [searchParams, setSearchParams] = useSearchParams();
  const apiParams = getAPIParams(["from", "to", "date"], searchParams);
  const { data, isLoading } = useApi("search", apiParams);

  if (data.suggestions.length > 0) {
    return (
      <div
        className={cn(
          "table-body transition-opacity",
          isLoading && "opacity-20"
        )}
      >
        <ErrorMessage variant="noResults">
          {`Не найдено прямых рейсов по запросу ${searchParams.get(
            "fromLabel"
          )} —
              ${searchParams.get("toLabel")}. Возможно, вы искали `}
          <Button
            variant="link"
            className="inline p-0 has-[>svg]:px-0 text-accent"
            onClick={() => {
              searchParams.set("to", data.suggestions[0].code);
              searchParams.set("toLabel", data.suggestions[0].title);

              setSearchParams(searchParams);
            }}
          >
            {`${searchParams.get("fromLabel")} — ${data.suggestions[0].title}`}
            <ArrowUpRight className="inline size-3 md:size-4" />
          </Button>
        </ErrorMessage>
      </div>
    );
  }

  if (data.suggestions.length === 0) {
    return (
      <div
        className={cn(
          "table-body transition-opacity",
          isLoading && "opacity-20"
        )}
      >
        <ErrorMessage variant="noResults">
          {`Не найдено прямых рейсов по запросу ${searchParams.get(
            "fromLabel"
          )} —
              ${searchParams.get(
                "toLabel"
              )}. Убедитесь, что станции выбраны верно.`}
        </ErrorMessage>
      </div>
    );
  }
}
