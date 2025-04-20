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
    dateMax: "Дата добавления по возрастанию",
    dateMin: "Дата добавления по убыванию",
  };
  return currentSort[sort];
}
