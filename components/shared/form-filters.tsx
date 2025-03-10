"use client";
import { cn } from "@/lib/utils";
import React, { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "qs";
import { BasicSelect } from "./basic-select";
import { MiddleSelect } from "./middle-select";
import { Button } from "../ui/button";
import { FaChevronDown } from "react-icons/fa";
import { TiDeleteOutline } from "react-icons/ti";
import { AdvancedSelect } from "./advanced-select";
import { Api } from "@/services/api-client";

export interface ModelProps {
  model_short_name: string;
}
export interface GradesProps {
  grades: {
    grade_english: string;
  };
}
type Prop = {
  count: number;
};
export const FormFilters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [view, setView] = React.useState(false);
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
  const [engineMin, setEngineMin] = useState<string | null>(
    searchParams.has("engineMin") ? searchParams.get("engineMin") : null
  );
  const [engineMax, setEngineMax] = useState<string | null>(
    searchParams.has("engineMax") ? searchParams.get("engineMax") : null
  );
  const [buisness, setBuisness] = useState(
    searchParams.has("buisness") ? searchParams.get("buisness") : null
  );
  const [robber, setRobber] = useState(
    searchParams.has("robber") ? searchParams.get("robber") : null
  );
  const [changeNumber, setChangeNumber] = useState(
    searchParams.has("changeNumber") ? searchParams.get("changeNumber") : null
  );
  const [changeOwner, setChangeOwner] = useState(
    searchParams.has("changeOwner") ? searchParams.get("changeOwner") : null
  );
  const [insuare, setInsuare] = useState(
    searchParams.has("insuare") ? searchParams.get("insuare") : null
  );
  const [insuarePrice, setInsuarePrice] = useState(
    searchParams.has("insuarePrice") ? searchParams.get("insuarePrice") : null
  );
  const handleRemove = () => {
    setMakesType(null);
    setModelType(null);
    setGradesType(null);
    setFuels(null);
    setYearsMin(null);
    setYearsMax(null);
    setPriceMin("");
    setPriceMax("");
    setEngineMin("");
    setEngineMax("");
    setBuisness(null);
    setRobber(null);
    setChangeNumber(null);
    setInsuare(null);
    setInsuarePrice(null);
    setChangeOwner(null);
  };
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
      engineMin: engineMin,
      engineMax: engineMax,
      buisness: buisness,
      robber: robber,
      changeNumber: changeNumber,
      changeOwner: changeOwner,
      insuare: insuare,
      insuarePrice: insuarePrice,
    };
    const query = qs.stringify(params, {
      arrayFormat: "comma",
      skipNulls: true,
    });
    router.push(`?${query}`, {
      scroll: false,
    });
  };
  const [countServer, setCountcountServer] = React.useState<Prop>();
  React.useEffect(() => {
    async function getCounts() {
      try {
        const maxCount = await Api.count.getMaxCount();
        setCountcountServer(maxCount);
      } catch (error) {
        console.log(error);
      }
    }
    getCounts();
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "sm:mx-0 text-zinc-800 max-w-5xl mt-16  bg-gray-100 grid grid-cols-12 grid-flow-dense rounded-t-xl p-3 sm:p-4 lg:p-6 gap-6 transition-opacity duration-400 ease-in"
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
        priceMin={priceMin}
        priceMax={priceMax}
        fuels={fuels}
        yearMin={yearsMin}
        yearMax={yearsMax}
      />
      {view && (
        <AdvancedSelect
          onChangeBuisness={setBuisness}
          onChangeEngineMax={setEngineMax}
          onChangeEngineMin={setEngineMin}
          onChangeRobber={setRobber}
          onChangeNomer={setChangeNumber}
          onChangeOwner={setChangeOwner}
          onChangeInsuare={setInsuare}
          onChangeInsuarePrice={setInsuarePrice}
          insuare={insuare}
          count={countServer?.count}
          engineMin={engineMin}
          engineMax={engineMax}
          buisness={buisness}
          robber={robber}
          changeOwner={changeOwner}
          changeNumber={changeNumber}
          insuarePrice={insuarePrice}
        />
      )}
      <div
        className={cn(
          "overflow-hidden  transition-all duration-500 ease-out",
          view && "h-auto"
        )}
        style={view ? { height: "20px" } : { height: "0px" }}
      ></div>
      <div className="flex flex-col sm:flex-row col-span-12 gap-6 mt-0">
        <div className="relative text-sm w-full grow sm:w-1/2 md:w-1/3">
          <div
            onClick={handleRemove}
            className="flex  gap-1 items-center justify-center py-4 px-6 cursor-pointer"
          >
            <TiDeleteOutline size={20} /> Сбросить все
          </div>
        </div>
        <div className="relative text-sm w-full grow sm:w-1/2 md:w-1/3">
          <div
            onClick={() => setView(!view)}
            className="flex items-center   gap-1 justify-center py-4 px-6 cursor-pointer"
          >
            {view ? "Расширеный поиск" : "Обычный поиск"}

            <FaChevronDown size={10} className={view ? "rotate-180" : ""} />
          </div>
        </div>
        <div className="relative text-sm w-full grow sm:w-1/2 md:w-1/3">
          {/* <p className=" ">&nbsp;</p> */}
          <Button variant={"default"} type="submit" className="mt-2">
            Найти автомобиль
          </Button>
        </div>
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
