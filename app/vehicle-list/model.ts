import { Decimal } from "@prisma/client/runtime/library";

export interface VehicleListProps {
  vehicle: {
    encar: {
      id: bigint;
      created_at: Date;
      advertisements: { price: number } | null;
      details: {
        makes: {
          make_short_name: string | null;
        };
        model: {
          model_english: string | null;
          model_short_name: string | null;
        };
        grades: {
          grade_english: string | null;
          grade_detail_english: string | null;
        };
        form_year: number;
        mileage: number;
        release_date: Date;
        engine_displacement: number;
        engine_displacement_liters: Decimal | number | null;
        fuel: {
          fuel_english: string | null;
        };
      } | null;
      accident: {
        current_accident_count: number;
        other_accident_count: number;
      } | null;
      lib_sell_types: { sell_type: string };
      photos: {
        s3_images: {
          url: string;
        } | null;
      }[];
    };
  }[];
  EUR: number;
  KRW: number;
  fraht: number;
  broker: number;
  k_krw: number;
  commision: number;
}

export interface InterfaceProps extends VehicleListProps {
  className: string;
}
