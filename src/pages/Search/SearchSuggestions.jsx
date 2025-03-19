import { useSearchParams } from "react-router";
import { ErrorMessage } from "@/components/ui";
import { cn } from "@/lib/utils";
import { useApi } from "@/services";

import { Button } from "@/components/shadcn/button";
import { ArrowUpRight } from "lucide-react";

export default function SearchSuggestions() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, isLoading } = useApi("search", searchParams);

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
            className="p-0 inline has-[>svg]:px-0"
            onClick={() => {
              searchParams.set("to", data.suggestions[0].code);
              searchParams.set("toLabel", data.suggestions[0].title);

              setSearchParams(searchParams);
            }}
          >
            {`${searchParams.get("fromLabel")} — ${data.suggestions[0].title}`}
            <ArrowUpRight className="md:size-4 size-3 inline" />
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
