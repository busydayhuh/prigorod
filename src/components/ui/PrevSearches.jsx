import { usePrevSearches } from "@/store/form/usePrevSearches";
import { Clock2 } from "lucide-react";
import { useFormContext } from "react-hook-form";

export default function PrevSearches() {
  const { prevSearches } = usePrevSearches();
  const { reset } = useFormContext();

  return (
    <div className="flex flex-wrap items-center gap-1 mx-auto mt-1 px-3 w-[96%] max-w-6xl text-foreground/80">
      {prevSearches.length > 0 ?
        <>
          <Clock2 className="size-4" />
          {prevSearches.slice(0, 3).map((search) => {
            return (
              <button
                className="max-w-[50ch] text-xs truncate suggestion-links"
                key={search.from + search.to}
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
