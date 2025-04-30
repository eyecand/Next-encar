import { cn } from "@/lib/utils";

export const PriceViewCalclation = ({
  price,
  label,
  valute,
  className,
}: {
  price: number;
  label: string;
  valute: number;
  className: string;
}) => {
  return (
    <span className={cn("", className)}>
      {new Intl.NumberFormat("ru-RU")
        .format(Math.floor(price * valute * 0.001))
        .replace(",", ".")}{" "}
      {label}
    </span>
  );
};
