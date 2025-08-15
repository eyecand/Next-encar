"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";
import { GoQuestion } from "react-icons/go";

export const TooltipUI = ({ title }: { title: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip open={open}>
        <TooltipTrigger
          onClick={() => setOpen(!open)}
          onMouseLeave={() => {
            setOpen(false);
          }}
          onTouchStart={() => setOpen(!open)}
        >
          <GoQuestion />
        </TooltipTrigger>
        <TooltipContent>
          <p className="w-44">{title}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
