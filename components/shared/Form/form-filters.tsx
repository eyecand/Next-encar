"use client";
import { cn } from "@/lib/utils";
import React, { FormEvent } from "react";
import { useRouter } from "next/navigation";
import qs from "qs";
import { BasicSelect } from "./basic-select";
import { MiddleSelect } from "./middle-select";

import { FaChevronDown } from "react-icons/fa";
import { TiDeleteOutline } from "react-icons/ti";
import { AdvancedSelect } from "./advanced-select";
import { Api } from "@/services/api-client";
import { useFilters } from "@/hooks/use-filters";
import { CountProp } from "./model";
import { ButtonSubmit } from "../button-submit";

export const FormFilters = () => {
  const router = useRouter();
  const filters = useFilters();
  const [view, setView] = React.useState(false);
  const handleRemove = () => {
    filters.setMakesType(null);
    filters.setModelType(null);
    filters.setGradesType(null);
    filters.setFuels(null);
    filters.setYearsMin(null);
    filters.setYearsMax(null);
    filters.setPriceMin("");
    filters.setPriceMax("");
    filters.setEngineMin("");
    filters.setEngineMax("");
    filters.setBuisness(null);
    filters.setRobber(null);
    filters.setChangeNumber(null);
    filters.setInsuare(null);
    filters.setInsuarePrice(null);
    filters.setChangeOwner(null);
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.refresh();
    const params = {
      makes: filters.makesType,
      model: filters.modelType,
      grades: filters.gradesType,
      fuels: filters.fuels,
      yearsMin: filters.yearsMin,
      yearsMax: filters.yearsMax,
      priceMin: filters.priceMin,
      priceMax: filters.priceMax,
      engineMin: filters.engineMin,
      engineMax: filters.engineMax,
      buisness: filters.buisness,
      robber: filters.robber,
      changeNumber: filters.changeNumber,
      changeOwner: filters.changeOwner,
      insuare: filters.insuare,
      insuarePrice: filters.insuarePrice,
    };
    const query = qs.stringify(params, {
      arrayFormat: "comma",
      skipNulls: true,
    });
    router.push(`?${query}`, {
      scroll: false,
    });
  };
  const [countServer, setCountcountServer] = React.useState<CountProp>();
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
        onChangeMakes={filters.setMakesType}
        onChangeModels={filters.setModelType}
        onChangeGrades={filters.setGradesType}
        make={filters.makesType}
        model={filters.modelType}
        grade={filters.gradesType}
      />

      <MiddleSelect
        onChangeFuels={filters.setFuels}
        onChangeYearMin={filters.setYearsMin}
        onChangeYearMax={filters.setYearsMax}
        onChangePriceMin={filters.setPriceMin}
        onChangePriceMax={filters.setPriceMax}
        priceMin={filters.priceMin}
        priceMax={filters.priceMax}
        fuels={filters.fuels}
        yearMin={filters.yearsMin}
        yearMax={filters.yearsMax}
      />
      {view && (
        <AdvancedSelect
          onChangeBuisness={filters.setBuisness}
          onChangeEngineMax={filters.setEngineMax}
          onChangeEngineMin={filters.setEngineMin}
          onChangeRobber={filters.setRobber}
          onChangeNomer={filters.setChangeNumber}
          onChangeOwner={filters.setChangeOwner}
          onChangeInsuare={filters.setInsuare}
          onChangeInsuarePrice={filters.setInsuarePrice}
          insuare={filters.insuare}
          count={countServer?.count}
          engineMin={filters.engineMin}
          engineMax={filters.engineMax}
          buisness={filters.buisness}
          robber={filters.robber}
          changeOwner={filters.changeOwner}
          changeNumber={filters.changeNumber}
          insuarePrice={filters.insuarePrice}
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
            {view ? "Обычный поиск" : "Расширеный поиск"}

            <FaChevronDown size={10} className={view ? "rotate-180" : ""} />
          </div>
        </div>
        <div className="relative text-sm w-full grow sm:w-1/2 md:w-1/3">
          <ButtonSubmit />
        </div>
      </div>
    </form>
  );
};
