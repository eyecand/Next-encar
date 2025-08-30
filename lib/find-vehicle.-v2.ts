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
  params: GetSearchParams,
  makes?: string,
  model?: string,
  evolutions?: string
): Promise<ReturnProps> => {
  const {
    grades_eng,
    grades_det,
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
    insuarePrice,
    sort,
    privod,
    mileageMax,
    mileageMin,
    transmission,
    check,
    checkNew,
    checkOld,
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
  const ingredientsIdArr = params.grades?.split(",").map(String);
  const grades_engArr = grades_eng?.split(",").map(String);
  const grades_detArr = grades_det?.split(",").map(String);

  let grade = {};
  if (ingredientsIdArr?.length) {
    // Создаем массив точных комбинаций для поиска
    const gradeConditions = ingredientsIdArr.map((gradeValue) => {
      // Предполагаем, что строка имеет формат "grade_english grade_detail_english"
      // Например: "1.6 Turbo Noblesse Special"
      const trimmedValue = gradeValue.trim();

      // Ищем все возможные разбиения строки на grade_english и grade_detail_english
      // Поскольку grade_english обычно короче (например "1.6 Turbo"),
      // попробуем найти точное совпадение, проверив разные варианты разбиения

      // Вариант 1: Попробуем разные позиции разделения
      const words = trimmedValue.split(" ");
      const possibleConditions = [];

      // Проверяем разбиения: первое слово, первые два слова, и т.д.
      for (let i = 1; i <= words.length; i++) {
        const gradeEnglish = words.slice(0, i).join(" ");
        const gradeDetailEnglish = words.slice(i).join(" ");

        if (gradeDetailEnglish) {
          // Если есть grade_detail_english, ищем точную комбинацию
          possibleConditions.push({
            AND: [
              { grade_english: gradeEnglish },
              { grade_detail_english: gradeDetailEnglish },
            ],
          });
        } else {
          // Если нет grade_detail_english, ищем только по grade_english
          possibleConditions.push({
            AND: [
              { grade_english: gradeEnglish },
              { grade_detail_english: null },
            ],
          });
        }
      }

      // Возвращаем OR условие для всех возможных разбиений этой строки
      return possibleConditions.length > 1
        ? { OR: possibleConditions }
        : possibleConditions[0];
    });

    grade = {
      OR: gradeConditions,
    };
  }
  let benefit = {};
  if (insuarePrice === "3") {
    benefit = {
      every: {
        OR: [
          { insurance_benefit: { not: undefined } },
          { insurance_benefit: { lt: 1000 } },
        ],
      },
    };
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
  // if (check === "2" && checkNew === "3" && checkOld === "4") {
  //   const yearMin = new Date().getFullYear();
  //   const yearMax = new Date().getFullYear() - 7;
  //   const currentMonth = String(new Date().getMonth() + 1).padStart(2, "0");
  //   const vehicleProhodPromise = prisma.active_lots.findMany({
  //     where: {
  //       encar: {
  //         advertisements: {
  //           price: { gte: currentMinPrice, lte: currentMaxPrice },
  //         },
  //         details: {
  //           makes: { make_short_name: makes },
  //           model: { model_short_name: model, model_english: evolutions },
  //           grades: grade,
  //           drive: priv,
  //           fuel: fuel,
  //           release_date: {
  //             gte: new Date(`${yearMax}-${currentMonth}-01T00:00:00.000Z`),
  //             lte: new Date(`${yearMin}-${currentMonth}-31T23:59:59.999Z`),
  //           },
  //           engine_displacement_liters: {
  //             gte: currentMinEngine,
  //             lte: currentMaxEngine,
  //           },
  //           mileage: {
  //             gte: currentMinMileage,
  //             lte: currentMaxMileage,
  //           },
  //           transmission: tr,
  //         },

  //         accident_details: benefit,
  //       },
  //     },
  //     orderBy: {
  //       encar: sortLabel,
  //     },
  //     select: {
  //       encar: {
  //         select: {
  //           id: true,
  //           created_at: true,
  //           advertisements: { select: { price: true } },
  //           details: {
  //             select: {
  //               makes: { select: { make_short_name: true } },
  //               drive: { select: { drive_type: true } },
  //               model: {
  //                 select: { model_english: true, model_short_name: true },
  //               },
  //               grades: {
  //                 select: { grade_english: true, grade_detail_english: true },
  //               },
  //               fuel: { select: { fuel_english: true } },
  //               form_year: true,
  //               engine_displacement: true,
  //               engine_displacement_liters: true,
  //               mileage: true,
  //               release_date: true,
  //             },
  //           },
  //           accident: {
  //             select: {
  //               other_accident_count: true,
  //               current_accident_count: true,
  //             },
  //           },
  //           lib_sell_types: { select: { sell_type: true } },
  //           photos: { select: { s3_images: { select: { url: true } } } },
  //         },
  //       },
  //     },

  //     skip: +pagenum * +takePageSize,
  //     take: +takePageSize,
  //   });
  //   const totalPageProhodPromise = prisma.active_lots.count({
  //     where: {
  //       encar: {
  //         advertisements: {
  //           price: { gte: currentMinPrice, lte: currentMaxPrice },
  //         },
  //         details: {
  //           makes: { make_short_name: makes },
  //           model: { model_short_name: model, model_english: evolutions },
  //           grades: grade,
  //           drive: priv,
  //           fuel: fuel,
  //           release_date: {
  //             gte: new Date(`${yearMax}-${currentMonth}-01T00:00:00.000Z`),
  //             lte: new Date(`${yearMin}-${currentMonth}-31T23:59:59.999Z`),
  //           },
  //           engine_displacement_liters: {
  //             gte: currentMinEngine,
  //             lte: currentMaxEngine,
  //           },
  //           mileage: {
  //             gte: currentMinMileage,
  //             lte: currentMaxMileage,
  //           },
  //           transmission: tr,
  //         },

  //         accident_details: benefit,
  //       },
  //     },
  //   });
  //   const [vehicle, totalPage] = await Promise.all([
  //     vehicleProhodPromise,
  //     totalPageProhodPromise,
  //   ]);
  //   return {
  //     vehicle: vehicle.map((item) => {
  //       if (item.encar && item.encar.details) {
  //         return {
  //           ...item,
  //           encar: {
  //             ...item.encar,
  //             details: {
  //               ...item.encar.details,
  //               engine_displacement_liters: item.encar.details
  //                 .engine_displacement_liters
  //                 ? Number(item.encar.details.engine_displacement_liters)
  //                 : null,
  //             },
  //           },
  //         };
  //       }
  //       return item;
  //     }),
  //     totalPage,
  //   };
  // }
  // if (check === "2" && checkNew === "3") {
  //   const yearMin = new Date().getFullYear();
  //   const yearMax = new Date().getFullYear() - 5;
  //   const currentMonth = String(new Date().getMonth() + 1).padStart(2, "0");
  //   const vehicleProhodPromise = prisma.active_lots.findMany({
  //     where: {
  //       encar: {
  //         advertisements: {
  //           price: { gte: currentMinPrice, lte: currentMaxPrice },
  //         },
  //         details: {
  //           makes: { make_short_name: makes },
  //           model: { model_short_name: model, model_english: evolutions },
  //           grades: grade,
  //           drive: priv,
  //           fuel: fuel,
  //           release_date: {
  //             gte: new Date(`${yearMax}-${currentMonth}-01T00:00:00.000Z`),
  //             lte: new Date(`${yearMin}-${currentMonth}-31T23:59:59.999Z`),
  //           },
  //           engine_displacement_liters: {
  //             gte: currentMinEngine,
  //             lte: currentMaxEngine,
  //           },
  //           mileage: {
  //             gte: currentMinMileage,
  //             lte: currentMaxMileage,
  //           },
  //           transmission: tr,
  //         },

  //         accident_details: benefit,
  //       },
  //     },
  //     orderBy: {
  //       encar: sortLabel,
  //     },
  //     select: {
  //       encar: {
  //         select: {
  //           id: true,
  //           created_at: true,
  //           advertisements: { select: { price: true } },
  //           details: {
  //             select: {
  //               makes: { select: { make_short_name: true } },
  //               drive: { select: { drive_type: true } },
  //               model: {
  //                 select: { model_english: true, model_short_name: true },
  //               },
  //               grades: {
  //                 select: { grade_english: true, grade_detail_english: true },
  //               },
  //               fuel: { select: { fuel_english: true } },
  //               form_year: true,
  //               engine_displacement: true,
  //               engine_displacement_liters: true,
  //               mileage: true,
  //               release_date: true,
  //             },
  //           },
  //           accident: {
  //             select: {
  //               other_accident_count: true,
  //               current_accident_count: true,
  //             },
  //           },
  //           lib_sell_types: { select: { sell_type: true } },
  //           photos: { select: { s3_images: { select: { url: true } } } },
  //         },
  //       },
  //     },

  //     skip: +pagenum * +takePageSize,
  //     take: +takePageSize,
  //   });
  //   const totalPageProhodPromise = prisma.active_lots.count({
  //     where: {
  //       encar: {
  //         advertisements: {
  //           price: { gte: currentMinPrice, lte: currentMaxPrice },
  //         },
  //         details: {
  //           makes: { make_short_name: makes },
  //           model: { model_short_name: model, model_english: evolutions },
  //           grades: grade,
  //           drive: priv,
  //           fuel: fuel,
  //           release_date: {
  //             gte: new Date(`${yearMax}-${currentMonth}-01T00:00:00.000Z`),
  //             lte: new Date(`${yearMin}-${currentMonth}-31T23:59:59.999Z`),
  //           },
  //           engine_displacement_liters: {
  //             gte: currentMinEngine,
  //             lte: currentMaxEngine,
  //           },
  //           mileage: {
  //             gte: currentMinMileage,
  //             lte: currentMaxMileage,
  //           },
  //           transmission: tr,
  //         },

  //         accident_details: benefit,
  //       },
  //     },
  //   });
  //   const [vehicle, totalPage] = await Promise.all([
  //     vehicleProhodPromise,
  //     totalPageProhodPromise,
  //   ]);
  //   return {
  //     vehicle: vehicle.map((item) => {
  //       if (item.encar && item.encar.details) {
  //         return {
  //           ...item,
  //           encar: {
  //             ...item.encar,
  //             details: {
  //               ...item.encar.details,
  //               engine_displacement_liters: item.encar.details
  //                 .engine_displacement_liters
  //                 ? Number(item.encar.details.engine_displacement_liters)
  //                 : null,
  //             },
  //           },
  //         };
  //       }
  //       return item;
  //     }),
  //     totalPage,
  //   };
  // }
  // if (check === "2" && checkOld === "4") {
  //   const yearMin = new Date().getFullYear() - 3;
  //   const yearMax = new Date().getFullYear() - 7;
  //   const currentMonth = String(new Date().getMonth() + 1).padStart(2, "0");
  //   const vehicleProhodPromise = prisma.active_lots.findMany({
  //     where: {
  //       encar: {
  //         advertisements: {
  //           price: { gte: currentMinPrice, lte: currentMaxPrice },
  //         },
  //         details: {
  //           makes: { make_short_name: makes },
  //           model: { model_short_name: model, model_english: evolutions },
  //           grades: grade,
  //           drive: priv,
  //           fuel: fuel,
  //           release_date: {
  //             gte: new Date(`${yearMax}-${currentMonth}-01T00:00:00.000Z`),
  //             lte: new Date(`${yearMin}-${currentMonth}-31T23:59:59.999Z`),
  //           },
  //           engine_displacement_liters: {
  //             gte: currentMinEngine,
  //             lte: currentMaxEngine,
  //           },
  //           mileage: {
  //             gte: currentMinMileage,
  //             lte: currentMaxMileage,
  //           },
  //           transmission: tr,
  //         },

  //         accident_details: benefit,
  //       },
  //     },
  //     orderBy: {
  //       encar: sortLabel,
  //     },
  //     select: {
  //       encar: {
  //         select: {
  //           id: true,
  //           created_at: true,
  //           advertisements: { select: { price: true } },
  //           details: {
  //             select: {
  //               makes: { select: { make_short_name: true } },
  //               drive: { select: { drive_type: true } },
  //               model: {
  //                 select: { model_english: true, model_short_name: true },
  //               },
  //               grades: {
  //                 select: { grade_english: true, grade_detail_english: true },
  //               },
  //               fuel: { select: { fuel_english: true } },
  //               form_year: true,
  //               engine_displacement: true,
  //               engine_displacement_liters: true,
  //               mileage: true,
  //               release_date: true,
  //             },
  //           },
  //           accident: {
  //             select: {
  //               other_accident_count: true,
  //               current_accident_count: true,
  //             },
  //           },
  //           lib_sell_types: { select: { sell_type: true } },
  //           photos: { select: { s3_images: { select: { url: true } } } },
  //         },
  //       },
  //     },

  //     skip: +pagenum * +takePageSize,
  //     take: +takePageSize,
  //   });
  //   const totalPageProhodPromise = prisma.active_lots.count({
  //     where: {
  //       encar: {
  //         advertisements: {
  //           price: { gte: currentMinPrice, lte: currentMaxPrice },
  //         },
  //         details: {
  //           makes: { make_short_name: makes },
  //           model: { model_short_name: model, model_english: evolutions },
  //           grades: grade,
  //           drive: priv,
  //           fuel: fuel,
  //           release_date: {
  //             gte: new Date(`${yearMax}-${currentMonth}-01T00:00:00.000Z`),
  //             lte: new Date(`${yearMin}-${currentMonth}-31T23:59:59.999Z`),
  //           },
  //           engine_displacement_liters: {
  //             gte: currentMinEngine,
  //             lte: currentMaxEngine,
  //           },
  //           mileage: {
  //             gte: currentMinMileage,
  //             lte: currentMaxMileage,
  //           },
  //           transmission: tr,
  //         },

  //         accident_details: benefit,
  //       },
  //     },
  //   });
  //   const [vehicle, totalPage] = await Promise.all([
  //     vehicleProhodPromise,
  //     totalPageProhodPromise,
  //   ]);
  //   return {
  //     vehicle: vehicle.map((item) => {
  //       if (item.encar && item.encar.details) {
  //         return {
  //           ...item,
  //           encar: {
  //             ...item.encar,
  //             details: {
  //               ...item.encar.details,
  //               engine_displacement_liters: item.encar.details
  //                 .engine_displacement_liters
  //                 ? Number(item.encar.details.engine_displacement_liters)
  //                 : null,
  //             },
  //           },
  //         };
  //       }
  //       return item;
  //     }),
  //     totalPage,
  //   };
  // }
  // if (checkNew === "3" && checkOld === "4") {
  //   const yearMinFirst = new Date().getFullYear();
  //   const yearMaxFirst = new Date().getFullYear() - 3;
  //   const yearMinSecond = new Date().getFullYear() - 5;
  //   const yearMaxSecond = new Date().getFullYear() - 7;
  //   const currentMonth = String(new Date().getMonth() + 1).padStart(2, "0");
  //   const vehicleProhodPromise = prisma.active_lots.findMany({
  //     where: {
  //       encar: {
  //         advertisements: {
  //           price: { gte: currentMinPrice, lte: currentMaxPrice },
  //         },
  //         details: {
  //           makes: { make_short_name: makes },
  //           model: { model_short_name: model, model_english: evolutions },
  //           grades: grade,
  //           drive: priv,
  //           fuel: fuel,

  //           OR: [
  //             {
  //               release_date: {
  //                 gte: new Date(
  //                   `${yearMaxFirst}-${currentMonth}-01T00:00:00.000Z`
  //                 ),
  //                 lte: new Date(
  //                   `${yearMinFirst}-${currentMonth}-31T23:59:59.999Z`
  //                 ),
  //               },
  //             },
  //             {
  //               release_date: {
  //                 gte: new Date(
  //                   `${yearMaxSecond}-${currentMonth}-01T00:00:00.000Z`
  //                 ),
  //                 lte: new Date(
  //                   `${yearMinSecond}-${currentMonth}-31T23:59:59.999Z`
  //                 ),
  //               },
  //             },
  //           ],

  //           engine_displacement_liters: {
  //             gte: currentMinEngine,
  //             lte: currentMaxEngine,
  //           },
  //           mileage: {
  //             gte: currentMinMileage,
  //             lte: currentMaxMileage,
  //           },
  //           transmission: tr,
  //         },

  //         accident_details: benefit,
  //       },
  //     },
  //     orderBy: {
  //       encar: sortLabel,
  //     },
  //     select: {
  //       encar: {
  //         select: {
  //           id: true,
  //           created_at: true,
  //           advertisements: { select: { price: true } },
  //           details: {
  //             select: {
  //               makes: { select: { make_short_name: true } },
  //               drive: { select: { drive_type: true } },
  //               model: {
  //                 select: { model_english: true, model_short_name: true },
  //               },
  //               grades: {
  //                 select: { grade_english: true, grade_detail_english: true },
  //               },
  //               fuel: { select: { fuel_english: true } },
  //               form_year: true,
  //               engine_displacement: true,
  //               engine_displacement_liters: true,
  //               mileage: true,
  //               release_date: true,
  //             },
  //           },
  //           accident: {
  //             select: {
  //               other_accident_count: true,
  //               current_accident_count: true,
  //             },
  //           },
  //           lib_sell_types: { select: { sell_type: true } },
  //           photos: { select: { s3_images: { select: { url: true } } } },
  //         },
  //       },
  //     },

  //     skip: +pagenum * +takePageSize,
  //     take: +takePageSize,
  //   });
  //   const totalPageProhodPromise = prisma.active_lots.count({
  //     where: {
  //       encar: {
  //         advertisements: {
  //           price: { gte: currentMinPrice, lte: currentMaxPrice },
  //         },
  //         details: {
  //           makes: { make_short_name: makes },
  //           model: { model_short_name: model, model_english: evolutions },
  //           grades: grade,
  //           drive: priv,
  //           fuel: fuel,
  //           OR: [
  //             {
  //               release_date: {
  //                 gte: new Date(
  //                   `${yearMaxFirst}-${currentMonth}-01T00:00:00.000Z`
  //                 ),
  //                 lte: new Date(
  //                   `${yearMinFirst}-${currentMonth}-31T23:59:59.999Z`
  //                 ),
  //               },
  //             },
  //             {
  //               release_date: {
  //                 gte: new Date(
  //                   `${yearMaxSecond}-${currentMonth}-01T00:00:00.000Z`
  //                 ),
  //                 lte: new Date(
  //                   `${yearMinSecond}-${currentMonth}-31T23:59:59.999Z`
  //                 ),
  //               },
  //             },
  //           ],
  //           engine_displacement_liters: {
  //             gte: currentMinEngine,
  //             lte: currentMaxEngine,
  //           },
  //           mileage: {
  //             gte: currentMinMileage,
  //             lte: currentMaxMileage,
  //           },
  //           transmission: tr,
  //         },

  //         accident_details: benefit,
  //       },
  //     },
  //   });
  //   const [vehicle, totalPage] = await Promise.all([
  //     vehicleProhodPromise,
  //     totalPageProhodPromise,
  //   ]);
  //   return {
  //     vehicle: vehicle.map((item) => {
  //       if (item.encar && item.encar.details) {
  //         return {
  //           ...item,
  //           encar: {
  //             ...item.encar,
  //             details: {
  //               ...item.encar.details,
  //               engine_displacement_liters: item.encar.details
  //                 .engine_displacement_liters
  //                 ? Number(item.encar.details.engine_displacement_liters)
  //                 : null,
  //             },
  //           },
  //         };
  //       }
  //       return item;
  //     }),
  //     totalPage,
  //   };
  // }
  // if (check === "2") {
  //   const yearMin = new Date().getFullYear() - 3;
  //   const yearMax = new Date().getFullYear() - 5;
  //   const currentMonth = String(new Date().getMonth() + 1).padStart(2, "0");
  //   const vehicleProhodPromise = prisma.active_lots.findMany({
  //     where: {
  //       encar: {
  //         advertisements: {
  //           price: { gte: currentMinPrice, lte: currentMaxPrice },
  //         },
  //         details: {
  //           makes: { make_short_name: makes },
  //           model: { model_short_name: model, model_english: evolutions },
  //           grades: grade,
  //           drive: priv,
  //           fuel: fuel,
  //           release_date: {
  //             gte: new Date(`${yearMax}-${currentMonth}-01T00:00:00.000Z`),
  //             lte: new Date(`${yearMin}-${currentMonth}-31T23:59:59.999Z`),
  //           },
  //           engine_displacement_liters: {
  //             gte: currentMinEngine,
  //             lte: currentMaxEngine,
  //           },
  //           mileage: {
  //             gte: currentMinMileage,
  //             lte: currentMaxMileage,
  //           },
  //           transmission: tr,
  //         },

  //         accident_details: benefit,
  //       },
  //     },
  //     orderBy: {
  //       encar: sortLabel,
  //     },
  //     select: {
  //       encar: {
  //         select: {
  //           id: true,
  //           created_at: true,
  //           advertisements: { select: { price: true } },
  //           details: {
  //             select: {
  //               makes: { select: { make_short_name: true } },
  //               model: {
  //                 select: { model_english: true, model_short_name: true },
  //               },
  //               drive: { select: { drive_type: true } },
  //               grades: {
  //                 select: { grade_english: true, grade_detail_english: true },
  //               },
  //               fuel: { select: { fuel_english: true } },
  //               form_year: true,
  //               engine_displacement: true,
  //               engine_displacement_liters: true,
  //               mileage: true,
  //               release_date: true,
  //             },
  //           },
  //           accident: {
  //             select: {
  //               other_accident_count: true,
  //               current_accident_count: true,
  //             },
  //           },
  //           lib_sell_types: { select: { sell_type: true } },
  //           photos: { select: { s3_images: { select: { url: true } } } },
  //         },
  //       },
  //     },

  //     skip: +pagenum * +takePageSize,
  //     take: +takePageSize,
  //   });
  //   const totalPageProhodPromise = prisma.active_lots.count({
  //     where: {
  //       encar: {
  //         advertisements: {
  //           price: { gte: currentMinPrice, lte: currentMaxPrice },
  //         },
  //         details: {
  //           makes: { make_short_name: makes },
  //           model: { model_short_name: model, model_english: evolutions },
  //           grades: grade,
  //           drive: priv,
  //           fuel: fuel,
  //           release_date: {
  //             gte: new Date(`${yearMax}-${currentMonth}-01T00:00:00.000Z`),
  //             lte: new Date(`${yearMin}-${currentMonth}-31T23:59:59.999Z`),
  //           },
  //           engine_displacement_liters: {
  //             gte: currentMinEngine,
  //             lte: currentMaxEngine,
  //           },
  //           mileage: {
  //             gte: currentMinMileage,
  //             lte: currentMaxMileage,
  //           },
  //           transmission: tr,
  //         },

  //         accident_details: benefit,
  //       },
  //     },
  //   });
  //   const [vehicle, totalPage] = await Promise.all([
  //     vehicleProhodPromise,
  //     totalPageProhodPromise,
  //   ]);
  //   return {
  //     vehicle: vehicle.map((item) => {
  //       if (item.encar && item.encar.details) {
  //         return {
  //           ...item,
  //           encar: {
  //             ...item.encar,
  //             details: {
  //               ...item.encar.details,
  //               engine_displacement_liters: item.encar.details
  //                 .engine_displacement_liters
  //                 ? Number(item.encar.details.engine_displacement_liters)
  //                 : null,
  //             },
  //           },
  //         };
  //       }
  //       return item;
  //     }),
  //     totalPage,
  //   };
  // }
  // if (checkNew === "3") {
  //   const yearMin = new Date().getFullYear();
  //   const yearMax = new Date().getFullYear() - 3;
  //   const currentMonth = String(new Date().getMonth() + 1).padStart(2, "0");
  //   const vehicleProhodPromise = prisma.active_lots.findMany({
  //     where: {
  //       encar: {
  //         advertisements: {
  //           price: { gte: currentMinPrice, lte: currentMaxPrice },
  //         },
  //         details: {
  //           makes: { make_short_name: makes },
  //           model: { model_short_name: model, model_english: evolutions },
  //           grades: grade,
  //           drive: priv,
  //           fuel: fuel,
  //           release_date: {
  //             gte: new Date(`${yearMax}-${currentMonth}-01T00:00:00.000Z`),
  //             lte: new Date(`${yearMin}-${currentMonth}-31T23:59:59.999Z`),
  //           },
  //           engine_displacement_liters: {
  //             gte: currentMinEngine,
  //             lte: currentMaxEngine,
  //           },
  //           mileage: {
  //             gte: currentMinMileage,
  //             lte: currentMaxMileage,
  //           },
  //           transmission: tr,
  //         },

  //         accident_details: benefit,
  //       },
  //     },
  //     orderBy: {
  //       encar: sortLabel,
  //     },
  //     select: {
  //       encar: {
  //         select: {
  //           id: true,
  //           created_at: true,
  //           advertisements: { select: { price: true } },
  //           details: {
  //             select: {
  //               makes: { select: { make_short_name: true } },
  //               model: {
  //                 select: { model_english: true, model_short_name: true },
  //               },
  //               grades: {
  //                 select: { grade_english: true, grade_detail_english: true },
  //               },
  //               drive: { select: { drive_type: true } },
  //               fuel: { select: { fuel_english: true } },
  //               form_year: true,
  //               engine_displacement: true,
  //               engine_displacement_liters: true,
  //               mileage: true,
  //               release_date: true,
  //             },
  //           },
  //           accident: {
  //             select: {
  //               other_accident_count: true,
  //               current_accident_count: true,
  //             },
  //           },
  //           lib_sell_types: { select: { sell_type: true } },
  //           photos: { select: { s3_images: { select: { url: true } } } },
  //         },
  //       },
  //     },

  //     skip: +pagenum * +takePageSize,
  //     take: +takePageSize,
  //   });
  //   const totalPageProhodPromise = prisma.active_lots.count({
  //     where: {
  //       encar: {
  //         advertisements: {
  //           price: { gte: currentMinPrice, lte: currentMaxPrice },
  //         },
  //         details: {
  //           makes: { make_short_name: makes },
  //           model: { model_short_name: model, model_english: evolutions },
  //           grades: grade,
  //           drive: priv,
  //           fuel: fuel,
  //           release_date: {
  //             gte: new Date(`${yearMax}-${currentMonth}-01T00:00:00.000Z`),
  //             lte: new Date(`${yearMin}-${currentMonth}-31T23:59:59.999Z`),
  //           },
  //           engine_displacement_liters: {
  //             gte: currentMinEngine,
  //             lte: currentMaxEngine,
  //           },
  //           mileage: {
  //             gte: currentMinMileage,
  //             lte: currentMaxMileage,
  //           },
  //           transmission: tr,
  //         },

  //         accident_details: benefit,
  //       },
  //     },
  //   });
  //   const [vehicle, totalPage] = await Promise.all([
  //     vehicleProhodPromise,
  //     totalPageProhodPromise,
  //   ]);
  //   return {
  //     vehicle: vehicle.map((item) => {
  //       if (item.encar && item.encar.details) {
  //         return {
  //           ...item,
  //           encar: {
  //             ...item.encar,
  //             details: {
  //               ...item.encar.details,
  //               engine_displacement_liters: item.encar.details
  //                 .engine_displacement_liters
  //                 ? Number(item.encar.details.engine_displacement_liters)
  //                 : null,
  //             },
  //           },
  //         };
  //       }
  //       return item;
  //     }),
  //     totalPage,
  //   };
  // }
  // if (checkOld === "4") {
  //   const yearMin = new Date().getFullYear() - 5;
  //   const yearMax = new Date().getFullYear() - 7;
  //   const currentMonth = String(new Date().getMonth() + 1).padStart(2, "0");
  //   const vehicleProhodPromise = prisma.active_lots.findMany({
  //     where: {
  //       encar: {
  //         advertisements: {
  //           price: { gte: currentMinPrice, lte: currentMaxPrice },
  //         },
  //         details: {
  //           makes: { make_short_name: makes },
  //           model: { model_short_name: model, model_english: evolutions },
  //           grades: grade,
  //           drive: priv,
  //           fuel: fuel,
  //           release_date: {
  //             gte: new Date(`${yearMax}-${currentMonth}-01T00:00:00.000Z`),
  //             lte: new Date(`${yearMin}-${currentMonth}-31T23:59:59.999Z`),
  //           },
  //           engine_displacement_liters: {
  //             gte: currentMinEngine,
  //             lte: currentMaxEngine,
  //           },
  //           mileage: {
  //             gte: currentMinMileage,
  //             lte: currentMaxMileage,
  //           },
  //           transmission: tr,
  //         },

  //         accident_details: benefit,
  //       },
  //     },
  //     orderBy: {
  //       encar: sortLabel,
  //     },
  //     select: {
  //       encar: {
  //         select: {
  //           id: true,
  //           created_at: true,
  //           advertisements: { select: { price: true } },
  //           details: {
  //             select: {
  //               makes: { select: { make_short_name: true } },
  //               model: {
  //                 select: { model_english: true, model_short_name: true },
  //               },
  //               grades: {
  //                 select: { grade_english: true, grade_detail_english: true },
  //               },
  //               drive: { select: { drive_type: true } },
  //               fuel: { select: { fuel_english: true } },
  //               form_year: true,
  //               engine_displacement: true,
  //               engine_displacement_liters: true,
  //               mileage: true,
  //               release_date: true,
  //             },
  //           },
  //           accident: {
  //             select: {
  //               other_accident_count: true,
  //               current_accident_count: true,
  //             },
  //           },
  //           lib_sell_types: { select: { sell_type: true } },
  //           photos: { select: { s3_images: { select: { url: true } } } },
  //         },
  //       },
  //     },

  //     skip: +pagenum * +takePageSize,
  //     take: +takePageSize,
  //   });
  //   const totalPageProhodPromise = prisma.active_lots.count({
  //     where: {
  //       encar: {
  //         advertisements: {
  //           price: { gte: currentMinPrice, lte: currentMaxPrice },
  //         },
  //         details: {
  //           makes: { make_short_name: makes },
  //           model: { model_short_name: model, model_english: evolutions },
  //           grades: grade,
  //           drive: priv,
  //           fuel: fuel,
  //           release_date: {
  //             gte: new Date(`${yearMax}-${currentMonth}-01T00:00:00.000Z`),
  //             lte: new Date(`${yearMin}-${currentMonth}-31T23:59:59.999Z`),
  //           },
  //           engine_displacement_liters: {
  //             gte: currentMinEngine,
  //             lte: currentMaxEngine,
  //           },
  //           mileage: {
  //             gte: currentMinMileage,
  //             lte: currentMaxMileage,
  //           },
  //           transmission: tr,
  //         },

  //         accident_details: benefit,
  //       },
  //     },
  //   });
  //   const [vehicle, totalPage] = await Promise.all([
  //     vehicleProhodPromise,
  //     totalPageProhodPromise,
  //   ]);
  //   return {
  //     vehicle: vehicle.map((item) => {
  //       if (item.encar && item.encar.details) {
  //         return {
  //           ...item,
  //           encar: {
  //             ...item.encar,
  //             details: {
  //               ...item.encar.details,
  //               engine_displacement_liters: item.encar.details
  //                 .engine_displacement_liters
  //                 ? Number(item.encar.details.engine_displacement_liters)
  //                 : null,
  //             },
  //           },
  //         };
  //       }
  //       return item;
  //     }),
  //     totalPage,
  //   };
  // }

  const vehiclePromise = prisma.active_lots.findMany({
    where: {
      encar: {
        advertisements: {
          price: { gte: currentMinPrice, lte: currentMaxPrice },
        },
        details: {
          makes: { make_short_name: makes },
          model: { model_short_name: model, model_english: evolutions },
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
              model: {
                select: { model_english: true, model_short_name: true },
              },
              grades: {
                select: { grade_english: true, grade_detail_english: true },
              },
              fuel: { select: { fuel_english: true } },
              drive: { select: { drive_type: true } },
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
          photos: { select: { s3_images: { select: { url: true } } } },
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
          model: { model_short_name: model, model_english: evolutions },
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
  evolutions?: string;
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
  checkNew?: string;
  checkOld?: string;
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
        drive: {
          drive_type: string;
        } | null;
        model: {
          model_english: string | null;
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
        s3_images: {
          url: string;
        } | null;
      }[];
    };
  }[];

  totalPage: number;
}
