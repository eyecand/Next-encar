"use client";

import React, { FormEvent } from "react";
import qs from "qs";
import { useFilters } from "@/hooks/use-filters";

import { useRouter } from "next/navigation";
import { FirstLine } from "./first-line/first-line";
import { SecondLine } from "./second-line/second-line";
import { TherdLine } from "./third-line";
import { FourthLine } from "./fourth-line/fourth-line";
import { ButtonSubmit } from "../button-submit";

export const FormKoreaCars = () => {
  const router = useRouter();
  const filters = useFilters();

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
      privod: filters.privod,
      transmission: filters.transmission,
      mileageMin: filters.mileageMin,
      mileageMax: filters.mileageMax,
      cities: filters.cities,
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
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="sm:mx-0 text-zinc-800 max-w-5xl mt-10 bg-gray-100 grid grid-cols-12 grid-flow-dense rounded-t-xl p-3 sm:p-4 lg:p-5 gap-2 transition-opacity duration-400 ease-in"
    >
      <FirstLine
        onChangeMakes={filters.setMakesType}
        onChangeModels={filters.setModelType}
        onChangeYearMin={filters.setYearsMin}
        onChangeYearMax={filters.setYearsMax}
        make={filters.makesType}
        model={filters.modelType}
        yearMin={filters.yearsMin}
        yearMax={filters.yearsMax}
      />
      <SecondLine
        onChangeFuels={filters.setFuels}
        onChangePrivod={filters.setPrivod}
        onChangeTransmission={filters.setTransmission}
        fuels={filters.fuels}
        privod={filters.privod}
        transmission={filters.transmission}
      />
      <TherdLine
        engineMax={filters.engineMax}
        engineMin={filters.engineMin}
        priceMax={filters.priceMax}
        priceMin={filters.priceMin}
        mileageMin={filters.mileageMin}
        mileageMax={filters.mileageMax}
        onChangeEngineMax={filters.setEngineMax}
        onChangeEngineMin={filters.setEngineMin}
        onChangePriceMax={filters.setPriceMax}
        onChangePriceMin={filters.setPriceMin}
        onChengeMileageMin={filters.setMileageMin}
        onChengeMileageMax={filters.setMileageMax}
      />
      <FourthLine
        insuarePrice={filters.insuarePrice}
        cities={filters.cities}
        sort={filters.sort}
        onChangeInsuarePrice={filters.setInsuarePrice}
        onChangeCities={filters.setCities}
        onChangeSort={filters.setSort}
      />
      <ButtonSubmit handleRemove={handleRemove} />
    </form>
  );
};

// Верное решение

/* <div className="mt-10 rounded-xl max-w-6xl p-7 bg-slate-200">
      <form
        action=""
        className="flex flex-row flex-wrap justify-around w-auto p-0 max-w-6xl"
      >
        <select
          name="mark"
          id="mark"
          className="w-full lg:w-[calc(33.3333%-0.5rem)] h-[60px] border border-b-gray-300 rounded-xl m-1" 
        ></select>
        <select
          name="model"
          id="model"
          className="w-full lg:w-[calc(33.3333%-0.5rem)] h-[60px] border border-b-gray-300 m-1" 
        ></select>
        <div className="w-full lg:w-[calc(33.3333%-0.5rem)] flex justify-between m-1">
          <select
            name="yearmin"
            id="yearmin"
            className="w-1/2 h-[60px] border border-b-gray-300 m-1"
          ></select>
          <select
            name="yearamx"
            id="yearamx"
            className="w-1/2 h-[60px] border border-b-gray-300 m-1"
          ></select>
        </div>
        <select
          name="fuel"
          id="fuel"
          className="w-full lg:w-[calc(33.3333%-0.5rem)] h-[60px] border border-b-gray-300 m-1" 
        ></select>
        <select
          name="drive_type"
          id="drive_type"
          className="w-full lg:w-[calc(33.3333%-0.5rem)] h-[60px] border border-b-gray-300 m-1" 
        ></select>
        <select
          name="transmission"
          id="transmission"
          className="w-full lg:w-[calc(33.3333%-0.5rem)] h-[60px] border border-b-gray-300 p-0 lg:pl-3 m-1" 
        ></select>
      </form>
    </div> */
