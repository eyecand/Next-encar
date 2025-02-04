export interface GetSearchParams {
  makes?: string;
  model?: string;
  grades?: string;
  page?: string;
  pageSize?: string;
}

// export interface LayoutProps {
//   params?: Promise<GetSearchParams>;
// }
export interface ReturnProps {
  vehicle: {
    id: bigint;
    details: {
      makes: {
        make_english: string | null;
      };
      model: {
        model_english: string | null;
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

export const findVehicle = async (
  params: GetSearchParams
): Promise<ReturnProps> => {
  const { makes, model, grades, page, pageSize } = await params;

  const pagenum = page ?? 0;
  const takePageSize = pageSize ?? 10;

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
              make_english: makes,
            },
          },
        },
        {
          details: {
            model: {
              model_english: model,
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
      ],
    },
    select: {
      id: true,
      details: {
        select: {
          makes: {
            select: {
              make_english: true,
            },
          },
          model: {
            select: {
              model_english: true,
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
          make_english: makes,
        },
        model: {
          model_english: model,
        },
        grades: {
          grade_english: grades,
        },
      },
    },
  });

  const [vehicle, totalPage] = await Promise.all([
    vehiclePromise,
    totalPagePromise,
  ]);
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
