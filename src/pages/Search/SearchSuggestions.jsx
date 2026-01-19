import { Button } from "@/components/shadcn/button";
import { ErrorMessage } from "@/components/ui";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import { useSearchParams } from "react-router";

export default function SearchSuggestions({ suggestions }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const labels = {
    from: searchParams.get("fromLabel"),
    to: searchParams.get("toLabel"),
  };

  const searchSuggestedRoute = () => {
    searchParams.set("to", suggestions[0].code);
    searchParams.set("toLabel", suggestions[0].title);
    setSearchParams(searchParams);
  };

  return (
    <div className={cn("table-body")}>
      <ErrorMessage variant="noResults">
        {`Не найдено прямых рейсов по запросу ${labels.from} —
              ${labels.to}. Возможно, вы искали `}
        <Button
          variant="link"
          className="inline p-0 has-[>svg]:px-0 text-accent"
          onClick={searchSuggestedRoute}
        >
          {`${labels.from} — ${suggestions[0].title}`}
          <ArrowUpRight className="inline size-3 md:size-4" />
        </Button>
      </ErrorMessage>
    </div>
  );
}
