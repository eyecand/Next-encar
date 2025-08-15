import { OptionsProps } from "./model";
import { OptionsCol } from "./options-col";
const listOptionsItem = [
  {
    typeItem: "01",
    title: "Экстерьер/интерьер авто",
  },
  {
    typeItem: "02",
    title: "Безопасность",
  },
  {
    typeItem: "03",
    title: "Удобства/мультимедиа",
  },
  {
    typeItem: "04",
    title: "Сидения",
  },
];
export const Options = ({ options }: OptionsProps) => {
  if (options.length === 0) return null;
  return (
    <section className="">
      <h2 className="font-bold text-lg md:text-2xl border-y py-3">Опции</h2>
      <div className=" py-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {listOptionsItem.map((item) => (
            <OptionsCol
              key={item.typeItem}
              options={options.filter(
                (option) =>
                  option.lib_options.lib_option_types.option_type_key ===
                  item.typeItem
              )}
              title={item.title}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
