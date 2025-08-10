import { prisma } from "@/prisma/prisma-client";
import { Decimal } from "@prisma/client/runtime/library";
type Props = {
  makes: string;
  model: string;
  date: string;
};
export const findVehicleSimilar = async ({
  makes,
  model,
  date,
}: Props): Promise<ReturnProps> => {
  const year = new Date(date).getFullYear();
  const result = await prisma.active_lots.findMany({
    where: {
      encar: {
        details: {
          makes: { make_short_name: makes },
          model: { model_short_name: model },
          release_date: {
            gte: new Date(`${year}-01-01T00:00:00.000Z`),
            lte: new Date(`${year}-12-31T23:59:59.999Z`),
          },
        },
      },
    },
    select: {
      encar: {
        select: {
          id: true,
          advertisements: { select: { price: true } },
          details: {
            select: {
              makes: { select: { make_short_name: true } },
              model: {
                select: { model_english: true, model_short_name: true },
              },
              fuel: { select: { fuel_english: true } },
              mileage: true,
              engine_displacement_liters: true,
              release_date: true,
            },
          },
          photos: { select: { s3_images: { select: { url: true } } }, take: 1 },
        },
      },
    },
    take: 4,
  });

  return { result };
};

// Тип для всего возвращаемого значения функции findVehicleSimilar
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
