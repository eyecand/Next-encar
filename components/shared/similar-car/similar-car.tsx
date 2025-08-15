import { Decimal } from "@prisma/client/runtime/library";
import { CarCard } from "./similar-car-card";

export default function SimilarCars({
  vehicleSimilar,
  year,
}: {
  vehicleSimilar: ReturnProps;
  year: number;
}) {
  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-6 text:xl md:text-2xl font-bold border-y py-3">
        Похожие автомобили
      </h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {vehicleSimilar.result.map((car, index) => (
          <CarCard
            key={index}
            id={Number(car.encar.id)}
            price={Number(car.encar.advertisements?.price)}
            makes={String(car.encar.details?.makes.make_short_name)}
            model={String(car.encar.details?.model.model_english)}
            mileage={String(car.encar.details?.mileage)}
            fuel={String(car.encar.details?.fuel.fuel_english)}
            engine={Number(car.encar.details?.engine_displacement_liters)}
            photo={String(car.encar.photos[0].s3_images?.url)}
            year={year}
            model_query={String(car.encar.details?.model.model_short_name)}
          />
        ))}
      </div>
    </div>
  );
}

type ReturnProps = {
  result: {
    encar: {
      id: BigInt;
      details: {
        makes: {
          make_short_name: string | null;
        };
        model: {
          model_english: string | null;
          model_short_name: string | null;
        };
        mileage: number;
        engine_displacement_liters: Decimal;
        release_date: Date;
        fuel: {
          fuel_english: string | null;
        };
      } | null;
      photos: {
        s3_images: {
          url: string;
        } | null;
      }[];
      advertisements: {
        price: number;
      } | null;
    };
  }[];
};
