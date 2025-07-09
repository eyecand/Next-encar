import { cn } from "@/lib/utils";

export const PriceViewCalclation = ({
  price,
  label,
  valute,
  className,
  k,
}: {
  price: number;
  label: string;
  valute: number;
  className: string;
  k?: number;
}) => {
  const kef = k ? k : 1;
  return (
    <span className={cn("", className)}>
      {new Intl.NumberFormat("ru-RU")
        .format(Math.floor(price * valute * 0.001 * kef))
        .replace(",", ".")}{" "}
      {label}
    </span>
  );
};
