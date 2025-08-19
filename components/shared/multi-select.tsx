"use client";

import { useState, useRef, useEffect } from "react";
import { Check, ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface Option {
  value: string;
  label: string;
}

interface MultiSelectProps {
  options: Option[];
  value: Set<string>;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function MultiSelect({
  options,
  value,
  onChange,
  placeholder = "Выберите опции...",
  className,
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleOption = (optionValue: string) => {
    onChange(optionValue);
  };

  const selectOnly = (optionValue: string) => {
    // Отменяем все выбранные элементы
    value.forEach((selectedValue) => {
      if (selectedValue !== optionValue) {
        onChange(selectedValue);
      }
    });
    // Если нужный элемент не выбран, выбираем его
    if (!value.has(optionValue)) {
      onChange(optionValue);
    }
  };

  const selectExcept = (optionValue: string) => {
    // Сначала удаляем текущий элемент если он выбран
    if (value.has(optionValue)) {
      onChange(optionValue);
    }
    // Затем добавляем все остальные элементы которые не выбраны
    const allValues = options.map((opt) => opt.value);
    allValues.forEach((v) => {
      if (v !== optionValue && !value.has(v)) {
        onChange(v);
      }
    });
  };

  const removeValue = (optionValue: string) => {
    onChange(optionValue);
  };

  const getSelectedLabels = () => {
    return options
      .filter((option) => value.has(option.value))
      .map((option) => option.label);
  };

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      {/* Trigger */}
      <div
        className="flex min-h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex flex-wrap gap-1 flex-1">
          {value.size === 0 ? (
            <span className="text-muted-foreground">{placeholder}</span>
          ) : (
            <>
              {getSelectedLabels()
                .slice(0, 3)
                .map((label, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 rounded bg-secondary px-2 py-1 text-xs"
                  >
                    {label}
                    <X
                      className="h-3 w-3 cursor-pointer hover:text-destructive"
                      onClick={(e) => {
                        e.stopPropagation();
                        const option = options.find(
                          (opt) => opt.label === label
                        );
                        if (option) removeValue(option.value);
                      }}
                    />
                  </span>
                ))}
              {value.size > 3 && (
                <span className="text-xs text-muted-foreground">
                  +{value.size - 3} еще
                </span>
              )}
            </>
          )}
        </div>
        <ChevronDown
          className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")}
        />
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 max-h-60 overflow-auto rounded-md border bg-popover shadow-md">
          {options.map((option) => (
            <div
              key={option.value}
              className="relative flex items-center px-3 py-2 cursor-pointer hover:bg-accent group"
              onMouseEnter={() => setHoveredOption(option.value)}
              onMouseLeave={() => setHoveredOption(null)}
              onClick={() => toggleOption(option.value)}
            >
              <div className="flex items-center flex-1">
                <div className="flex h-4 w-4 items-center justify-center mr-2">
                  {value.has(option.value) && (
                    <Check className="h-4 w-4 text-primary" />
                  )}
                </div>
                <span className="text-sm">{option.label}</span>
              </div>

              {/* Action buttons on hover */}
              {hoveredOption === option.value && (
                <div className="flex gap-1 ml-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-6 px-2 text-xs bg-transparent"
                    onClick={(e) => {
                      e.stopPropagation();
                      selectExcept(option.value);
                    }}
                  >
                    Кроме
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-6 px-2 text-xs bg-transparent"
                    onClick={(e) => {
                      e.stopPropagation();
                      selectOnly(option.value);
                    }}
                  >
                    Только
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
