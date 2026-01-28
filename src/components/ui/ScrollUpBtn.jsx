import useScrollHeight from "@/hooks/useScrollHeight";
import { cn } from "@/lib/utils";
import { ChevronUp } from "lucide-react";

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
        "right-8 bottom-8 flex justify-center items-center bg-secondary hover:bg-secondary/80 border rounded-full w-12 h-12 text-secondary-foreground",
        isShown && "fixed",
        !isShown && "hidden",
      )}
      onClick={scrollToTop}
    >
      <ChevronUp className="stroke-1" />
    </button>
  );
}

export default ScrollUpBtn;
