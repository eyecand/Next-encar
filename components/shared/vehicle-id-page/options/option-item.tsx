"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CheckCheck } from "lucide-react";
import { OptionItemProps } from "./model";
import { useState } from "react";
export function OptionItem({ name, image, description }: OptionItemProps) {
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
          className="flex items-center gap-2 p-2 rounded hover:bg-gray-50 cursor-pointer transition-colors text-start"
        >
          <CheckCheck className="w-4 h-4 text-[#e05358] flex-shrink-0" />
          <span className={`text-sm  text-gray-900`}>{name}</span>
        </TooltipTrigger>
        <TooltipContent className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 max-w-xs ">
          <img
            src={image || "/placeholder.svg"}
            alt={"Изображение опции"}
            className="w-full h-32 object-cover rounded mb-2"
          />
          <h3 className="font-semibold text-sm mb-1">{name}</h3>
          <p className="text-xs text-gray-600">{description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
