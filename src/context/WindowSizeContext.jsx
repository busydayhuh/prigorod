import { createContext, useContext, useEffect, useState } from "react";

const IsDesktopContext = createContext();

export function useIsDesktopContext() {
  return useContext(IsDesktopContext);
}

const DESKTOP_BOTTOM_SIZE = "(width >= 48rem)";

export function IsDesktopProvider({ children }) {
  const [match, setMatch] = useState(
    () => window.matchMedia(DESKTOP_BOTTOM_SIZE).matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(DESKTOP_BOTTOM_SIZE);
    const handler = () => setMatch(mediaQuery.matches);

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);
  return (
    <IsDesktopContext.Provider value={match}>
      {children}
    </IsDesktopContext.Provider>
  );
}
