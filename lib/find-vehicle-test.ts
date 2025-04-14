export interface GetSearchParams {
  makes?: string;
  model?: string;
  grades?: string;
  page?: string;
  pageSize?: string;
  fuels?: string;
  yearsMin?: string;
  yearsMax?: string;
  priceMin?: string;
  priceMax?: string;
  engineMin?: string;
  engineMax?: string;
  buisness?: string;
  robber?: string;
  insuarePrice?: string;
  changeOwner?: string;
  changeNumber?: string;
}

export interface ReturnProps {
  vehicleTest: {
    encar: {
      id: bigint;
      details: {
        makes: {
          make_short_name: string | null;
        };
        model: {
          model_short_name: string | null;
        };
        grades: {
          grade_english: string | null;
        };
        form_year: number;
        origin_price: number | null;
        mileage: number;
        engine_displacement: number;
        fuel: {
          fuel_english: string | null;
        };
      } | null;
      photos: {
        url: string;
      }[];
    };
  }[];

  totalTest: number;
}
import { prisma } from "@/prisma/prisma-client";

const DEFAULT_MIN_YEARS = 2000;
const DEFAULT_MAX_YEARS = 2025;
const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 2000000000;
const DEFAULT_MIN_ENGINE = 0;
const DEFAULT_MAX_ENGINE = 10000;
export const findVehicleTEST = async (
  params: GetSearchParams
): Promise<ReturnProps> => {
  const {
    makes,
    model,
    grades,
    fuels,
    page,
    pageSize,
    yearsMin,
    yearsMax,
    priceMin,
    priceMax,
    engineMin,
    engineMax,
    buisness,
    robber,
    insuarePrice,
    changeOwner,
    changeNumber,
  } = await params;
  const pagenum = page ?? 0;
  const takePageSize = pageSize ?? 10;
  const currentMinYear = Number(yearsMin) || DEFAULT_MIN_YEARS;
  const currentMaxYear = Number(yearsMax) || DEFAULT_MAX_YEARS;
  const currentMinPrice = Number(priceMin) || DEFAULT_MIN_PRICE;
  const currentMaxPrice = Number(priceMax) || DEFAULT_MAX_PRICE;
  const currentMinEngine = Number(engineMin) || DEFAULT_MIN_ENGINE;
  const currentMaxEngine = Number(engineMax) || DEFAULT_MAX_ENGINE;
  const currentRobber = robber ? robber : 1;
  let benefit = {};
  if (insuarePrice === "1" && insuarePrice !== undefined) {
    benefit = { some: { insurance_benefit: { lte: 1000000 } } };
  }
  if (insuarePrice === "2") {
    benefit = { some: { insurance_benefit: { gt: 1000001, lte: 3000000 } } };
  }
  if (insuarePrice === "3") {
    benefit = { some: { insurance_benefit: { gt: 3000100 } } };
  }

  const vehicleTest = await prisma.active_lots.findMany({
    where: {
      encar: {
        details: {
          makes: { make_short_name: makes },
          model: { model_short_name: model },
          grades: { grade_english: grades },
          fuel: { fuel_english: fuels },
          form_year: {
            gte: currentMinYear,
            lte: currentMaxYear,
          },
          origin_price: {
            gte: currentMinPrice,
            lte: currentMaxPrice,
          },
          engine_displacement: {
            gte: currentMinEngine,
            lte: currentMaxEngine,
          },
        },
        accident: {
          business: Number(buisness) === 2 ? true : false,
          robber_count: Number(currentRobber) === 1 ? 0 : { gte: 1 },
        },
        accident_details: benefit,
      },
    },
    orderBy: {
      encar: { details: { form_year: "desc" } },
    },
    select: {
      encar: {
        select: {
          id: true,
          details: {
            select: {
              makes: { select: { make_short_name: true } },
              model: { select: { model_short_name: true } },
              grades: { select: { grade_english: true } },
              fuel: { select: { fuel_english: true } },
              form_year: true,
              engine_displacement: true,
              mileage: true,
              origin_price: true,
            },
          },
          photos: { select: { url: true } },
          _count: { select: { owner: true, car_info: true } },
        },
      },
    },

    skip: +pagenum * +takePageSize,
    take: +takePageSize,
  });
  const totalPage = await prisma.active_lots.count({
    where: {
      encar: {
        details: {
          makes: {
            make_short_name: makes,
          },
          model: {
            model_short_name: model,
          },
          grades: {
            grade_english: grades,
          },
          fuel: {
            fuel_english: fuels,
          },
          form_year: {
            gte: currentMinYear,
            lte: currentMaxYear,
          },
          origin_price: {
            gte: currentMinPrice,
            lte: currentMaxPrice,
          },
          engine_displacement: {
            gte: currentMinEngine,
            lte: currentMaxEngine,
          },
        },
        accident: {
          business: Number(buisness) === 2 ? true : false,
          robber_count: Number(currentRobber) === 1 ? 0 : { gte: 1 },
        },
        accident_details: benefit,
      },
    },
  });
  // Нужно проверять условия на наличие owner & по номерам!
  if (Boolean(changeNumber) && Boolean(changeOwner)) {
    const vehicle = await prisma.active_lots.findMany({
      where: {
        encar: {
          details: {
            makes: { make_short_name: makes },
            model: { model_short_name: model },
            grades: { grade_english: grades },
            fuel: { fuel_english: fuels },
            form_year: {
              gte: currentMinYear,
              lte: currentMaxYear,
            },
            origin_price: {
              gte: currentMinPrice,
              lte: currentMaxPrice,
            },
            engine_displacement: {
              gte: currentMinEngine,
              lte: currentMaxEngine,
            },
          },
          accident: {
            business: Number(buisness) === 2 ? true : false,
            robber_count: Number(currentRobber) === 1 ? 0 : { gte: 1 },
          },
          accident_details: benefit,
        },
      },
      select: {
        encar: {
          select: {
            id: true,
            details: {
              select: {
                makes: { select: { make_short_name: true } },
                model: { select: { model_short_name: true } },
                grades: { select: { grade_english: true } },
                fuel: { select: { fuel_english: true } },
                form_year: true,
                engine_displacement: true,
                mileage: true,
                origin_price: true,
              },
            },
            photos: { select: { url: true } },
            _count: { select: { car_info: true, owner: true } },
          },
        },
      },
    });
    const vehcarOwner = vehicle.filter(
      (veh) => veh.encar._count.owner === Number(changeOwner)
    );
    const vehcarNumer = vehcarOwner.filter(
      (veh) => veh.encar._count.car_info === Number(changeNumber)
    );
    return {
      vehicleTest: vehcarNumer.slice(
        +pagenum * +takePageSize,
        +pagenum * +takePageSize + +takePageSize
      ),
      totalTest: vehcarNumer.length,
    };
  } else if (Boolean(changeNumber)) {
    const vehicle = await prisma.active_lots.findMany({
      where: {
        encar: {
          details: {
            makes: { make_short_name: makes },
            model: { model_short_name: model },
            grades: { grade_english: grades },
            fuel: { fuel_english: fuels },
            form_year: {
              gte: currentMinYear,
              lte: currentMaxYear,
            },
            origin_price: {
              gte: currentMinPrice,
              lte: currentMaxPrice,
            },
            engine_displacement: {
              gte: currentMinEngine,
              lte: currentMaxEngine,
            },
          },
          accident: {
            business: Number(buisness) === 2 ? true : false,
            robber_count: Number(currentRobber) === 1 ? 0 : { gte: 1 },
          },
          accident_details: benefit,
        },
      },
      select: {
        encar: {
          select: {
            id: true,
            details: {
              select: {
                makes: { select: { make_short_name: true } },
                model: { select: { model_short_name: true } },
                grades: { select: { grade_english: true } },
                fuel: { select: { fuel_english: true } },
                form_year: true,
                engine_displacement: true,
                mileage: true,
                origin_price: true,
              },
            },
            photos: { select: { url: true } },
            _count: { select: { car_info: true } },
          },
        },
      },
    });
    const vehcarinfo = vehicle.filter(
      (veh) => veh.encar._count.car_info === Number(changeNumber)
    );
    return {
      vehicleTest: vehcarinfo.slice(
        +pagenum * +takePageSize,
        +pagenum * +takePageSize + +takePageSize
      ),
      totalTest: vehcarinfo.length,
    };
  } else if (Boolean(changeOwner)) {
    const vehicle = await prisma.active_lots.findMany({
      where: {
        encar: {
          details: {
            makes: { make_short_name: makes },
            model: { model_short_name: model },
            grades: { grade_english: grades },
            fuel: { fuel_english: fuels },
            form_year: {
              gte: currentMinYear,
              lte: currentMaxYear,
            },
            origin_price: {
              gte: currentMinPrice,
              lte: currentMaxPrice,
            },
            engine_displacement: {
              gte: currentMinEngine,
              lte: currentMaxEngine,
            },
          },
          accident: {
            business: Number(buisness) === 2 ? true : false,
            robber_count: Number(currentRobber) === 1 ? 0 : { gte: 1 },
          },
          accident_details: benefit,
        },
      },
      select: {
        encar: {
          select: {
            id: true,
            details: {
              select: {
                makes: { select: { make_short_name: true } },
                model: { select: { model_short_name: true } },
                grades: { select: { grade_english: true } },
                fuel: { select: { fuel_english: true } },
                form_year: true,
                engine_displacement: true,
                mileage: true,
                origin_price: true,
              },
            },
            photos: { select: { url: true } },
            _count: { select: { owner: true } },
          },
        },
      },
    });
    const vehOwner = vehicle.filter(
      (veh) => veh.encar._count.owner === Number(changeOwner)
    );
    return {
      vehicleTest: vehOwner.slice(
        +pagenum * +takePageSize,
        +pagenum * +takePageSize + +takePageSize
      ),
      totalTest: vehOwner.length,
    };
  }

  return { vehicleTest, totalTest: totalPage };
};
