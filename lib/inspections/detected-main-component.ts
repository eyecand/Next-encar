export type tpl = {
  [key: string]: string;
};
export function detectMainComponent(title: string) {
  const currentMainComponent: tpl = {
    ["Self-diagnosis"]: "Диагностика",
    ["Prime Mover"]: "Двигатель",
    Gearbox: "Коробка передач",
    Electricity: "Электрика",
    Fuel: "Топливо",
    ["Power Transmission"]: "Передача энергии",
    ["High power electric device"]: "Высоковольтная батарея и электроника",
    Steering: "Рулевое управление",
    Braking: "Тормозная система",
  };
  return currentMainComponent[title];
}
