"use client";
import { cn } from "@/lib/utils";
import React, { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "qs";
import { BasicSelect } from "./basic-select";
import { MiddleSelect } from "./middle-select";
import { Button } from "../ui/button";

export interface ModelProps {
  model_short_name: string;
}
export interface GradesProps {
  grades: {
    grade_english: string;
  };
}
export const FormFilters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [makesType, setMakesType] = useState(
    searchParams.has("makes") ? searchParams.get("makes") : null
  );
  const [modelType, setModelType] = useState(
    searchParams.has("model") ? searchParams.get("model") : null
  );
  const [gradesType, setGradesType] = useState(
    searchParams.has("grades") ? searchParams.get("grades") : null
  );
  const [fuels, setFuels] = useState(
    searchParams.has("fuels") ? searchParams.get("fuels") : null
  );
  const [yearsMin, setYearsMin] = useState(
    searchParams.has("yearMin") ? searchParams.get("yearMin") : null
  );
  const [yearsMax, setYearsMax] = useState(
    searchParams.has("yearMin") ? searchParams.get("yearMin") : null
  );
  const [priceMin, setPriceMin] = useState<string | null>(
    searchParams.has("priceMin") ? searchParams.get("priceMin") : null
  );
  const [priceMax, setPriceMax] = useState<string | null>(
    searchParams.has("priceMax") ? searchParams.get("priceMax") : null
  );
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.refresh();
    const params = {
      makes: makesType,
      model: modelType,
      grades: gradesType,
      fuels: fuels,
      yearsMin: yearsMin,
      yearsMax: yearsMax,
      priceMin: priceMin,
      priceMax: priceMax,
    };
    const query = qs.stringify(params, {
      arrayFormat: "comma",
      skipNulls: true,
    });
    router.push(`?${query}`, {
      scroll: false,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "sm:mx-0 text-zinc-800  bg-gray-100 grid grid-cols-12 grid-flow-dense rounded-xl p-3 sm:p-4 lg:p-6 gap-6 transition-opacity duration-200 ease-in"
      )}
    >
      {/* Первая строчка фильтрации */}

      <BasicSelect
        onChangeMakes={setMakesType}
        onChangeModels={setModelType}
        onChangeGrades={setGradesType}
        make={makesType}
        model={modelType}
        grade={gradesType}
      />

      <MiddleSelect
        onChangeFuels={setFuels}
        onChangeYearMin={setYearsMin}
        onChangeYearMax={setYearsMax}
        onChangePriceMin={setPriceMin}
        onChangePriceMax={setPriceMax}
        fuels={fuels}
        yearMin={yearsMin}
        yearMax={yearsMax}
      />

      <div className="border-zinc-200 md:border-zinc-200 col-span-12 md:col-span-6 lg:col-span-3 flex flex-col">
        <p className="text-zinc-400 mb-1 ml-1.5 text-sm">&nbsp;</p>
        <Button variant={"default"} type="submit" className="">
          Найти автомобиль
        </Button>
      </div>
    </form>
  );
};

// "use client";
// import { useMakes } from "@/hooks/useMakes";
// import { cn } from "@/lib/utils";
// import React, { FormEvent, useEffect, useState } from "react";
// import { Item, SelectDependens } from "./selected-depends";
// import { useFilters } from "@/hooks";
// import { useRouter } from "next/navigation";
// import qs from "qs";
// import { Api } from "@/services/api-client";
// import { vehicle_details } from "@prisma/client";
// import { BasicSelect } from "./basic-select";
// import { MiddleSelect } from "./middle-select";
// import { Button } from "../ui/button";
// export interface GetSearchParams {
//   makes: string;
//   model: string;
//   grades: string;
// }
// export interface ModelProps {
//   model: {
//     model_english: string;
//   };
// }
// export interface GradesProps {
//   grades: {
//     grade_english: string;
//   };
// }
// export const FormFilters = () => {
//   const filters = useFilters();

//   const router = useRouter();

//   const params = {
//     makes: Array.from(filters.makesType),
//     model: Array.from(filters.modelType),
//     grades: Array.from(filters.gradesType),
//   };

//   const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     router.refresh();
//     const query = qs.stringify(params, { arrayFormat: "comma" });
//     router.push(`?${query}`, {
//       scroll: false,
//     });
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className={cn(
//         "sm:mx-0 text-zinc-800  bg-gray-100 grid grid-cols-12 grid-flow-dense rounded-xl p-3 sm:p-4 lg:p-6 gap-6 transition-opacity duration-200 ease-in"
//       )}
//     >
//       {/* Первая строчка фильтрации */}

//       <BasicSelect
//         onChangeMakes={filters.toggleMakeType}
//         onChangeModels={filters.toggleModelType}
//         onChangeGrades={filters.toggleGradesType}
//         resetMakes={filters.resetMake}
//         resetModels={filters.resetModel}
//         resetGrades={filters.resetGrades}
//         make={filters.makesType}
//         model={filters.modelType}
//         grade={filters.gradesType}
//       />
//       <MiddleSelect />
//       {/* <SelectDependens
//           name="Марка"
//           items={optionsMakes}
//           reset={filters.resetMake}
//           onClickSelect={filters.toggleMakeType}
//           setDisabledMakes={setIsMakes}
//         />
//         <SelectDependens
//           name="Модель"
//           items={optionsModels}
//           reset={filters.resetModel}
//           onClickSelect={filters.toggleModelType}
//           isDisabledMakes={isMakes}
//           setDisabledModel={setIsModel}
//         />

//         <SelectDependens
//           name="Кузов"
//           items={optionsGrades}
//           reset={filters.resetGrades}
//           onClickSelect={filters.toggleGradesType}
//           isDisabledModel={isModel}
//         /> */}
//       <div className="border-zinc-200 md:border-zinc-200 col-span-12 md:col-span-6 lg:col-span-3 flex flex-col">
//         <p className="text-zinc-400 mb-1 ml-1.5 text-sm">&nbsp;</p>
//         <Button variant={"default"} type="submit" className="">
//           Найти автомобиль
//         </Button>
//       </div>
//     </form>
//   );
// };
