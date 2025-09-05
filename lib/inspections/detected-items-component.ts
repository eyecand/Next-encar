export type tpl = {
  [key: string]: string;
};
export function detectItemsComponent(items: string) {
  const currentItemsComponent: tpl = {
    ["Prime Mover"]: "Двигатель",
    Gearbox: "Коробка передач",
    ["Operating state (idling)"]: "Холостой ход",
    ["Oil Leakage Oil"]: "Утечка масла",
    ["Oil flow rate"]: "Давление масла",
    ["Coolant leakage"]: "Утечка охлаждающей жидкости",
    ["Automatic Transmission (A / T)"]: "Автоматическая Коробка передач (А/Т)",
    ["Clutch Assembly"]: "Сцепление",
    ["Constant Speed Joint"]: "Шарнир равных угловых скоростей",
    ["Chuchin shaft and Bearing"]: "Вал и подшипник",
    ["Differential Gear"]: "Дифференциал",
    ["Power steering operation Oil leakage"]:
      "Течь жидкости гидроусилителя руля",
    ["Operating Status"]: "Состояние",
    ["Brake Master Cylinder Oil Leakage"]: "Утечка тормозной жидкости",
    ["Brake oil leakage"]: "Тормозная система",
    ["Power supply status"]: "Состояние источника питания",
    ["Generator output"]: "Генератор",
    ["Starting Motor"]: "Стартер",
    ["Wiper Motor Function"]: "Работа мотора стеклоочистителя",
    ["Indoor ventilating motor"]: "Вентилятор печки салона",
    ["Radiator Fan Motor"]: "Вентилятор радиатора",
    ["Window Motor"]: "Стеклоподъёмник",
    ["Fuel leakage (LP gas included)"]: "Утечка топлива",
    ["Manual transmission (M / T)"]: "Механическая коробка передач (М/Т)",
    ["Common Rail"]: "Общая шина",
    ["Charging port insulation state"]: "Изоляция зарядного порта",
    ["Drive battery isolation state"]: "Изоляция аккумуляторной батареи",
    ["High power electrical wiring status(connection terminal, cloth, protection mechanism)"]:
      "Состояние силовой электропроводки (клемма подключения, покрытие, механизм защиты)",
  };
  const result = currentItemsComponent[items] ?? items;
  return result;
}
