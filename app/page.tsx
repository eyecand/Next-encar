import {
  Accardion,
  PaginationWithLinks,
  TopBar,
  VehicleList,
} from "@/components/shared";

import { findVehicle, GetSearchParams } from "@/lib/find-vehicle";

import React from "react";
type ParamsProps = Promise<GetSearchParams>;
export default async function Home({
  searchParams,
}: {
  searchParams: ParamsProps;
}) {
  const searchParamsValue = await searchParams;
  const { page, pageSize } = searchParamsValue;

  const { vehicle, totalPage } = await findVehicle(searchParamsValue);
  const currentPage = parseInt((page as string) || "1");
  const take = parseInt((pageSize as string) || "10");
  // const currentPage = searchParams.page ?? 1;

  return (
    <div className="mx-auto max-w-7xl mt-10">
      <h1 className="text-[50px] font-bold px-5 mt-40">
        Autofish - Продажа автомобилей
      </h1>
      <TopBar />

      <Accardion />
      {/* Список товаров */}

      <div className="mt-10 max-w-5xl p-5">
        <div className=" border-b-2 py-5">
          <h2 className="inline-block font-bold text-xl relative subtitle-page">
            {totalPage.toLocaleString()} объявления
          </h2>
        </div>
      </div>
      <VehicleList vehicle={vehicle} />

      <div className="mt-10">
        {totalPage ? (
          <PaginationWithLinks
            page={currentPage}
            pageSize={take}
            totalCount={totalPage}
          />
        ) : null}
      </div>
    </div>
  );
}
