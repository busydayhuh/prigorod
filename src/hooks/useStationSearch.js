import { useApi } from "@/services";
import { useState } from "react";

export function useStationSearch() {
  const [search, setSearch] = useState("");
  const {
    data: stations,
    isLoading,
    error,
  } = useApi("stations_search", { q: search });
  return { search, setSearch, stations, isLoading, error };
}
