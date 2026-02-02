import { usePrevSearches } from "@/store/form/usePrevSearches";
import { Clock2 } from "lucide-react";
import { useFormContext } from "react-hook-form";

export default function PrevSearches() {
  const { prevSearches } = usePrevSearches();
  const { reset } = useFormContext();

  return (
    <div className="flex flex-nowrap items-center gap-1 px-3 overflow-x-scroll text-foreground/80 hide-sb">
      {prevSearches.length > 0 ?
        <>
          <Clock2 className="size-4 shrink-0" />
          {prevSearches.slice(0, 3).map((search, index) => {
            return (
              <button
                className="max-w-[50ch] text-sm truncate suggestion-links"
                key={search.from + search.to + index}
                onClick={() => {
                  reset((prev) => ({ ...prev, ...search }), {
                    keepDefaultValues: true,
                  });
                }}
              >
                {`${search.fromLabel} — ${search.toLabel}`}
              </button>
            );
          })}
        </>
      : <button
          className="text-xs suggestion-links"
          onClick={() => {
            reset(
              (prev) => ({
                ...prev,
                from: "s2000002",
                to: "s9600681",
                fromLabel: "Москва (Ярославский вокзал)",
                toLabel: "Мытищи",
              }),
              {
                keepDefaultValues: true,
              },
            );
          }}
        >
          например, Москва — Мытищи
        </button>
      }
    </div>
  );
}
