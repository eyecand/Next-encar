export type tpl = {
  [key: string]: string;
};
export function detectFuels(fuel: string) {
  const currentFuels: tpl = {
    Gasoline: "Бензин",
    ["LPG (Purchased by the public)"]: "СУГ(LPG)",
    Diesel: "Дизель",
    Electricity: "Электричество",
    ["Gasoline+Electric"]: "Бензин + Электричество",
    Hydrogen: "Водород",
    ["Gasoline+LPG"]: "Бензин + LPG",
    ["LPG + Electric"]: "СНГ + электричество",
    ["Gasoline+CNG"]: "Бензин + СНГ",
    CNG: "СПГ",
    Other: "Другое",
  };
  return currentFuels[fuel];
}
