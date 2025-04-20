export type tpl = {
  [key: string]: string;
};
export function detectFuels(fuel: string) {
  const currentFuels: tpl = {
    Gasoline: "Бензин",
    ["LPG (Purchased by the public), Hydrogen, Gasoline+LPG, LPG + Electric, Gasoline+CNG, CNG"]:
      "Газ",
    ["LPG (Purchased by the public)"]: "Газ",
    Diesel: "Дизель",
    Electricity: "Электричество",
    ["Gasoline+Electric"]: "Гибрид",
    Gas: "Газ",
    Hydrogen: "Газ",
    ["Gasoline+LPG"]: "Газ",
    ["LPG + Electric"]: "Газ",
    ["Gasoline+CNG"]: "Газ",
    CNG: "Газ",
    Other: "Другое",
  };
  return currentFuels[fuel];
}
