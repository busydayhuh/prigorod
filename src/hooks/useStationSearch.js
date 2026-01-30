import { useApi } from "@/hooks/useApi";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useSearchParams } from "react-router";

export function useStationSearch(fieldName) {
  const [search, setSearch] = useState("");
  const [selectedCode, setSelectedCode] = useState("");
  const trimmedSearch = search.trim().toLowerCase();
  const { subscribe } = useFormContext();
  const [urlParams] = useSearchParams();

  useEffect(() => {
    const label = `${fieldName}Label`;

    const updateLabel = subscribe({
      name: [label, fieldName],
      formState: {
        values: true,
      },
      callback: ({ values }) => {
        setSearch(values[label]);
        setSelectedCode(values[fieldName]);
      },
    });

    return () => updateLabel();
  }, [subscribe, fieldName]);

  useEffect(() => {
    const label = `${fieldName}Label`;
    setSearch(urlParams.get(label) ?? "");
  }, [urlParams, fieldName]);

  const {
    data: stations,
    isLoading,
    error,
  } = useApi("stations_search", { q: trimmedSearch });

  return { search, setSearch, stations, isLoading, error, selectedCode };
}
