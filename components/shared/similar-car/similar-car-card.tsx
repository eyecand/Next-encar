import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { detectFuels } from "@/lib/detect-fuels";
import Link from "next/link";
export function CarCard({
  id,
  price,
  makes,
  model,
  mileage,
  fuel,
  engine,
  photo,
  year,
  model_query,
}: CarCardProps) {
  return (
    <Link
      href={`/${makes}/${model_query}/${model}/uid-${String(id)}`}
      className="relative flex flex-col overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm"
    >
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={photo || "/12.png"}
          alt="similar cars"
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          style={{ objectFit: "cover" }}
          className="transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold">
          {makes} {model}, {year}
        </h3>
        <p className="text-sm text-muted-foreground">
          {engine} л., {mileage} км, {detectFuels(fuel)}
        </p>
        {/* <p className="text-sm mt-2">Цена:{price} </p> */}
      </div>
    </Link>
  );
}
type CarCardProps = {
  price: number;
  makes: string;
  model: string;
  mileage: string;
  fuel: string;
  engine: number;
  photo: string;
  model_query: string;
  year: number;
  id: number;
};
