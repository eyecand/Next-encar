import { LoadingSpinner, FormKoreaCars } from "@/components/shared";

import React, { Suspense } from "react";
import { VehicleList } from "./vehicle-list/vehicle-list";
import { findVehicleV2, GetSearchParams } from "@/lib/find-vehicle.-v2";
import PaginationComponent from "@/components/shared/pagination";

type ParamsProps = Promise<GetSearchParams>;

export default async function Home({
  searchParams,
}: {
  searchParams: ParamsProps;
}) {
  const searchParamsValue = await searchParams;
  const { page } = searchParamsValue;
  const { vehicle, totalPage } = await findVehicleV2(searchParamsValue);
  const maxPage = Math.ceil(totalPage / 10);
  const currentPage = Math.min(
    maxPage,
    Math.max(1, parseInt((page as string) || "1"))
  );
  const show = 0;
  return (
    <>
      <div className="mx-auto flex flex-col flex-1 w-full max-w-5xl mt-10">
        {show ? (
          <div className="flex flex-col justify-center items-center px-5 mt-28 md:mt-20">
            <h1 className="text-2xl md:text-4xl lg:text-[38px] font-bold mr-2">
              Ведутся технические работы
            </h1>
            <div className="mt-4">
              <LoadingSpinner />
            </div>
          </div>
        ) : (
          <>
            <h1 className="text-2xl md:text-4xl lg:text-[38px] font-bold px-5 mt-28 md:mt-20">
              Autofish - Продажа автомобилей
            </h1>
            <FormKoreaCars total={totalPage.toLocaleString()} />
            {/* <FormFilters totalTest={totalPage} /> */}
            {/* Список товаров */}

            <Suspense fallback={<LoadingSpinner />}>
              <VehicleList vehicle={vehicle} />
            </Suspense>
            <div className="mt-16">
              <PaginationComponent
                currentPage={currentPage}
                totalPages={maxPage}
                total={totalPage}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}
