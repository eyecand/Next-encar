import {
  PaginationWithLinks,
  FormFilters,
  LoadingSpinner,
} from "@/components/shared";

import { GetSearchParams } from "@/lib/find-vehicle";

import React, { Suspense } from "react";
import { VehicleList } from "./vehicle-list/vehicle-list";
import { findVehicleV2 } from "@/lib/find-vehicle.-v2";

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

  return (
    <div className="mx-auto max-w-7xl mt-10">
      <h1 className="text-2xl md:text-4xl lg:text-[50px] font-bold px-5 mt-28 md:mt-32 lg:mt-40">
        Autofish - Продажа автомобилей
      </h1>

      <FormFilters totalTest={totalPage} />
      {/* Список товаров */}

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
  );
}
