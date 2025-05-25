import { tpl } from "./model";

export function detectSort(sort: string) {
  const currentSort: tpl = {
    priceMax: "Цена по возрастанию",
    priceMin: "Цена по убыванию",
    yearMax: "Год по возрастанию",
    yearMin: "Год по убыванию",
    mileageMax: "Пробег по возрастанию",
    mileageMin: "Пробег по убыванию",
    engineMax: "Объем по возрастанию",
    engineMin: "Объем по убыванию",
    dateMax: "Сначала старые",
    dateMin: "Сначала новые",
  };
  return currentSort[sort];
}
