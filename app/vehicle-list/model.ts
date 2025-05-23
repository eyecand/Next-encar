import { Decimal } from "@prisma/client/runtime/library";

export interface VehicleListProps {
  vehicle: {
    encar: {
      id: bigint;
      advertisements: { price: number } | null;
      details: {
        makes: {
          make_short_name: string | null;
        };
        model: {
          model_short_name: string | null;
        };
        grades: {
          grade_english: string | null;
        };
        form_year: number;
        mileage: number;
        engine_displacement: number;
        engine_displacement_liters: Decimal | number | null;
        fuel: {
          fuel_english: string | null;
        };
      } | null;
      lib_sell_types: { sell_type: string };
      photos: {
        url: string;
      }[];
    };
  }[];
}

export interface InterfaceProps extends VehicleListProps {
  className: string;
}
