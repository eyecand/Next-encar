// import { useSearchParams } from "next/navigation";
// import { useMemo } from "react";
// import { useSet } from "react-use";
// interface QueryFilters {
//   makes: string;
//   model: string;
//   grade: string;
// }

// export interface Filtres {
//   makesType: Set<string>;
//   modelType: Set<string>;
//   gradesType: Set<string>;
// }
// interface ReturnProps extends Filtres {
//   toggleMakeType: (value: string) => void;
//   resetMake: () => void;
//   toggleModelType: (value: string) => void;
//   resetModel: () => void;
//   toggleGradesType: (value: string) => void;
//   resetGrades: () => void;
//   clearModel: () => void;
// }
// export const useFilters = (): ReturnProps => {
//   const searchParams = useSearchParams() as unknown as Map<
//     keyof QueryFilters,
//     string
//   >;
//   const [makesType, { toggle: toggleMakeType, reset: resetMake }] = useSet(
//     new Set<string>(searchParams.has("makes") ? searchParams.get("makes") : [])
//   );
//   const [
//     modelType,
//     { toggle: toggleModelType, reset: resetModel, clear: clearModel },
//   ] = useSet(
//     new Set<string>(searchParams.has("model") ? searchParams.get("model") : [])
//   );
//   const [gradesType, { toggle: toggleGradesType, reset: resetGrades }] = useSet(
//     new Set<string>(searchParams.has("grade") ? searchParams.get("grade") : [])
//   );

//   return useMemo(
//     () => ({
//       makesType,
//       modelType,
//       gradesType,
//       toggleMakeType,
//       resetMake,
//       toggleModelType,
//       resetModel,
//       toggleGradesType,
//       resetGrades,
//       clearModel,
//     }),
//     [makesType, modelType, gradesType]
//   );
// };
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { useSet } from "react-use";
export interface QueryFilters {
  makes: string;
  model: string;
  grade: string;
}
interface Option {
  value: string;
  label: string;
}
export interface Filtres {
  makesType: Set<string>;
  modelType: Set<string>;
  gradesType: Set<string>;
}
interface ReturnProps extends Filtres {
  toggleMakesType: (value: string) => void;
  toggleModelType: (value: string) => void;
  resetMakes: () => void;
  resetModel: () => void;
  toggleGradesType: (value: string) => void;
  resetGrades: () => void;
  clearModel: () => void;
  clearMakes: () => void;
}
export const useFilters = (): ReturnProps => {
  const searchParams = useSearchParams();
  const [
    makesType,
    { toggle: toggleMakesType, reset: resetMakes, clear: clearMakes },
  ] = useSet(
    new Set<string>(searchParams.has("makes") ? searchParams.get("makes") : [])
  );
  const [
    modelType,
    { toggle: toggleModelType, reset: resetModel, clear: clearModel },
  ] = useSet(
    new Set<string>(searchParams.has("model") ? searchParams.get("model") : [])
  );
  const [gradesType, { toggle: toggleGradesType, reset: resetGrades }] = useSet(
    new Set<string>(searchParams.has("grade") ? searchParams.get("grade") : [])
  );

  return useMemo(
    () => ({
      makesType,
      modelType,
      gradesType,
      toggleMakesType,
      toggleModelType,
      resetModel,
      resetMakes,
      toggleGradesType,
      resetGrades,
      clearModel,
      clearMakes,
    }),
    [makesType, modelType, gradesType]
  );
};
