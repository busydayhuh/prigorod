import useLocalStorage from "@/hooks/useLocalStorage";
import { useCallback } from "react";
import { PrevSearchesContext } from "./Context";

function PrevSearchesProvider({ children }) {
  const [prevSearches, setPrevSearches] = useLocalStorage("searches", []);

  const checkForDouble = useCallback(
    (search) => {
      const lastSearch = prevSearches[0];
      const isDouble = Object.keys(lastSearch).every(
        (key) => lastSearch[key] === search[key],
      );
      return isDouble;
    },
    [prevSearches],
  );

  const addPrevSearch = useCallback(
    (search) => {
      if (checkForDouble(search)) return;
      setPrevSearches((prev) => [search, ...prev]);
    },
    [checkForDouble, setPrevSearches],
  );

  return (
    <PrevSearchesContext.Provider value={{ prevSearches, addPrevSearch }}>
      {children}
    </PrevSearchesContext.Provider>
  );
}

export default PrevSearchesProvider;
