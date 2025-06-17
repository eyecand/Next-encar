import { Option } from "./model";
export const optionCities: Option[] = [
  {
    value: "1",
    label: "Владивосток",
  },
  {
    value: "2",
    label: "Москва",
  },
];
export const optionBenefit: Option[] = [
  {
    value: null,
    label: "Все",
  },
  {
    value: "3",
    label: "Нет",
  },
  {
    value: "2",
    label: "до 1 000 000 W",
  },
  {
    value: "1",
    label: "от 1 000 000 - 3 000 000 W",
  },
  {
    value: "4",
    label: "больше 3 000 000 W",
  },
];

export const optionSort: Option[] = [
  {
    value: null,
    label: "Сортировка",
  },
  {
    value: "dateMin",
    label: "Сначала новые",
  },
  {
    value: "dateMax",
    label: "Сначала старые",
  },

  {
    value: "priceMax",
    label: "Цена по возрастанию",
  },
  {
    value: "priceMin",
    label: "Цена по убыванию",
  },
  {
    value: "yearMax",
    label: "Год по возрастанию",
  },
  {
    value: "yearMin",
    label: "Год по убыванию",
  },
  {
    value: "mileageMax",
    label: "Пробег по возрастанию",
  },
  {
    value: "mileageMin",
    label: "Пробег по убыванию",
  },
  {
    value: "engineMax",
    label: "Объем по возрастанию",
  },
  {
    value: "engineMin",
    label: "Объем по убыванию",
  },
];
