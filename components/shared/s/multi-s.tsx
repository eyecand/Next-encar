"use client";

import * as React from "react";
import { Check, ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { GradesProps } from "@/services/grades";

export interface MultiselectOption {
  value: string;
  label: string;
}

interface MultiselectProps {
  options: MultiselectOption[];
  value: string[];
  onChange: (value: string[]) => void;
  onChangeEng: (value: string[] | ((prev: string[]) => string[])) => void;
  onChangeDet: (value: string[] | ((prev: string[]) => string[])) => void;
  placeholder?: string;
  className?: string;
  onClearAll?: () => void;
  arr: GradesProps[];
  model: string | null;
}

export function Multiselect({
  options,
  value,
  onChange,
  onChangeEng,
  onChangeDet,
  placeholder = "Выберите опции...",
  className,
  onClearAll,
  arr,
  model,
}: MultiselectProps) {
  const [open, setOpen] = React.useState(false);

  const handleSelect = (selectedValue: string) => {
    const foundItem = (arr || []).find((item) => {
      const combinedStr =
        item.grade_english +
        (item.grade_detail_english ? " " + item.grade_detail_english : "");
      return combinedStr === selectedValue;
    });

    const isSelected = (value || []).includes(selectedValue);
    const newValue = isSelected
      ? (value || []).filter((item) => item !== selectedValue)
      : [...(value || []), selectedValue];

    onChange(newValue);

    if (foundItem) {
      if (isSelected) {
        onChangeEng((prev) =>
          (prev || []).filter((eng) => eng !== foundItem.grade_english)
        );
        if (foundItem.grade_detail_english) {
          onChangeDet((prev) =>
            (prev || []).filter((det) => det !== foundItem.grade_detail_english)
          );
        }
      } else {
        onChangeEng((prev) => [...(prev || []), foundItem.grade_english]);
        if (foundItem.grade_detail_english) {
          onChangeDet((prev) => [
            ...(prev || []),
            foundItem.grade_detail_english,
          ]);
        }
      }
    }
  };

  const handleSelectOnly = (selectedValue: string) => {
    const foundItem = (arr || []).find((item) => {
      const combinedStr =
        item.grade_english +
        (item.grade_detail_english ? " " + item.grade_detail_english : "");
      return combinedStr === selectedValue;
    });

    onChange([selectedValue]);

    if (foundItem) {
      onChangeEng([foundItem.grade_english]);
      if (foundItem.grade_detail_english) {
        onChangeDet([foundItem.grade_detail_english]);
      } else {
        onChangeDet([]);
      }
    }
  };

  const handleSelectExcept = (excludeValue: string) => {
    const allValuesExceptCurrent = (options || [])
      .map((option) => option.value)
      .filter((val) => val !== excludeValue);

    const currentSelection = value || [];
    const isCurrentlyExceptState =
      currentSelection.length === allValuesExceptCurrent.length &&
      allValuesExceptCurrent.every((val) => currentSelection.includes(val)) &&
      !currentSelection.includes(excludeValue);

    const newSelection = isCurrentlyExceptState ? [] : allValuesExceptCurrent;

    onChange(newSelection);

    const newEngArray: string[] = [];
    const newDetArray: string[] = [];

    // Get the excluded item details
    const excludedItem = (arr || []).find((item) => {
      const combinedStr =
        item.grade_english +
        (item.grade_detail_english ? " " + item.grade_detail_english : "");
      return combinedStr === excludeValue;
    });

    newSelection.forEach((selectedValue) => {
      const foundItem = (arr || []).find((item) => {
        const combinedStr =
          item.grade_english +
          (item.grade_detail_english ? " " + item.grade_detail_english : "");
        return combinedStr === selectedValue;
      });

      if (foundItem) {
        // Only add grade_english if it's not the excluded one OR if it appears in other selected combinations
        const shouldIncludeEng =
          excludedItem?.grade_english !== foundItem.grade_english ||
          newSelection.some((val) => {
            const otherItem = (arr || []).find((item) => {
              const combinedStr =
                item.grade_english +
                (item.grade_detail_english
                  ? " " + item.grade_detail_english
                  : "");
              return combinedStr === val;
            });
            return (
              otherItem &&
              otherItem.grade_english === foundItem.grade_english &&
              val !== selectedValue
            );
          });

        if (
          shouldIncludeEng &&
          !newEngArray.includes(foundItem.grade_english)
        ) {
          newEngArray.push(foundItem.grade_english);
        }

        // Only add grade_detail_english if it's not the excluded one OR if it appears in other selected combinations
        if (foundItem.grade_detail_english) {
          const shouldIncludeDet =
            excludedItem?.grade_detail_english !==
              foundItem.grade_detail_english ||
            newSelection.some((val) => {
              const otherItem = (arr || []).find((item) => {
                const combinedStr =
                  item.grade_english +
                  (item.grade_detail_english
                    ? " " + item.grade_detail_english
                    : "");
                return combinedStr === val;
              });
              return (
                otherItem &&
                otherItem.grade_detail_english ===
                  foundItem.grade_detail_english &&
                val !== selectedValue
              );
            });

          if (
            shouldIncludeDet &&
            !newDetArray.includes(foundItem.grade_detail_english)
          ) {
            newDetArray.push(foundItem.grade_detail_english);
          }
        }
      }
    });

    onChangeEng(newEngArray);
    onChangeDet(newDetArray);
  };

  const handleRemove = (valueToRemove: string) => {
    const newValue = (value || []).filter((item) => item !== valueToRemove);
    onChange(newValue);

    const newEngArray: string[] = [];
    const newDetArray: string[] = [];

    newValue.forEach((selectedValue) => {
      const foundItem = (arr || []).find((item) => {
        const combinedStr =
          item.grade_english +
          (item.grade_detail_english ? " " + item.grade_detail_english : "");
        return combinedStr === selectedValue;
      });

      if (foundItem) {
        if (!newEngArray.includes(foundItem.grade_english)) {
          newEngArray.push(foundItem.grade_english);
        }
        if (
          foundItem.grade_detail_english &&
          !newDetArray.includes(foundItem.grade_detail_english)
        ) {
          newDetArray.push(foundItem.grade_detail_english);
        }
      }
    });

    onChangeEng(newEngArray);
    onChangeDet(newDetArray);
  };

  const handleClearAll = () => {
    onChange([]);
    onChangeEng([]);
    onChangeDet([]);
    if (onClearAll) {
      onClearAll();
    }
  };

  const selectedOptions = (value || [])
    .map((val) => (options || []).find((option) => option.value === val))
    .filter(Boolean) as MultiselectOption[];

  return (
    <div className={cn("relative", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            disabled={Boolean(!model)}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full text-[16px] md:text-sm justify-between text-left font-normal h-10 overflow-hidden  "
          >
            <div className="flex items-center gap-1 flex-1 min-w-0 overflow-hidden">
              {(value || []).length === 0 ? (
                <span className="text-muted-foreground truncate">
                  {placeholder}
                </span>
              ) : (
                <div className="flex items-center gap-1 overflow-hidden">
                  {selectedOptions.slice(0, 1).map((option) => (
                    <Badge
                      key={option.value}
                      variant="secondary"
                      className="text-xs flex-shrink-0 max-w-[120px]"
                    >
                      <span className="truncate">{option.label}</span>
                      <div
                        className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 flex-shrink-0"
                        role="button"
                        aria-label={`Remove ${option.label}`}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            e.stopPropagation();
                            handleRemove(option.value);
                          }
                        }}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleRemove(option.value);
                        }}
                      >
                        <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                      </div>
                    </Badge>
                  ))}
                  {selectedOptions.length > 1 && (
                    <Badge
                      variant="secondary"
                      className="text-xs flex-shrink-0"
                    >
                      +{selectedOptions.length - 1}
                    </Badge>
                  )}
                </div>
              )}
            </div>
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-[var(--radix-popover-trigger-width)] p-0"
          align="start"
        >
          <Command>
            <div className="p-2 border-b">
              <Button
                variant="outline"
                size="sm"
                className="w-full bg-transparent"
                onClick={handleClearAll}
                disabled={(value || []).length === 0}
              >
                Очистить все
              </Button>
            </div>
            <CommandList>
              <CommandEmpty>Ничего не найдено.</CommandEmpty>
              <CommandGroup>
                {(options || []).map((option) => (
                  <div key={option.value} className="group relative">
                    <CommandItem
                      value={option.value}
                      onSelect={() => handleSelect(option.value)}
                      className="pr-20"
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          (value || []).includes(option.value)
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      <span className="flex-1 truncate">{option.label}</span>
                    </CommandItem>
                    <div className="absolute right-1 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 px-2 text-xs bg-blue-50 hover:bg-blue-100 text-blue-700"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleSelectOnly(option.value);
                        }}
                      >
                        Только
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 px-2 text-xs bg-red-50 hover:bg-red-100 text-red-700"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleSelectExcept(option.value);
                        }}
                      >
                        Кроме
                      </Button>
                    </div>
                  </div>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
// className={`w-full text-[16px] md:text-sm justify-between text-left font-normal h-10 overflow-hidden ${
//               Boolean(!model) ? "bg-[hsl(0, 0%, 95%)]" : ""
//             }`}
