import { cn } from "@/lib/utils";
import React from "react";
import { ChevronUp } from "lucide-react";
import useScrollHeight from "@/hooks/useScrollHeight";

function ScrollUpBtn() {
  const isShown = useScrollHeight();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      className={cn(
        "h-12 w-12 rounded-full bg-foreground text-primary-foreground bottom-8 right-8 flex justify-center items-center hover:bg-foreground/80",
        isShown && "fixed",
        !isShown && "hidden"
      )}
      onClick={scrollToTop}
    >
      <ChevronUp />
    </button>
  );
}

export default ScrollUpBtn;
