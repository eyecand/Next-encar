import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { GoQuestion } from "react-icons/go";

export const TooltipUI = ({ title }: { title: string }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <GoQuestion />
        </TooltipTrigger>
        <TooltipContent>
          <p className="w-44">{title}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
