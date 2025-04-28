import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/shadcn/tooltip";

function BadgeTooltip({ children, text }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="cursor-help">{children}</TooltipTrigger>
        <TooltipContent className="rounded-2xl">{text}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default BadgeTooltip;
