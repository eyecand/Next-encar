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
  buisness?: string;
  robber?: string;
  insuarePrice?: string;
}

// export interface LayoutProps {
//   params?: Promise<GetSearchParams>;
// }

export interface ReturnProps {
  vehicle: {
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
  totalPage: number;
}

import { prisma } from "@/prisma/prisma-client";

const DEFAULT_MIN_YEARS = 2000;
const DEFAULT_MAX_YEARS = 2025;
const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 2000000000;

export const findVehicle = async (
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
    buisness,
    robber,
    insuarePrice,
  } = await params;

  const pagenum = page ?? 0;
  const takePageSize = pageSize ?? 10;
  const currentMinYear = Number(yearsMin) || DEFAULT_MIN_YEARS;
  const currentMaxYear = Number(yearsMax) || DEFAULT_MAX_YEARS;
  const currentMinPrice = Number(priceMin) || DEFAULT_MIN_PRICE;
  const currentMaxPrice = Number(priceMax) || DEFAULT_MAX_PRICE;
  const currentRobber = robber ? robber : 1;
  console.log("insuare", insuarePrice);
  const vehiclePromise = prisma.active_lots.findMany({
    // where: {
    //   details: {
    //     isNot: null,
    //   },
    // },
    // select: {
    //   details: {
    //     select: {
    //       makes: {
    //         select: {
    //           make_english: true,
    //         },
    //       },
    //       model: {
    //         select: {
    //           model_english: true,
    //         },
    //       },
    //       grades: {
    //         select: {
    //           grade_english: true,
    //         },
    //       },
    //       fuel: {
    //         select: {
    //           fuel_english: true,
    //         },
    //       },
    //       form_year: true,
    //       engine_displacement: true,
    //       mileage: true,
    //       origin_price: true,
    //     },
    //     where: {
    //       makes: {
    //         make_english: makes,
    //       },
    //       model: {
    //         model_english: model,
    //       },
    //       grades: {
    //         grade_english: grades,
    //       },
    //       AND: {
    //         makes: {
    //           make_english: {
    //             not: null,
    //           },
    //         },
    //         model: {
    //           model_english: {
    //             not: null,
    //           },
    //         },
    //       },
    //     },
    //   },
    //   photos: {
    //     select: {
    //       url: true,
    //     },
    //   },
    // },
    where: {
      AND: [
        {
          encar: {
            details: {
              isNot: null,
            },
          },
        },
        {
          encar: {
            details: {
              makes: {
                make_short_name: makes,
              },
            },
          },
        },
        {
          encar: {
            details: {
              model: {
                model_short_name: model,
              },
            },
          },
        },
        {
          encar: {
            details: {
              grades: {
                grade_english: grades,
              },
            },
          },
        },
        {
          encar: {
            details: {
              form_year: {
                gte: currentMinYear,
                lte: currentMaxYear,
              },
            },
          },
        },
        {
          encar: {
            details: {
              origin_price: {
                gte: currentMinPrice,
                lte: currentMaxPrice,
              },
            },
          },
        },
        {
          encar: {
            details: {
              fuel: {
                fuel_english: fuels,
              },
            },
          },
        },
        {
          encar: {
            accident: { business: Number(buisness) === 2 ? true : false },
          },
        },
        {
          encar: {
            accident: {
              robber_count: Number(currentRobber) === 1 ? 0 : { gte: 1 },
            },
          },
        },
        {
          encar: {
            accident_details: {
              some: {
                insurance_benefit:
                  Number(insuarePrice) === 1
                    ? { gte: 1, lte: 1000000 }
                    : Number(insuarePrice) === 2
                    ? { gt: 1000000, lte: 3000000 }
                    : Number(insuarePrice) === 3
                    ? { gt: 3000000 }
                    : 0,
              },
            },
          },
        },
      ],
    },
    select: {
      encar: {
        select: {
          id: true,
          details: {
            select: {
              makes: {
                select: {
                  make_short_name: true,
                },
              },
              model: {
                select: {
                  model_short_name: true,
                },
              },
              grades: {
                select: {
                  grade_english: true,
                },
              },
              fuel: {
                select: {
                  fuel_english: true,
                },
              },

              form_year: true,
              engine_displacement: true,
              mileage: true,
              origin_price: true,
            },
          },
          photos: {
            select: {
              url: true,
            },
          },
        },
      },
    },
    skip: +pagenum * +takePageSize,
    take: +takePageSize,
  });
  const totalPagePromise = prisma.active_lots.count({
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
        },
        accident: {
          business: Number(buisness) === 2 ? true : false,
          robber_count: Number(currentRobber) === 1 ? 0 : { gte: 1 },
        },
        accident_details: {
          some: {
            insurance_benefit:
              Number(insuarePrice) === 1
                ? { lte: 1000000 }
                : Number(insuarePrice) === 2
                ? { gt: 1000000, lte: 3000000 }
                : Number(insuarePrice) === 3
                ? { gt: 3000000 }
                : 0,
          },
        },
      },
    },
  });

  const [vehicle, totalPage] = await Promise.all([
    vehiclePromise,
    totalPagePromise,
  ]);
  // console.log("min", currentMinYear);
  // console.log("max", currentMaxYear);
  // console.log("total", totalPage);
  return { vehicle, totalPage };
};

// const totalPagePromise = prisma.encar_vehicles.count({
//   where: {
//     AND: [
//       {
//         details: {
//           isNot: null,
//         },
//       },
//       {
//         details: {
//           makes: {
//             make_english: makes,
//           },
//         },
//       },
//       {
//         details: {
//           model: {
//             model_english: model,
//           },
//         },
//       },
//       {
//         details: {
//           grades: {
//             grade_english: grades,
//           },
//         },
//       },
//     ],
//   },
// });
