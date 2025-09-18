"use client";
import React, { useEffect, useState } from "react";
import { Desktop } from "@/app/vehicle-list/desktop/desktop";
import { Mobile } from "@/app/vehicle-list/mobile/mobile";
import { VehicleListProps } from "./model";
import { usePendingFormtore } from "@/store/pending-form";
import { LoadingSpinner } from "@/components/shared";

export const VehicleList: React.FC<VehicleListProps> = ({
  vehicle,
  EUR,
  KRW,
  fraht,
  broker,
  k_krw,
  commision,
}) => {
  const pending = usePendingFormtore((state) => state.pendingForm);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Функция для определения, мобильный ли экран
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };

    // Вызовем сразу при монтировании
    handleResize();

    // Добавим слушатель
    window.addEventListener("resize", handleResize);

    // Очистка
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {pending ? (
        <LoadingSpinner />
      ) : (
        <>
          {!isMobile && (
            <Desktop
              vehicle={vehicle}
              EUR={EUR}
              KRW={KRW}
              broker={broker}
              fraht={fraht}
              k_krw={k_krw}
              commision={commision}
            />
          )}
          {isMobile && (
            <Mobile
              vehicle={vehicle}
              EUR={EUR}
              KRW={KRW}
              broker={broker}
              fraht={fraht}
              k_krw={k_krw}
              commision={commision}
            />
          )}
        </>
      )}
    </>
  );
};
