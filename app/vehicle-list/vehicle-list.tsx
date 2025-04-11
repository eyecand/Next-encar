"use client";
import React from "react";
import { Desktop } from "@/app/vehicle-list/desktop/desktop";
import { Mobile } from "@/app/vehicle-list/mobile/mobile";
import { VehicleListProps } from "./model";
import { usePendingFormtore } from "@/store/pending-form";
import { LoadingSpinner } from "@/components/shared";

export const VehicleList: React.FC<VehicleListProps> = ({ vehicle }) => {
  const pending = usePendingFormtore((state) => state.pendingForm);
  return (
    <>
      {pending ? (
        <LoadingSpinner />
      ) : (
        <>
          <Mobile className="isMobile" vehicle={vehicle} />
          <Desktop className="Desktop" vehicle={vehicle} />
        </>
      )}
    </>
  );
};
