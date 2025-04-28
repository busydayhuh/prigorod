/* eslint-disable react/prop-types */
import { useFormLabelsUpdater } from "@/context/FormContext";
import { Clock2 } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

export default function PrevSearches({ prevSearches }) {
  const { setValue } = useFormContext();
  const setLabels = useFormLabelsUpdater();

  return (
    <div className="flex gap-1 flex-wrap items-center max-w-6xl w-[96%] mx-auto px-3 mt-1 text-foreground/80">
      {prevSearches.length > 0 ? (
        <>
          <Clock2 className="size-4" />
          {prevSearches.slice(0, 3).map((search) => {
            return (
              <button
                className="suggestion-links text-xs max-w-[50ch] truncate"
                key={uuidv4()}
                onClick={() => {
                  setValue("to", search.to);
                  setValue("from", search.from);
                  setLabels({
                    toLabel: search.toLabel,
                    fromLabel: search.fromLabel,
                  });
                }}
              >
                {`${search.fromLabel} — ${search.toLabel}`}
              </button>
            );
          })}
        </>
      ) : (
        <button
          className="suggestion-links text-xs"
          onClick={() => {
            setValue("to", "s9600681");
            setValue("from", "s2000002");
            setLabels({
              toLabel: "Мытищи",
              fromLabel: "Москва (Ярославский вокзал)",
            });
          }}
        >
          например, Москва — Мытищи
        </button>
      )}
    </div>
  );
}
