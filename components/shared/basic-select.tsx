"use client";
import { useMakes } from "@/hooks/useMakes";
import { Api } from "@/services/api-client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { GradesProps, ModelProps } from "./form-filters";
interface Option {
  value: string | null;
  label: string | null;
}
interface iOption {
  value: string;
  label: string;
}
interface Props<T> {
  onChangeMakes: (value: T) => void;
  onChangeModels: (value: T) => void;
  onChangeGrades: (value: T) => void;
  make: string | null;
  model: string | null;
  grade: string | null;
}
const NoSSR = dynamic(() => import("react-select"), { ssr: false });

export const BasicSelect: React.FC<Props<string | null>> = ({
  onChangeMakes,
  onChangeModels,
  onChangeGrades,

  make,
  model,
  grade,
}) => {
  const { makes } = useMakes();
  const [mod, setMod] = useState<ModelProps[]>([]);
  const [grades, setGrades] = useState<GradesProps[]>([]);

  const optionMakes: Option[] = [
    {
      value: null,
      label: "Все",
    },
  ];
  const optionsModels: Option[] = [
    {
      value: null,
      label: "Все",
    },
  ];
  const optionsGrades: Option[] = [
    {
      value: null,
      label: "Все",
    },
  ];
  makes.map((item) => {
    return optionMakes.push({
      value: item.make_english,
      label: item.make_english,
    });
  });
  mod.map((item) => {
    return optionsModels.push({
      value: item.model.model_english,
      label: item.model.model_english,
    });
  });

  grades.map((item) => {
    return optionsGrades.push({
      value: item.grades.grade_english,
      label: item.grades.grade_english,
    });
  });
  useEffect(() => {
    async function test(params: string) {
      try {
        const response = await Api.models.getModels(params);
        setMod(response);
      } catch (error) {
        console.log(error);
      }
    }
    async function grades(makes: string | null, model: string | null) {
      try {
        const response = await Api.grades.getGrades(makes, model);
        setGrades(response);
      } catch (error) {
        console.log(error);
      }
    }
    if (make) {
      test(make);
    }
    if (Boolean(make) && Boolean(model)) {
      grades(make, model);
    }
  }, [make, model]);

  const handleMakesChange = (selectedOptions: iOption | null) => {
    if (selectedOptions) onChangeMakes(selectedOptions?.value);
    onChangeModels(null);
    onChangeGrades(null);
  };
  const handleModelsChange = (selectedOptions: iOption | null) => {
    if (selectedOptions) onChangeModels(selectedOptions?.value);
    onChangeGrades(null);
  };
  const handleGradesChange = (selectedOptions: iOption | null) => {
    if (selectedOptions) onChangeGrades(selectedOptions?.value);
  };

  return (
    <div className="flex flex-col sm:flex-row col-span-12 gap-6">
      <div className="relative text-sm w-full grow sm:w-1/2 md:w-1/3">
        <NoSSR
          placeholder="Марка"
          options={optionMakes}
          value={
            make
              ? [
                  {
                    value: make,
                    label: make,
                  },
                ]
              : []
          }
          onChange={(option) => handleMakesChange(option as iOption)}
          isClearable
        />
      </div>
      <div className="relative text-sm w-full grow sm:w-1/2 md:w-1/3">
        <NoSSR
          placeholder="Модель"
          options={optionsModels}
          value={
            model
              ? [
                  {
                    value: model,
                    label: model,
                  },
                ]
              : []
          }
          onChange={(option) => handleModelsChange(option as iOption)}
          isDisabled={!Boolean(make)}
          isClearable
        />
      </div>
      <div className="relative text-sm w-full grow sm:w-1/2 md:w-1/3">
        <NoSSR
          placeholder="Комплектация"
          options={optionsGrades}
          value={
            grade
              ? [
                  {
                    value: grade,
                    label: grade,
                  },
                ]
              : []
          }
          onChange={(option) => handleGradesChange(option as iOption)}
          isDisabled={!Boolean(model)}
        />
      </div>
    </div>
  );
};

// "use client";
// import { useMakes } from "@/hooks/useMakes";
// import { Api } from "@/services/api-client";
// import dynamic from "next/dynamic";
// import { useEffect, useState } from "react";
// import { OptionsType, SingleValue } from "react-select";
// import { GradesProps, ModelProps } from "./form-filters";
// interface Option {
//   value: string;
//   label: string;
// }
// interface Props {
//   onChangeMakes: (value: string | undefined) => void;
//   onChangeModels: (value: string | undefined) => void;
//   onChangeGrades: (value: string | undefined) => void;
//   make: Set<String>;
//   model: Set<String>;
//   grade: Set<String>;
//   resetMakes: () => void;
//   resetModels: () => void;
//   resetGrades: () => void;
// }
// const NoSSR = dynamic(() => import("react-select"), { ssr: false });

// export const BasicSelect: React.FC<Props> = ({
//   onChangeMakes,
//   onChangeModels,
//   onChangeGrades,
//   resetMakes,
//   resetModels,
//   resetGrades,
//   make,
//   model,
//   grade,
// }) => {
//   const { makes } = useMakes();
//   const [mod, setMod] = useState<ModelProps[]>([]);
//   const [grades, setGrades] = useState<GradesProps[]>([]);
//   const optionsMakes: OptionsType<Option> = makes.map((item) => {
//     return { value: item.make_english, label: item.make_english };
//   });
//   let optionsModels: OptionsType<Option> = [
//     {
//       value: "",
//       label: "Все",
//     },
//   ];
//   let optionsGrades: OptionsType<Option> = [];
//   mod.map((item) => {
//     return optionsModels.push({
//       value: item.model.model_english,
//       label: item.model.model_english,
//     });
//   });
//   optionsGrades = grades.map((item) => {
//     return {
//       value: item.grades.grade_english,
//       label: item.grades.grade_english,
//     };
//   });
//   useEffect(() => {
//     async function test(params: string) {
//       try {
//         const response = await Api.models.getModels(params);
//         setMod(response);
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     async function grades(makes: string, model: string) {
//       try {
//         const response = await Api.grades.getGrades(makes, model);
//         setGrades(response);
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     if (Boolean(make.size)) {
//       test(make.values().next().value);
//     }
//     if (Boolean(make.size) && Boolean(model.size)) {
//       grades(make.values().next().value, model.values().next().value);
//     }
//   }, [make, model]);
//   console.log("inSelect", model);
//   const handleMakesChange = (selectedOptions: SingleValue<Option>) => {
//     resetMakes();
//     onChangeMakes(selectedOptions?.value);
//     onChangeModels(null);
//     onChangeGrades(null);
//     resetModels();
//     resetGrades();
//   };
//   const handleModelsChange = (selectedOptions: SingleValue<Option>) => {
//     resetModels();
//     onChangeModels(selectedOptions?.value);
//     onChangeGrades(null);
//     resetGrades();
//   };
//   const handleGradesChange = (selectedOptions: SingleValue<Option>) => {
//     resetGrades();
//     onChangeGrades(selectedOptions?.value);
//   };

//   return (
//     <div className="flex flex-col sm:flex-row col-span-12 gap-6">
//       <div className="relative text-sm w-full grow sm:w-1/2 md:w-1/3">
//         <NoSSR
//           placeholder="Марка"
//           options={optionsMakes}
//           value={
//             make.size
//               ? [
//                   {
//                     value: make.values().next().value,
//                     label: make.values().next().value,
//                   },
//                 ]
//               : []
//           }
//           onChange={handleMakesChange}
//         />
//       </div>
//       <div className="relative text-sm w-full grow sm:w-1/2 md:w-1/3">
//         <NoSSR
//           placeholder="Модель"
//           options={optionsModels}
//           value={
//             model.size
//               ? [
//                   {
//                     value: model.values().next().value,
//                     label: model.values().next().value,
//                   },
//                 ]
//               : []
//           }
//           onChange={handleModelsChange}
//           isDisabled={!Boolean(make.size)}
//           isClearable
//         />
//       </div>
//       <div className="relative text-sm w-full grow sm:w-1/2 md:w-1/3">
//         <NoSSR
//           placeholder="Комплектация"
//           options={optionsGrades}
//           value={
//             grade.size
//               ? [
//                   {
//                     value: grade.values().next().value,
//                     label: grade.values().next().value,
//                   },
//                 ]
//               : []
//           }
//           onChange={handleGradesChange}
//           isDisabled={!Boolean(model.size)}
//         />
//       </div>
//     </div>
//   );
// };
