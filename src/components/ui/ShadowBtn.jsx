import { cn } from "@/lib/utils";
import { Button } from "../shadcn/button";

function ShadowBtn({ children, className }) {
  return (
    <Button
      className={cn(
        "bg-primary text-primary-foreground hover:bg-primary/90 shadow-(--row-shadow) active:translate-y-1  py-5 rounded-3xl border-2 text-[0.7rem] font-normal hover:text-foreground inline-flex text-left gap-2 border-(--color-border) font-headers",
        className,
      )}
    >
      {children}
    </Button>
  );
}

export default ShadowBtn;
