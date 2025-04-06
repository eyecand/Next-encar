import React from "react";
import { Desktop } from "@/app/vehicle-list/desktop/desktop";
import { Mobile } from "@/app/vehicle-list/mobile/mobile";
import { VehicleListProps } from "./model";

export const VehicleList: React.FC<VehicleListProps> = ({ vehicle }) => {
  return (
    <>
      <Mobile className="isMobile" vehicle={vehicle} />

      <Desktop className="Desktop" vehicle={vehicle} />
    </>
  );
};
