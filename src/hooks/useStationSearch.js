import { useApi } from "@/hooks/useApi";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

export function useStationSearch(fieldName) {
  const [search, setSearch] = useState("");
  const trimmedSearch = search.trim().toLowerCase();

  const { subscribe } = useFormContext();

  useEffect(() => {
    const label = `${fieldName}Label`;

    const updateLabel = subscribe({
      name: [label],
      formState: {
        values: true,
      },
      callback: ({ values }) => {
        setSearch(values[label]);
      },
    });

    return () => updateLabel();
  }, [subscribe, fieldName]);

  const {
    data: stations,
    isLoading,
    error,
  } = useApi("stations_search", { q: trimmedSearch });

  return { search, setSearch, stations, isLoading, error };
}
