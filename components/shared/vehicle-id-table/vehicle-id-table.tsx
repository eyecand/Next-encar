import { Badge } from "@/components/ui/badge";
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

function getConditionBadge(condition: string | null) {
  if (!condition) return null;

  const conditionLower = condition.toLowerCase();

  if (conditionLower === "good") {
    return (
      <Badge className="bg-green-600 hover:bg-green-700 text-white">
        Хорошо
      </Badge>
    );
  }

  if (conditionLower === "none") {
    return (
      <Badge className="bg-green-600 hover:bg-green-700 text-white">
        Отсутствует
      </Badge>
    );
  }

  if (conditionLower === "titration") {
    return (
      <Badge className="bg-green-600 hover:bg-green-700 text-white">
        Норма
      </Badge>
    );
  }

  return <Badge variant="secondary">{condition}</Badge>;
}

function getDefectText(condition: string | null) {
  if (!condition) return "Дефект";

  const conditionLower = condition.toLowerCase();

  if (conditionLower === "good") return "Дефект";
  if (conditionLower === "none") return "Микроутечка";
  if (conditionLower === "titration") return "Недостаток";

  return "Дефект";
}

export function TechnicalReportTable({ data }: TechnicalReportTableProps) {
  // Group data by main components and component items
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
      condition: item.lib_conditions?.name_english || null,
    });
  });

  return (
    <div className="overflow-x-auto">
      <table className="w-full border border-gray-200">
        <thead>
          <tr className="bg-muted/50">
            <th
              colSpan={3}
              className="text-left p-4 font-medium text-foreground border-r border-border"
            >
              {/* Empty header for component items */}
            </th>

            <th className="text-center p-4 font-medium text-foreground">
              Оценка
            </th>
            <th className="text-center p-4 font-medium text-muted-foreground">
              {/* Empty header for defect column */}
            </th>
          </tr>
        </thead>
        <tbody>
          {groupedData.map((mainGroup, mainIndex) => {
            const totalRows = mainGroup.items.reduce(
              (sum, item) => sum + Math.max(1, item.subitems.length),
              0
            );

            let currentRowIndex = 0;

            return mainGroup.items.map((item, itemIndex) => {
              const itemRows = Math.max(1, item.subitems.length);
              const isFirstItemInGroup = itemIndex === 0;
              const hasActualSubitems = item.subitems.some(
                (subitem) => subitem.subitem !== null
              );

              return hasActualSubitems ? (
                item.subitems.map((subitem, subitemIndex) => {
                  const isFirstSubitem = subitemIndex === 0;
                  const rowIndex = currentRowIndex++;

                  return (
                    <tr
                      key={`${mainIndex}-${itemIndex}-${subitemIndex}`}
                      className="border-t border-border"
                    >
                      {isFirstItemInGroup && isFirstSubitem && (
                        <td
                          rowSpan={totalRows}
                          className="p-4 bg-muted/30 border-r border-border font-medium text-foreground align-top"
                        >
                          {detectMainComponent(mainGroup.mainComponent)}
                        </td>
                      )}

                      {isFirstSubitem && (
                        <td
                          rowSpan={itemRows}
                          className="p-4 border-r border-border text-foreground align-top"
                        >
                          {detectItemsComponent(item.componentItem)}
                        </td>
                      )}

                      <td className="p-4 border-r border-border text-foreground">
                        {detectSubItemsComponent(subitem.subitem || "")}
                      </td>

                      <td className="p-4 border-r border-border text-center">
                        {getConditionBadge(subitem.condition)}
                      </td>

                      <td className="p-4 text-center text-muted-foreground">
                        {getDefectText(subitem.condition)}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr
                  key={`${mainIndex}-${itemIndex}`}
                  className="border-t border-border"
                >
                  {isFirstItemInGroup && (
                    <td
                      rowSpan={totalRows}
                      className="p-4 bg-muted/30 border-r border-border font-medium text-foreground align-top"
                    >
                      {detectMainComponent(mainGroup.mainComponent)}
                    </td>
                  )}

                  <td
                    colSpan={2}
                    className="p-4 border-r border-border text-foreground"
                  >
                    {detectItemsComponent(item.componentItem)}
                  </td>

                  <td className="p-4 border-r border-border text-center">
                    {getConditionBadge(item.subitems[0]?.condition || null)}
                  </td>

                  <td className="p-4 text-center text-muted-foreground">
                    {getDefectText(item.subitems[0]?.condition || null)}
                  </td>
                </tr>
              );
            });
          })}
        </tbody>
      </table>
    </div>
  );
}
