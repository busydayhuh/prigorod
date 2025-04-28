/* eslint-disable react/prop-types */
import useLocalStorage from "@/hooks/useLocalStorage";
import { createContext, useContext } from "react";

const PrevSearchesContext = createContext();
const PrevSearchesUpdater = createContext();

export function usePrevSearches() {
  return useContext(PrevSearchesContext);
}

export function usePrevSearchesUpdater() {
  return useContext(PrevSearchesUpdater);
}

function PrevSearchesProvider({ children }) {
  const [prevSearches, setPrevSearches] = useLocalStorage("searches", []);

  return (
    <PrevSearchesContext.Provider value={prevSearches}>
      <PrevSearchesUpdater.Provider value={setPrevSearches}>
        {children}
      </PrevSearchesUpdater.Provider>
    </PrevSearchesContext.Provider>
  );
}

export default PrevSearchesProvider;
