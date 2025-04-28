/* eslint-disable react/prop-types */
import { cn } from "@/lib/utils";
import { Button } from "../shadcn/button";

function ShadowBtn({ children, className }) {
  return (
    <Button
      className={cn(
        "bg-primary-foreground hover:bg-accent shadow-(--row-shadow) active:translate-y-1 active:bg-accent py-5 rounded-[10px] border-2 text-xs font-normal text-foreground hover:text-foreground inline-flex text-left gap-2 border-(--color-border)",
        className
      )}
    >
      {children}
    </Button>
  );
}

export default ShadowBtn;
