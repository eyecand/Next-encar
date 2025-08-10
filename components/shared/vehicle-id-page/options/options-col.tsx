import { OptionsProps } from "./model";
import { OptionItem } from "./option-item";

export const OptionsCol = ({ options, title }: OptionsColProps) => {
  if (options.length === 0) {
    return null;
  }
  return (
    <div className="col-span-1 border p-2 rounded-xl">
      <h3 className="p-2 text-sm font-medium">{title}</h3>
      {options.map((option) => (
        <OptionItem
          key={option.lib_options.option_name_russian}
          name={option.lib_options.option_name_russian}
          image={option.lib_options.option_images?.s3_url || ""}
          description={option.lib_options.description_russian}
        />
      ))}
    </div>
  );
};
interface OptionsColProps extends OptionsProps {
  title: string;
}
