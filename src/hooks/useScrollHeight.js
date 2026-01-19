import { useEffect, useState } from "react";

export default function useScrollHeight() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isBtnShown, setIsBtnShown] = useState(false);

  useEffect(() => {
    const handler = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);

      if (scrollPosition > 350) return setIsBtnShown(true);
      setIsBtnShown(false);
    };

    window.addEventListener("scroll", handler);

    return () => window.removeEventListener("scroll", handler);
  }, [scrollPosition]);

  return isBtnShown;
}
