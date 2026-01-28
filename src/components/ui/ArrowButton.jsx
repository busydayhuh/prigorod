import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import { Button } from "../shadcn/button";

export function ArrowButton({ size = "icon", className }) {
  return (
    <Button
      size={size}
      className={cn(
        "bg-secondary hover:bg-secondary border rounded-full",
        className,
      )}
    >
      <ArrowUpRight className="stroke-1.2" />
    </Button>
  );
}
