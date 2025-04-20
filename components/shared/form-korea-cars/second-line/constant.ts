import { Option } from "./model";
export const optionFuels: Option[] = [
  {
    value: null,
    label: "Любой тип топлива",
  },
  {
    value: "Gasoline",
    label: "Бензин",
  },
  {
    value: "Diesel",
    label: "Дизель",
  },
  {
    value: "Gasoline+Electric",
    label: "Гибрид",
  },

  {
    value: "Electricity",
    label: "Электричество",
  },
  {
    value:
      "LPG (Purchased by the public), Hydrogen, Gasoline+LPG, LPG + Electric, Gasoline+CNG, CNG",
    label: "Газ",
  },
];

export const optionPrivod: Option[] = [
  {
    value: null,
    label: "Любой привод",
  },
  {
    value: "2WD",
    label: "2WD",
  },
  {
    value: "4WD",
    label: "4WD",
  },
];

export const optionTramsmission: Option[] = [
  {
    value: null,
    label: "Любая трансимиссия",
  },
  {
    value: "Otto",
    label: "Автоматическая",
  },
  {
    value: "Manual",
    label: "Механика",
  },
  {
    value: "passivity, Semioto",
    label: "Робот",
  },
  {
    value: "CVT",
    label: "Вариатор",
  },
];
