import { cn } from "@/lib/utils";

export const PriceView = ({
  price,
  label,
  className,
  tilda,
}: {
  price: string;
  label: string;
  className: string;
  tilda: boolean;
}) => {
  return (
    <span className={cn(className)}>
      {tilda && "~"}{" "}
      {new Intl.NumberFormat("ru-RU").format(Number(price)).replace(",", ".")}{" "}
      {label}
    </span>
  );
};
