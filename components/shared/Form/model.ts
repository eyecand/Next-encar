export interface ModelProps {
  model_short_name: string;
}
export interface GradesProps {
  grades: {
    grade_english: string;
  };
}
export type CountProp = {
  count: number;
};

export interface Option {
  value: string | null;
  label: string | null;
}
export interface iOption {
  value: string;
  label: string;
}
