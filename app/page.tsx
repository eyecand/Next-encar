import {
  PaginationWithLinks,
  LoadingSpinner,
  FormKoreaCars,
} from "@/components/shared";

import React, { Suspense } from "react";
import { VehicleList } from "./vehicle-list/vehicle-list";
import { findVehicleV2, GetSearchParams } from "@/lib/find-vehicle.-v2";

type ParamsProps = Promise<GetSearchParams>;

export default async function Home({
  searchParams,
}: {
  searchParams: ParamsProps;
}) {
  const searchParamsValue = await searchParams;
  const { page, pageSize } = searchParamsValue;
  const { vehicle, totalPage } = await findVehicleV2(searchParamsValue);
  const currentPage = parseInt((page as string) || "0");
  const take = parseInt((pageSize as string) || "10");
  const members = 0;
  return (
    <>
      <div className="mx-auto flex flex-col flex-1 w-full max-w-5xl mt-10">
        <h1 className="text-2xl md:text-4xl lg:text-[38px] font-bold px-5 mt-28 md:mt-20">
          Autofish - Продажа автомобилей
        </h1>

        <FormKoreaCars />
        {/* <FormFilters totalTest={totalPage} /> */}
        {/* Список товаров */}
        <div className="max-w-5xl p-5">
          <div className=" border-b-2 py-5">
            <h2 className="inline-block font-bold text-xl relative subtitle-page">
              {totalPage.toLocaleString()} объявления
            </h2>
          </div>
        </div>
        <Suspense fallback={<LoadingSpinner />}>
          <VehicleList vehicle={vehicle} />
        </Suspense>
        <div className="mt-16">
          <PaginationWithLinks
            page={currentPage}
            pageSize={take}
            totalCount={totalPage}
          />
        </div>
      </div>
    </>
  );
}
