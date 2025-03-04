"use client";
import { cn } from "@/lib/utils";
import { FaChevronDown } from "react-icons/fa";
import React from "react";
import { FormFilters } from "./form-filters";
interface Props {
  className?: string;
}

export const Accardion: React.FC<Props> = ({ className }) => {
  const [view, setView] = React.useState(false);

  return (
    <div className={cn("max-w-5xl mt-16", className)}>
      <div className="bg-white rounded-xl border-2">
        {/* Header */}
        <FormFilters />
        {/* Button */}
        <div
          onClick={() => setView(!view)}
          className="flex items-baseline gap-1 justify-center py-4 px-6 cursor-pointer"
        >
          {view ? "Расширеный поиск" : "Обычный поиск"}

          <FaChevronDown size={10} className={view ? "rotate-180" : ""} />
        </div>
        {/* Accardion */}
        <div
          className={cn(
            "overflow-hidden transition-all duration-200 ease-out",
            view && "h-auto"
          )}
          style={view ? { height: "100px" } : { height: "0px" }}
        >
          <div>Accardion</div>
        </div>
      </div>
    </div>
  );
};
