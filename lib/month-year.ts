type tpl = {
  [key: string]: string;
};
export function detectedMontYear(date: string) {
  const newDate = new Date(date);
  const month = String(newDate.getMonth() + 1).padStart(2, "0"); // Месяцы начинаются с 0
  const year = newDate.getFullYear();
  const currentMonth: tpl = {
    "01": "Январь",
    "02": "Февраль",
    "03": "Март",
    "04": "Апрель",
    "05": "Май",
    "06": "Июнь",
    "07": "Июль",
    "08": "Август",
    "09": "Сентябрь",
    "10": "Октябрь",
    "11": "Ноябрь",
    "12": "Декабрь",
  };
  let result = `${currentMonth[month]} ${year}`;
  return result;
}
