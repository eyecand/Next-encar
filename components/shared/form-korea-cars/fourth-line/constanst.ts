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
    value: "1",
    label: "Нет",
  },
  {
    value: "2",
    label: "Есть",
  },
];

export const optionSort: Option[] = [
  {
    value: null,
    label: "Сортировка",
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
  {
    value: "dateMax",
    label: "Дата добавления по возрастанию",
  },
  {
    value: "dateMin",
    label: "Дата добавления по убыванию",
  },
];
