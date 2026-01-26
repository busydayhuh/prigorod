import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/shadcn/tooltip";
import { useIsMobile } from "@/store/window-size/useIsMobile";
import { Popover, PopoverContent, PopoverTrigger } from "../shadcn/popover";

function BadgeTooltip({ children, text }) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Popover>
        <PopoverTrigger>{children}</PopoverTrigger>
        <PopoverContent
          className="px-2 py-1 rounded-2xl w-fit max-w-2xs text-sm wrap-break-word"
          sideOffset={1}
        >
          {text}
        </PopoverContent>
      </Popover>
    );
  }
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
