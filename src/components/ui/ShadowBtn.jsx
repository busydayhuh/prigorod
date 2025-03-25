/* eslint-disable react/prop-types */
import { cn } from "@/lib/utils";
import { Button } from "../shadcn/button";

function ShadowBtn({ children, className }) {
  return (
    <Button
      className={cn(
        "oval-btn-icon bg-primary-foreground hover:bg-accent shadow-(--row-shadow) active:translate-y-1 active:bg-accent",
        className
      )}
    >
      {children}
    </Button>
  );
}

export default ShadowBtn;
