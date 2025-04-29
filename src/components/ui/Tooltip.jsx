import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/shadcn/tooltip";
import { useIsDesktopContext } from "@/context/WindowSizeContext";
import { Popover, PopoverContent, PopoverTrigger } from "../shadcn/popover";

function BadgeTooltip({ children, text }) {
  const isDesktop = useIsDesktopContext();

  if (!isDesktop) {
    return (
      <Popover>
        <PopoverTrigger>{children}</PopoverTrigger>
        <PopoverContent
          className="rounded-2xl w-fit text-sm py-1 px-2"
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
