import { prisma } from "@/prisma/prisma-client";
import { Decimal } from "@prisma/client/runtime/library";

const DEFAULT_MIN_YEARS = 2000;
const DEFAULT_MAX_YEARS = new Date().getFullYear();
const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 2000000000;
const DEFAULT_MIN_ENGINE = 0;
const DEFAULT_MAX_ENGINE = 10000;
const DEFAULT_MIN_MILEAGE = 0;
const DEFAULT_MAX_MILEAGE = 1000000;
export const findVehicleV2 = async (
  params: GetSearchParams
): Promise<ReturnProps> => {
  const {
    makes,
    model,
    grades_eng,
    grades_det,
    evolutons,
    fuels,
    page,
    pageSize,
    yearsMin,
    yearsMax,
    priceMin,
    priceMax,
    engineMin,
    engineMax,
    insuarePrice,
    sort,
    privod,
    mileageMax,
    mileageMin,
    transmission,
    check,
  } = await params;
  const pagenum = page ? Number(page) - 1 : 0;
  const takePageSize = pageSize ?? 10;
  const currentMinYear = Number(yearsMin) || DEFAULT_MIN_YEARS;
  const currentMaxYear = Number(yearsMax) || DEFAULT_MAX_YEARS;
  const currentMinPrice = Number(priceMin) || DEFAULT_MIN_PRICE;
  const currentMaxPrice = Number(priceMax) || DEFAULT_MAX_PRICE;
  const currentMinEngine = Number(engineMin) || DEFAULT_MIN_ENGINE;
  const currentMaxEngine = Number(engineMax) || DEFAULT_MAX_ENGINE;
  const currentMinMileage = Number(mileageMin) || DEFAULT_MIN_MILEAGE;
  const currentMaxMileage = Number(mileageMax) || DEFAULT_MAX_MILEAGE;
  let grade = {};
  if (
    grades_eng !== "null" &&
    grades_eng &&
    grades_det !== "null" &&
    grades_det
  ) {
    grade = {
      OR: [
        {
          grade_detail_english: grades_eng,
        },
        { grade_detail_english: grades_det },
      ],
    };
  } else if (grades_det === "null" && grades_eng !== "null") {
    grade = { grade_english: grades_eng };
  } else if (grades_det !== "null" && grades_eng == "null") {
    grade = { grade_english: grades_det };
  } else if (grades_det === undefined && grades_eng === undefined) {
    grade = {};
  }

  let benefit = {};
  if (insuarePrice === "3") {
    benefit = { every: { insurance_benefit: { equals: 0 } } };
  } else if (insuarePrice === "2") {
    benefit = {
      some: {
        AND: [
          { insurance_benefit: { not: undefined } },
          { insurance_benefit: { lt: 1000000 } },
        ],
      },
      none: {
        OR: [
          { insurance_benefit: undefined },
          { insurance_benefit: { gte: 1000000 } },
        ],
      },
    };
  } else if (insuarePrice === "1") {
    benefit = {
      some: {
        AND: [
          { insurance_benefit: { not: undefined } },
          { insurance_benefit: { gte: 1000000, lt: 3000000 } },
        ],
      },
      none: {
        OR: [
          { insurance_benefit: undefined },
          { insurance_benefit: { lt: 1000000 } },
          { insurance_benefit: { gte: 3000000 } },
        ],
      },
    };
  } else if (insuarePrice === "4") {
    benefit = {
      some: {
        AND: [
          { insurance_benefit: { not: undefined } },
          { insurance_benefit: { gte: 3000000 } },
        ],
      },
      none: {
        OR: [
          { insurance_benefit: undefined },
          { insurance_benefit: { lt: 3000000 } },
        ],
      },
    };
  }
  let sortLabel = {};
  if (sort === undefined) sortLabel = { details: { created_at: "desc" } };

  if (sort === "all") {
    sortLabel = {};
  } else if (sort === "priceMin") {
    sortLabel = { advertisements: { price: "desc" } };
  } else if (sort === "priceMax") {
    sortLabel = { advertisements: { price: "asc" } };
  } else if (sort === "mileageMin") {
    sortLabel = { details: { mileage: "desc" } };
  } else if (sort === "mileageMax") {
    sortLabel = { details: { mileage: "asc" } };
  } else if (sort === "yearMin") {
    sortLabel = { details: { release_date: "desc" } };
  } else if (sort === "yearMax") {
    sortLabel = { details: { release_date: "asc" } };
  } else if (sort === "engineMin") {
    sortLabel = { details: { engine_displacement: "desc" } };
  } else if (sort === "engineMax") {
    sortLabel = { details: { engine_displacement: "asc" } };
  } else if (sort === "dateMin") {
    sortLabel = { details: { created_at: "desc" } };
  } else if (sort === "dateMax") {
    sortLabel = { details: { created_at: "asc" } };
  }

  let tr = {};
  if (transmission === "Otto") {
    tr = { transmission_english: "Otto" };
  } else if (transmission === "Manual") {
    tr = { transmission_english: "Manual" };
  } else if (transmission === "CVT") {
    tr = { transmission_english: "CVT" };
  } else if (transmission === "passivity, Semioto") {
    tr = {
      OR: [
        { transmission_english: "passivity" },
        { transmission_english: "Semioto" },
      ],
    };
  }
  let fuel = {};
  if (fuels === "Gasoline") {
    fuel = { fuel_english: "Gasoline" };
  } else if (fuels === "Diesel") {
    fuel = { fuel_english: "Diesel" };
  } else if (fuels === "Gasoline+Electric") {
    fuel = { fuel_english: "Gasoline+Electric" };
  } else if (fuels === "Electricity") {
    fuel = { fuel_english: "Electricity" };
  } else if (
    fuels ===
    "LPG (Purchased by the public), Hydrogen, Gasoline+LPG, LPG + Electric, Gasoline+CNG, CNG"
  ) {
    fuel = {
      OR: [
        { fuel_english: "LPG (Purchased by the public)" },
        { fuel_english: "Hydrogen" },
        { fuel_english: "Gasoline+LPG" },
        { fuel_english: "LPG + Electric" },
        { fuel_english: "Gasoline+CNG" },
        { fuel_english: "CNG" },
      ],
    };
  }
  let priv = {};
  if (privod === "2WD") {
    priv = {
      AND: [
        { drive_type: { not: { contains: "Quattro" } } },
        { drive_type: { not: { contains: "4Motion" } } },
        { drive_type: { not: { contains: "4X4" } } },
        { drive_type: { not: { contains: "4WD" } } },
        { drive_type: { not: { contains: "AWD" } } },
        { drive_type: { not: { contains: "xDrive" } } },
        { drive_type: { not: { contains: "4MATIC" } } },
        { drive_type: { not: { contains: "ALL4" } } },
      ],
    };
  } else if (privod === "4WD") {
    priv = {
      OR: [
        { drive_type: { contains: "Quattro" } },
        { drive_type: { contains: "4Motion" } },
        { drive_type: { contains: "4X4" } },
        { drive_type: { contains: "4WD" } },
        { drive_type: { contains: "AWD" } },
        { drive_type: { contains: "xDrive" } },
        { drive_type: { contains: "4MATIC" } },
        { drive_type: { contains: "ALL4" } },
      ],
    };
  }

  if (check === "2") {
    const yearMin = new Date().getFullYear() - 3;
    const yearMax = new Date().getFullYear() - 5;
    const currentMonth = String(new Date().getMonth() + 1).padStart(2, "0");
    const vehicleProhodPromise = prisma.active_lots.findMany({
      where: {
        encar: {
          advertisements: {
            price: { gte: currentMinPrice, lte: currentMaxPrice },
          },
          details: {
            makes: { make_short_name: makes },
            model: { model_short_name: model, model_english: evolutons },
            grades: grade,
            drive: priv,
            fuel: fuel,
            release_date: {
              gte: new Date(`${yearMax}-${currentMonth}-01T00:00:00.000Z`),
              lte: new Date(`${yearMin}-${currentMonth}-31T23:59:59.999Z`),
            },
            engine_displacement_liters: {
              gte: currentMinEngine,
              lte: currentMaxEngine,
            },
            mileage: {
              gte: currentMinMileage,
              lte: currentMaxMileage,
            },
            transmission: tr,
          },

          accident_details: benefit,
        },
      },
      orderBy: {
        encar: sortLabel,
      },
      select: {
        encar: {
          select: {
            id: true,
            created_at: true,
            advertisements: { select: { price: true } },
            details: {
              select: {
                makes: { select: { make_short_name: true } },
                model: { select: { model_short_name: true } },
                grades: {
                  select: { grade_english: true, grade_detail_english: true },
                },
                fuel: { select: { fuel_english: true } },
                form_year: true,
                engine_displacement: true,
                engine_displacement_liters: true,
                mileage: true,
                release_date: true,
              },
            },
            accident: {
              select: {
                other_accident_count: true,
                current_accident_count: true,
              },
            },
            lib_sell_types: { select: { sell_type: true } },
            photos: { select: { url: true } },
          },
        },
      },

      skip: +pagenum * +takePageSize,
      take: +takePageSize,
    });
    const totalPageProhodPromise = prisma.active_lots.count({
      where: {
        encar: {
          advertisements: {
            price: { gte: currentMinPrice, lte: currentMaxPrice },
          },
          details: {
            makes: { make_short_name: makes },
            model: { model_short_name: model, model_english: evolutons },
            grades: grade,
            drive: priv,
            fuel: fuel,
            release_date: {
              gte: new Date(`${yearMax}-${currentMonth}-01T00:00:00.000Z`),
              lte: new Date(`${yearMin}-${currentMonth}-31T23:59:59.999Z`),
            },
            engine_displacement_liters: {
              gte: currentMinEngine,
              lte: currentMaxEngine,
            },
            mileage: {
              gte: currentMinMileage,
              lte: currentMaxMileage,
            },
            transmission: tr,
          },

          accident_details: benefit,
        },
      },
    });
    const [vehicle, totalPage] = await Promise.all([
      vehicleProhodPromise,
      totalPageProhodPromise,
    ]);
    return {
      vehicle: vehicle.map((item) => {
        if (item.encar && item.encar.details) {
          return {
            ...item,
            encar: {
              ...item.encar,
              details: {
                ...item.encar.details,
                engine_displacement_liters: item.encar.details
                  .engine_displacement_liters
                  ? Number(item.encar.details.engine_displacement_liters)
                  : null,
              },
            },
          };
        }
        return item;
      }),
      totalPage,
    };
  }
  const vehiclePromise = prisma.active_lots.findMany({
    where: {
      encar: {
        advertisements: {
          price: { gte: currentMinPrice, lte: currentMaxPrice },
        },
        details: {
          makes: { make_short_name: makes },
          model: { model_short_name: model, model_english: evolutons },
          grades: grade,
          drive: priv,
          fuel: fuel,
          release_date: {
            gte: new Date(`${currentMinYear}-01-01T00:00:00.000Z`),
            lte: new Date(`${currentMaxYear}-12-31T23:59:59.999Z`),
          },
          engine_displacement_liters: {
            gte: currentMinEngine,
            lte: currentMaxEngine,
          },
          mileage: {
            gte: currentMinMileage,
            lte: currentMaxMileage,
          },
          transmission: tr,
        },

        accident_details: benefit,
      },
    },
    orderBy: {
      encar: sortLabel,
    },
    select: {
      encar: {
        select: {
          id: true,
          created_at: true,
          advertisements: { select: { price: true } },
          details: {
            select: {
              makes: { select: { make_short_name: true } },
              model: { select: { model_short_name: true } },
              grades: {
                select: { grade_english: true, grade_detail_english: true },
              },
              fuel: { select: { fuel_english: true } },
              form_year: true,
              engine_displacement: true,
              engine_displacement_liters: true,
              mileage: true,
              release_date: true,
            },
          },
          accident: {
            select: {
              other_accident_count: true,
              current_accident_count: true,
            },
          },
          lib_sell_types: { select: { sell_type: true } },
          photos: { select: { url: true } },
        },
      },
    },

    skip: +pagenum * +takePageSize,
    take: +takePageSize,
  });

  const totalPagePromise = prisma.active_lots.count({
    where: {
      encar: {
        advertisements: {
          price: { gte: currentMinPrice, lte: currentMaxPrice },
        },
        details: {
          makes: { make_short_name: makes },
          model: { model_short_name: model, model_english: evolutons },
          grades: grade,
          drive: priv,
          fuel: fuel,
          release_date: {
            gte: new Date(`${currentMinYear}-01-01T00:00:00.000Z`),
            lte: new Date(`${currentMaxYear}-12-31T23:59:59.999Z`),
          },
          engine_displacement_liters: {
            gte: currentMinEngine,
            lte: currentMaxEngine,
          },
          mileage: {
            gte: currentMinMileage,
            lte: currentMaxMileage,
          },
          transmission: tr,
        },

        accident_details: benefit,
      },
    },
  });

  const [vehicle, totalPage] = await Promise.all([
    vehiclePromise,
    totalPagePromise,
  ]);
  return {
    vehicle: vehicle.map((item) => {
      if (item.encar && item.encar.details) {
        return {
          ...item,
          encar: {
            ...item.encar,
            details: {
              ...item.encar.details,
              engine_displacement_liters: item.encar.details
                .engine_displacement_liters
                ? Number(item.encar.details.engine_displacement_liters)
                : null,
            },
          },
        };
      }
      return item;
    }),
    totalPage,
  };
};
export interface GetSearchParams {
  makes?: string;
  model?: string;
  grades?: string;
  grades_eng?: string;
  grades_det?: string;
  evolutons?: string;
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
  sort?: string;
  privod?: string;
  transmission: string;
  mileageMin: string;
  mileageMax: string;
  cities: string;
  check?: string;
}

export interface ReturnProps {
  vehicle: {
    encar: {
      id: bigint;
      created_at: Date;
      advertisements: { price: number } | null;
      details: {
        makes: {
          make_short_name: string | null;
        };
        model: {
          model_short_name: string | null;
        };
        grades: {
          grade_english: string | null;
          grade_detail_english: string | null;
        };
        form_year: number;
        mileage: number;
        release_date: Date;
        engine_displacement: number;
        engine_displacement_liters: number | null | Decimal;
        fuel: {
          fuel_english: string | null;
        };
      } | null;
      accident: {
        current_accident_count: number;
        other_accident_count: number;
      } | null;
      lib_sell_types: { sell_type: string };
      photos: {
        url: string;
      }[];
    };
  }[];

  totalPage: number;
}
