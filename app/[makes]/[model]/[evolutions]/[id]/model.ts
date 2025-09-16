type AccidentProps = {
  current_accident_count: number;
  other_accident_count: number;
  robber_count: number;
  flood_total_loss_count: number;
  flood_part_loss_count: number;
  government: boolean;
  business: boolean;
  loan: boolean;
};
type AccidentDetailsProps = {
  date: Date;
  type: string;
  insurance_benefit: number;
  part_cost: number;
  labor_cost: number;
  painting_cost: number;
};
type DiagnosticsProps = {
  actual_diagnostic_date: Date;
  diagnosis:
    | {
        diagnosis_code_id: number;
        diagnosis_result_id: number | null;
        comments:
          | {
              comment_russian: string | null;
            }
          | null
          | undefined;
      }[];
};

export type VehicleIdProps = {
  id: string;
  auctionId: number;
  advertisements: { price: number } | null;
  details: {
    model: {
      model_english: string | null;
      model_short_name: string | null;
    };
    drive: { drive_type: string } | null;
    makes: { make_short_name: string | null };
    release_date: Date;
    grades: {
      grade_english: string | null;
      grade_detail_english: string | null;
    };
    fuel: {
      fuel_english: string | null;
    };
    colours: {
      color_english: string | null;
    };
    form_year: number;
    mileage: number;
    engine_displacement: number;
    transmission: { transmission_english: string | null };
  } | null;
  inspections: {
    inspection_details:
      | {
          lib_component_items: {
            name_english: string | null;
          };
          lib_component_subitems: {
            name_english: string | null;
          } | null;
          lib_conditions: {
            name_english: string | null;
          } | null;
          lib_main_components: {
            name_english: string | null;
          };
        }[];
  } | null;
  sell_type: string;
  vehicle_plate_number: string | null;
  accident_details: AccidentDetailsProps[];
  accident: AccidentProps | null;
  diagnostics: DiagnosticsProps | null;
  EUR: number;
  KRW: number;
  fraht: number;
  broker: number;
  k_krw: number;
  commision: number;
};
export type AlertDiagnosticProps = {
  diagnostics: DiagnosticsProps | null;
  inspections:
    | {
        lib_component_items: {
          name_english: string | null;
        };
        lib_component_subitems: {
          name_english: string | null;
        } | null;
        lib_conditions: {
          name_english: string | null;
        } | null;
        lib_main_components: {
          name_english: string | null;
        };
      }[]
    | undefined;
};
export type StatisticAlertDialogProps = {
  details: {
    model: {
      model_english: string | null;
    };
    makes: { make_short_name: string | null };
    grades: {
      grade_english: string | null;
      grade_detail_english: string | null;
    };
    fuel: {
      fuel_english: string | null;
    };
    colours: {
      color_english: string | null;
    };
    form_year: number;
    mileage: number;
    release_date: Date;
    engine_displacement: number;
    transmission: { transmission_english: string | null };
  } | null;
  plate_number: string | null;
  accident: AccidentProps | null;
  accident_details: AccidentDetailsProps[];
};
