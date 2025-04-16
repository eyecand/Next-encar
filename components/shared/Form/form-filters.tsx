"use client";
import { cn } from "@/lib/utils";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import qs from "qs";
import { BasicSelect } from "./basic-select";
import { MiddleSelect } from "./middle-select";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FaChevronDown } from "react-icons/fa";
import { IoIosArrowRoundUp, IoIosArrowRoundDown } from "react-icons/io";
import { TiDeleteOutline } from "react-icons/ti";
import { AdvancedSelect } from "./advanced-select";
import { Api } from "@/services/api-client";
import { useFilters } from "@/hooks/use-filters";
import { CountProp } from "./model";
import { ButtonSubmit } from "../button-submit";

export const FormFilters = ({ totalTest }: { totalTest: number }) => {
  const router = useRouter();
  const filters = useFilters();
  const isMounted = useRef(false);
  const [view, setView] = useState(false);
  const [loadingCount, setLoadingCount] = useState(false);
  useEffect(() => {
    if (isMounted.current) {
      const firstQuery = qs.stringify(
        {
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
          sort: filters.sort,
        },
        { arrayFormat: "comma", skipNulls: true }
      );
      router.push(`?${firstQuery}`, { scroll: false });
    }
    isMounted.current = true;
  }, [filters.sort]);
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
      sort: filters.sort,
    };
    const query = qs.stringify(params, {
      arrayFormat: "comma",
      skipNulls: true,
    });
    router.push(`?${query}`, {
      scroll: false,
    });
  };
  const [countNomer, setCountNomer] = useState<CountProp>();
  const [countOwner, setCountOwner] = useState<CountProp>();
  React.useEffect(() => {
    async function getCountsNomer() {
      try {
        setLoadingCount(true);
        const maxCount = await Api.count.getMaxCountNomer();
        setCountNomer(maxCount);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingCount(false);
      }
    }
    async function getCountsOwner() {
      try {
        setLoadingCount(true);
        const maxCountOwner = await Api.count.getMaxCountOwner();
        setCountOwner(maxCountOwner);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingCount(false);
      }
    }
    getCountsNomer();
    getCountsOwner();
  }, []);
  return (
    <>
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
            count={countNomer?.count}
            countOwner={countOwner?.count}
            engineMin={filters.engineMin}
            engineMax={filters.engineMax}
            buisness={filters.buisness}
            robber={filters.robber}
            changeOwner={filters.changeOwner}
            changeNumber={filters.changeNumber}
            insuarePrice={filters.insuarePrice}
            loadingCount={loadingCount}
          />
        )}
        <div
          className={cn(
            "overflow-hidden  transition-all duration-500 ease-out",
            view && "h-auto"
          )}
          style={view ? { height: "20px" } : { height: "0px" }}
        ></div>
        <div className="flex flex-col sm:flex-row col-span-12 gap-6 mt-[-40px] md:mt-0">
          <div className="relative text-sm w-full grow sm:w-1/2 md:w-1/3">
            <div
              onClick={handleRemove}
              className="flex  gap-1 items-center justify-center py-4 px-6 cursor-pointer hover:text-gray-400 transition-colors duration-200 ease-in"
            >
              <TiDeleteOutline size={20} /> Сбросить все
            </div>
          </div>
          <div className="relative text-sm w-full grow sm:w-1/2 md:w-1/3 hover:text-gray-400 transition-colors duration-200 ease-in">
            <div
              onClick={() => setView(!view)}
              className="flex items-center   gap-1 justify-center py-4 px-6 cursor-pointer"
            >
              {view ? "Обычный поиск" : "Расширеный поиск"}

              <FaChevronDown size={10} className={view ? "rotate-180" : ""} />
            </div>
          </div>
          <div className=" flex justify-center items-center relative text-sm w-full grow sm:w-1/2 md:w-1/3">
            <ButtonSubmit />
          </div>
        </div>
      </form>
      <div className="mt-10 max-w-5xl flex justify-between items-center p-5">
        <div className=" border-b-2 py-5">
          <h2 className="inline-block font-bold text-xl relative subtitle-page">
            {totalTest.toLocaleString()} объявления
          </h2>
        </div>
        <Select
          value={Boolean(filters.sort) ? String(filters.sort) : "all"}
          onValueChange={(value) => filters.setSort(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Сортировка" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">
                <div className="flex items-center">Любой</div>
              </SelectItem>
              <SelectItem value="priceMin">
                <div className="flex items-center">
                  Стоимость{" "}
                  <IoIosArrowRoundUp className="text-gray-400 text-[22px]" />
                </div>
              </SelectItem>
              <SelectItem value="priceMax">
                <div className="flex items-center">
                  Стоимость{" "}
                  <IoIosArrowRoundDown className="text-gray-400 text-[22px]" />
                </div>
              </SelectItem>
              <SelectItem value="yearMax">
                <div className="flex items-center">
                  {" "}
                  Год{" "}
                  <IoIosArrowRoundUp className="text-gray-400 text-[22px]" />
                </div>
              </SelectItem>
              <SelectItem value="yearMin">
                <div className="flex items-center">
                  Год{" "}
                  <IoIosArrowRoundDown className="text-gray-400 text-[22px]" />
                </div>
              </SelectItem>
              <SelectItem value="mileageMax">
                <div className="flex items-center">
                  Пробег{" "}
                  <IoIosArrowRoundUp className="text-gray-400 text-[22px]" />
                </div>
              </SelectItem>

              <SelectItem value="mileageMin">
                <div className="flex items-center">
                  Пробег{" "}
                  <IoIosArrowRoundDown className="text-gray-400 text-[22px]" />
                </div>
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </>
  );
};
