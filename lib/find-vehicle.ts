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
}

// export interface LayoutProps {
//   params?: Promise<GetSearchParams>;
// }

export interface ReturnProps {
  vehicle: {
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
  } = await params;

  const pagenum = page ?? 0;
  const takePageSize = pageSize ?? 10;
  const currentMinYear = Number(yearsMin) || DEFAULT_MIN_YEARS;
  const currentMaxYear = Number(yearsMax) || DEFAULT_MAX_YEARS;
  const currentMinPrice = Number(priceMin) || DEFAULT_MIN_PRICE;
  const currentMaxPrice = Number(priceMax) || DEFAULT_MAX_PRICE;

  const vehiclePromise = prisma.encar_vehicles.findMany({
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
          details: {
            isNot: null,
          },
        },
        {
          details: {
            makes: {
              make_short_name: makes,
            },
          },
        },
        {
          details: {
            model: {
              model_short_name: model,
            },
          },
        },
        {
          details: {
            grades: {
              grade_english: grades,
            },
          },
        },
        {
          details: {
            form_year: {
              gte: currentMinYear,
              lte: currentMaxYear,
            },
          },
        },
        {
          details: {
            origin_price: {
              gte: currentMinPrice,
              lte: currentMaxPrice,
            },
          },
        },
        {
          details: {
            fuel: {
              fuel_english: fuels,
            },
          },
        },
      ],
    },
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
    skip: +pagenum * +takePageSize,
    take: +takePageSize,
  });
  const totalPagePromise = prisma.encar_vehicles.count({
    where: {
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
