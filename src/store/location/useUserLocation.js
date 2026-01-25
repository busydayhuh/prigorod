import { useContext } from "react";
import { LocationContext } from "./Context";

export function useUserLocation() {
  return useContext(LocationContext);
}
