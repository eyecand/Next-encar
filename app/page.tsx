import { LoadingSpinner, FormKoreaCars } from "@/components/shared";

import React, { Suspense } from "react";
import { VehicleList } from "./vehicle-list/vehicle-list";
import { findVehicleV2, GetSearchParams } from "@/lib/find-vehicle.-v2";
import PaginationComponent from "@/components/shared/pagination";
import { findCBR } from "@/lib/find-cbr";

type ParamsProps = Promise<GetSearchParams>;

export default async function Home({
  searchParams,
}: {
  searchParams: ParamsProps;
}) {
  const searchParamsValue = await searchParams;
  const { page } = searchParamsValue;
  const { vehicle, totalPage } = await findVehicleV2(searchParamsValue);
  const { cbrMap } = await findCBR();

  const maxPage = Math.ceil(totalPage / 10);
  const currentPage = Math.min(
    maxPage,
    Math.max(1, parseInt((page as string) || "1"))
  );

  const show = 0;
  return (
    <>
      <div className="mx-auto flex flex-col flex-1 w-full max-w-7xl mt-3 md:mt-10 lg:mt-24">
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
              Autofish - Автомобили из Южной Кореи (Encar) под заказ
            </h1>
            <FormKoreaCars total={totalPage.toLocaleString()} />
            {/* Список товаров */}

            <Suspense fallback={<LoadingSpinner />}>
              <VehicleList
                vehicle={vehicle}
                EUR={Number(cbrMap.get("EUR"))}
                KRW={Number(cbrMap.get("KRW"))}
                broker={Number(cbrMap.get("broker"))}
                fraht={Number(cbrMap.get("fraht"))}
                k_krw={Number(cbrMap.get("K_KRW"))}
              />
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
