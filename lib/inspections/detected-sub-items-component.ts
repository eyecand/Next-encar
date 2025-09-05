export type tpl = {
  [key: string]: string;
};
export function detectSubItemsComponent(sub_items: string) {
  const currentSubItemsComponent: tpl = {
    ["Cylinder cover (Rocker arm cover)"]: "Клапанная крышка",
    ["Cylinder Head / Gasket"]: "Прокладка головки блока цилиндров",
    ["Cylinder Block / Oil Pan China Manufacturer"]:
      "Блок цилиндров/масляный поддон",
    ["Water Pump"]: "Помпа",
    ["Radiator"]: "Радиатор",
    ["Coolant quantity"]: "Количество охлаждающей жидкости",
    ["Oil Leakage Oil"]: "Утечка масла",
    ["Oil Flow and condition"]: "Общее состояние",
    ["Operating state (idling)"]: "Рабочее состояние (на холостом ходу)",
    ["Steering Pump"]: "Насос гидроусилителя руля",
    ["Steering gear with MDPS"]: "Рулевой механизм с системой MDPS",
    ["Steering Joint"]: "Рулевой шарнир",
    ["Power High pressure Hose"]: "Шланг высокого давления",
    ["Tie Rod End and Ball joint"]: "Наконечник рулевой тяги и шаровой шарнир",
    ["Gearshift"]: "Коробка передач",
  };
  const result = currentSubItemsComponent[sub_items] ?? sub_items;
  return result;
}
