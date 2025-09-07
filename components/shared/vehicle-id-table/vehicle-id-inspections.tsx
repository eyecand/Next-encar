"use client";
import { Button } from "@/components/ui/button";
import { Check, X, Circle } from "lucide-react";
import { useState } from "react";
import { detectItemsComponent } from "@/lib/inspections/detected-items-component";
import { detectMainComponent } from "@/lib/inspections/detected-main-component";
import { detectSubItemsComponent } from "@/lib/inspections/detected-sub-items-component";
interface DataItem {
  lib_main_components: { name_english: string | null };
  lib_component_items: { name_english: string | null };
  lib_component_subitems: { name_english: string | null } | null;
  lib_conditions: { name_english: string | null } | null;
}

interface TechnicalReportTableProps {
  data: DataItem[];
}

interface GroupedData {
  mainComponent: string;
  items: {
    componentItem: string;
    subitems: {
      subitem: string | null;
      condition: string | null;
    }[];
  }[];
}

type FilterType = "all" | "defects";

function getConditionBadge(condition: string | null) {
  if (!condition) return null;

  const conditionLower = condition.toLowerCase();

  // Good conditions - green with check icon
  if (["good", "available", ""].includes(conditionLower)) {
    return (
      <div className="flex items-center gap-2 text-green-600">
        <Check className="w-4 h-4" />
        <span>Хорошо</span>
      </div>
    );
  }

  // Normal/acceptable conditions - green with check icon
  if (["titration", "tribe"].includes(conditionLower)) {
    return (
      <div className="flex items-center gap-2 text-green-600">
        <Check className="w-4 h-4" />
        <span>Норма</span>
      </div>
    );
  }

  // Absent/missing conditions - gray with circle icon
  if (["none", "fine nuyu", "nude milk"].includes(conditionLower)) {
    return (
      <div className="flex items-center gap-2 text-gray-500">
        <Circle className="w-4 h-4" />
        <span>Отсутствует</span>
      </div>
    );
  }

  // Defect conditions - red with X icon
  if (["poor", "fine leakage", "leaks", "excess"].includes(conditionLower)) {
    return (
      <div className="flex items-center gap-2 text-red-600">
        <X className="w-4 h-4" />
        <span>Дефект</span>
      </div>
    );
  }

  // Default fallback for unknown conditions
  return (
    <div className="flex items-center gap-2 text-red-600">
      <X className="w-4 h-4" />
      <span>Дефект</span>
    </div>
  );
}

function getItemType(condition: string | null): "defect" | "normal" {
  if (!condition || condition === "") return "normal";

  const conditionLower = condition.toLowerCase();

  // Normal conditions
  if (
    [
      "good",
      "titration",
      "tribe",
      "available",
      "none",
      "fine nuyu",
      "nude milk",
    ].includes(conditionLower)
  )
    return "normal";

  // Defect conditions (poor, milk, fine leakage, leaks, excess)
  return "defect";
}

export function VehicleIdInspections({ data }: TechnicalReportTableProps) {
  const [filter, setFilter] = useState<FilterType>("all");

  const groupedData: GroupedData[] = [];

  data.forEach((item) => {
    const mainComponentName = item.lib_main_components.name_english || "";
    const componentItemName = item.lib_component_items.name_english || "";

    let mainGroup = groupedData.find(
      (g) => g.mainComponent === mainComponentName
    );
    if (!mainGroup) {
      mainGroup = {
        mainComponent: mainComponentName,
        items: [],
      };
      groupedData.push(mainGroup);
    }

    let itemGroup = mainGroup.items.find(
      (i) => i.componentItem === componentItemName
    );
    if (!itemGroup) {
      itemGroup = {
        componentItem: componentItemName,
        subitems: [],
      };
      mainGroup.items.push(itemGroup);
    }

    itemGroup.subitems.push({
      subitem: item.lib_component_subitems?.name_english || null,
      condition: item.lib_conditions?.name_english || "",
    });
  });

  const filteredData = groupedData
    .map((mainGroup) => ({
      ...mainGroup,
      items: mainGroup.items
        .map((item) => ({
          ...item,
          subitems: item.subitems.filter((subitem) => {
            const itemType = getItemType(subitem.condition);

            if (filter === "all") return true;
            if (filter === "defects") return itemType === "defect";

            return true;
          }),
        }))
        .filter((item) => item.subitems.length > 0),
    }))
    .filter((mainGroup) => mainGroup.items.length > 0);
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <div className="flex gap-2 mb-6">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          onClick={() => setFilter("all")}
          className="rounded-full"
        >
          Все
        </Button>
        <Button
          variant={filter === "defects" ? "default" : "outline"}
          onClick={() => setFilter("defects")}
          className="rounded-full"
        >
          Только дефекты
        </Button>
      </div>

      <div className="space-y-4">
        {filteredData.map((mainGroup, mainIndex) => (
          <div
            key={mainIndex}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <div className="w-full p-4 bg-gray-50">
              <h3 className="text-lg font-medium text-gray-900">
                {detectMainComponent(mainGroup.mainComponent)}
              </h3>
            </div>

            <div className="p-4 space-y-4">
              {mainGroup.items.map((item, itemIndex) => (
                <div key={itemIndex} className="space-y-2">
                  <h4 className="font-medium text-gray-800">
                    {detectItemsComponent(item.componentItem)}
                  </h4>

                  <div className="ml-4 space-y-2">
                    {item.subitems.map((subitem, subitemIndex) => (
                      <div
                        key={subitemIndex}
                        className="flex items-center justify-between py-2"
                      >
                        <span className="text-gray-700">
                          {detectSubItemsComponent(subitem.subitem || "") ||
                            detectItemsComponent(item.componentItem)}
                        </span>
                        {subitem.condition === "" ? (
                          <div className="flex items-center gap-2 text-green-600">
                            <Check className="w-4 h-4" />
                            <span>Хорошо</span>
                          </div>
                        ) : (
                          getConditionBadge(subitem.condition)
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
