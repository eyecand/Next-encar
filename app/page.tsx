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
  const { cbr } = await findCBR();
  const maxPage = Math.ceil(totalPage / 10);
  const currentPage = Math.min(
    maxPage,
    Math.max(1, parseInt((page as string) || "1"))
  );

  const EUR = cbr.find((item) => item.char_code === "EUR")?.value;
  const KRW = cbr.find((item) => item.char_code === "KRW")?.value;
  const fraht = cbr.find((item) => item.char_code === "fraht")?.value;
  const broker = cbr.find((item) => item.char_code === "broker")?.value;
  const k_krw = cbr.find((item) => item.char_code === "K_KRW")?.value;

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
            {/* Список товаров */}

            <Suspense fallback={<LoadingSpinner />}>
              <VehicleList
                vehicle={vehicle}
                EUR={Number(EUR)}
                KRW={Number(KRW)}
                broker={Number(broker)}
                fraht={Number(fraht)}
                k_krw={Number(k_krw)}
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
