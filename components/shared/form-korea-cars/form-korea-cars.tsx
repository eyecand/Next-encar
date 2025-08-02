"use client";

import React, { FormEvent, useEffect, useState } from "react";
import qs from "qs";
import { useFilters } from "@/hooks/use-filters";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { FirstLine } from "./first-line/first-line";
import { SecondLine } from "./second-line/second-line";
import { TherdLine } from "./third-line";
import { FourthLine } from "./fourth-line/fourth-line";
import { ButtonSubmit } from "../button-submit";
import { optionSort } from "./fourth-line/constanst";
import { detectSort } from "./fourth-line/lib";
import { iOption } from "./fourth-line/model";
import { FiveLine } from "./five-line";
const NoSSR = dynamic(() => import("react-select"), { ssr: false });
export const FormKoreaCars = ({ total }: { total: string }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isCheckedNewCar, setIsCheckedNewCar] = useState(false);
  const [isCheckedOldCar, setIsCheckedOldCar] = useState(false);
  const router = useRouter();
  const filters = useFilters();
  useEffect(() => {
    const url = {
      makes: filters.makesType,
      model: filters.modelType,
      grades: filters.gradesType,
      evolutons: filters.evolutonsType,
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
      privod: filters.privod,
      transmission: filters.transmission,
      mileageMin: filters.mileageMin,
      mileageMax: filters.mileageMax,
      cities: filters.cities,
      check: filters.check,
      checkNew: filters.checkNewCar,
      checkOld: filters.checkOldCar,
    };
    const queryUrl = qs.stringify(url, {
      arrayFormat: "comma",
      skipNulls: true,
    });
    router.push(`?${queryUrl}`, {
      scroll: false,
    });
  }, [filters.sort]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.refresh();
    const params = {
      makes: filters.makesType,
      model: filters.modelType,
      grades: filters.gradesType,
      grades_eng: filters.gradeEng,
      grades_det: filters.gradeDetail,
      evolutons: filters.evolutonsType,
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
      privod: filters.privod,
      transmission: filters.transmission,
      mileageMin: filters.mileageMin,
      mileageMax: filters.mileageMax,
      cities: filters.cities,
      check: filters.check,
      checkNew: filters.checkNewCar,
      checkOld: filters.checkOldCar,
    };
    const query = qs.stringify(params, {
      arrayFormat: "comma",
      skipNulls: true,
    });
    router.push(`?${query}`, {
      scroll: false,
    });
  };
  const handleRemove = () => {
    filters.setMakesType(null);
    filters.setModelType(null);
    filters.setPrivod(null);
    filters.setFuels(null);
    filters.setYearsMin(null);
    filters.setYearsMax(null);
    filters.setTransmission(null);
    filters.setPriceMin("");
    filters.setPriceMax("");
    filters.setEngineMin(null);
    filters.setEngineMax(null);
    filters.setMileageMin(null);
    filters.setMileageMax(null);
    filters.setInsuarePrice(null);
    filters.setCities(null);
    filters.setSort(null);
    filters.setGradesType(null);
    filters.setGradesEng(null);
    filters.setGradesDetail(null);
    filters.setEvolutionsType(null);
    setIsChecked(false);
    setIsCheckedNewCar(false);
    setIsCheckedOldCar(false);
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="sm:mx-0 text-zinc-800 max-w-7xl mt-10 bg-gray-100 grid grid-cols-12 grid-flow-dense rounded-t-xl p-3 sm:p-4 lg:p-5 gap-2 transition-opacity duration-400 ease-in"
      >
        <FirstLine
          onChangeMakes={filters.setMakesType}
          onChangeModels={filters.setModelType}
          onChangeGrade={filters.setGradesType}
          onChangeGradeEnglish={filters.setGradesEng}
          onChangeGradeDetail={filters.setGradesDetail}
          onChangeEvolution={filters.setEvolutionsType}
          make={filters.makesType}
          model={filters.modelType}
          evolution={filters.evolutonsType}
          grade={filters.gradesType}
        />
        <TherdLine
          engineMax={filters.engineMax}
          engineMin={filters.engineMin}
          mileageMin={filters.mileageMin}
          mileageMax={filters.mileageMax}
          onChangeEngineMax={filters.setEngineMax}
          onChangeEngineMin={filters.setEngineMin}
          onChengeMileageMin={filters.setMileageMin}
          onChengeMileageMax={filters.setMileageMax}
          onChangeYearMin={filters.setYearsMin}
          onChangeYearMax={filters.setYearsMax}
          yearMin={filters.yearsMin}
          yearMax={filters.yearsMax}
        />
        <SecondLine
          transmission={filters.transmission}
          onChangeFuels={filters.setFuels}
          onChangePrivod={filters.setPrivod}
          onChangeTransmission={filters.setTransmission}
          fuels={filters.fuels}
          privod={filters.privod}
        />
        <FourthLine
          priceMax={filters.priceMax}
          priceMin={filters.priceMin}
          cities={filters.cities}
          insuarePrice={filters.insuarePrice}
          onChangeCities={filters.setCities}
          onChangePriceMax={filters.setPriceMax}
          onChangePriceMin={filters.setPriceMin}
          onChangeInsuarePrice={filters.setInsuarePrice}
        />
        <FiveLine
          isChecked={isChecked}
          isCheckedNewCar={isCheckedNewCar}
          isCheckedOldCar={isCheckedOldCar}
          setIsChecked={setIsChecked}
          setIsCheckedNewCar={setIsCheckedNewCar}
          setIsCheckedOldCar={setIsCheckedOldCar}
          onChangeCheck={filters.setCheck}
          onChangeCheckNew={filters.setCheckNewCar}
          onChangeCheckOld={filters.setCheckOldCar}
        />
        <ButtonSubmit handleRemove={handleRemove} />
      </form>
      <div className="max-w-7xl p-5">
        <div className=" border-b-2 py-5 flex justify-between items-center">
          <h2 className="inline-block font-bold text-base sm:text-xl relative subtitle-page">
            {total} объявления
          </h2>
          <div className="w-40 text-[16px] sm:w-52 md:text-sm ">
            <NoSSR
              classNamePrefix={"sort"}
              placeholder="Сортировка"
              options={optionSort}
              value={
                filters.sort
                  ? [
                      {
                        value: filters.sort,
                        label: detectSort(filters.sort),
                      },
                    ]
                  : []
              }
              onChange={(option) => {
                filters.setSort((option as iOption).value);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};
