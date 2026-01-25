import { useContext } from "react";
import { PrevSearchesContext } from "./Context";

export function usePrevSearches() {
  const ctx = useContext(PrevSearchesContext);

  if (!ctx) {
    console.log(
      "usePrevSearches should be used only inside PrevSearchesContext",
    );
    return;
  }

  return ctx;
}
