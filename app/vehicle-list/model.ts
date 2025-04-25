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
        fuel: {
          fuel_english: string | null;
        };
      } | null;
      photos: {
        url: string;
      }[];
    };
  }[];
}

export interface InterfaceProps extends VehicleListProps {
  className: string;
}
