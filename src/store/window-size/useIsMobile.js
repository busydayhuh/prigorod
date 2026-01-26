import { useContext } from "react";
import { IsMobileContext } from "./Context";

export function useIsMobile() {
  return useContext(IsMobileContext);
}
